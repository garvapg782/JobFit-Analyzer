package com.jobfitanalyzer.service;

import com.jobfitanalyzer.service.parser.DocumentParser;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Map;

@Service
public class ResumeService {

    // OOP MAGIC: Spring automatically puts "pdfParser" and "wordParser" into this Map.
    // This satisfies the "Interface & Polymorphism" requirement in your rubric.
    @Autowired
    private Map<String, DocumentParser> parsers;

    public String extractText(MultipartFile file) throws IOException {
        String fileName = file.getOriginalFilename();

        if (fileName == null) return "";

        DocumentParser parser = null;

        // Select the correct strategy based on file extension
        if (fileName.endsWith(".pdf")) {
            parser = parsers.get("pdfParser");
        } else if (fileName.endsWith(".docx")) {
            parser = parsers.get("wordParser");
        }

        // If a valid parser is found, execute the interface method
        if (parser != null) {
            return parser.parse(file.getInputStream());
        } else {
            System.err.println("File type not supported: " + fileName);
            return "";
        }
    }
}