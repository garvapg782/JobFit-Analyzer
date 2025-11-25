package com.jobfitanalyzer.controller;

import com.jobfitanalyzer.model.ScanHistory;
import com.jobfitanalyzer.repository.ScanHistoryRepository;
import com.jobfitanalyzer.service.PerformanceMonitor;
import com.jobfitanalyzer.service.ResumeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:5173")
public class ResumeController {

    @Autowired
    private ResumeService resumeService;

    @Autowired
    private ScanHistoryRepository historyRepo;

    @Autowired
    private PerformanceMonitor monitor;

    @PostMapping("/analyze")
    public ResponseEntity<Map<String, Object>> analyzeResume(
            @RequestParam("file") MultipartFile file,
            @RequestParam(value = "role", required = false) String role,
            @RequestParam(value = "jobText", required = false) String jobText) {

        Map<String, Object> response = new HashMap<>();

        try {
            // Background Performance Log
            monitor.logPerformance(file.getOriginalFilename());

            // 1. Extract Text
            String resumeText = resumeService.extractText(file);
            String resumeLower = resumeText.toLowerCase();

            // 2. Determine Job Description
            String jobDescription = "";
            String roleNameForDB = "Unknown Role";

            if (jobText != null && !jobText.trim().isEmpty()) {
                jobDescription = jobText;
                roleNameForDB = "Custom Job Description";
            }
            else if (role != null && !role.isEmpty()) {
                roleNameForDB = role;
                jobDescription = switch (role) {
                    case "java" -> "Java Developer Spring Boot REST API SQL Microservices Git JUnit Hibernate Maven";
                    case "data" -> "Data Analyst Python SQL Excel PowerBI Statistics Tableau Modeling R Cleaning Visualization";
                    case "web" -> "Web Developer HTML CSS JavaScript React Node.js Responsive Webpack TypeScript Tailwind";
                    case "pm" -> "Product Manager Agile Scrum Jira Roadmap Strategy User Stories Stakeholders Communication Leadership";
                    case "devops" -> "DevOps AWS Docker Kubernetes Jenkins CI/CD Linux Terraform Cloud Azure Scripting";
                    default -> "";
                };
            } else {
                response.put("message", "Please select a role or paste a job description.");
                return ResponseEntity.badRequest().body(response);
            }

            // 3. Logic: Calculate Score & Find Missing Skills
            String cleanJobDescription = jobDescription.replaceAll("[^a-zA-Z0-9 ]", " ");
            String[] jobKeywords = cleanJobDescription.toLowerCase().split("\\s+");

            List<String> missingSkills = new ArrayList<>();
            int matchedCount = 0;
            int totalKeywords = 0;

            for (String keyword : jobKeywords) {
                if (keyword.length() <= 2 ||
                        keyword.equals("and") || keyword.equals("the") || keyword.equals("with") ||
                        keyword.equals("for") || keyword.equals("required") || keyword.equals("skills")) {
                    continue;
                }

                totalKeywords++;

                if (resumeLower.contains(keyword)) {
                    matchedCount++;
                } else {
                    missingSkills.add(keyword.substring(0, 1).toUpperCase() + keyword.substring(1));
                }
            }

            int score = (totalKeywords > 0) ? (int) (((double) matchedCount / totalKeywords) * 100) : 0;

            // 4. Save to Database
            try {
                ScanHistory history = new ScanHistory(file.getOriginalFilename(), roleNameForDB, score);
                historyRepo.save(history);
                System.out.println("Saved scan to database: " + file.getOriginalFilename());
            } catch (Exception dbError) {
                System.err.println("Warning: Could not save to database. " + dbError.getMessage());
            }

            // 5. Response
            response.put("message", "Analysis Complete");
            response.put("score", score);
            response.put("missingSkills", missingSkills);

            return ResponseEntity.ok(response);

        } catch (IOException e) {
            e.printStackTrace();
            response.put("error", "Error processing file: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }
}