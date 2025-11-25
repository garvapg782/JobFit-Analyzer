package com.jobfitanalyzer.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import java.time.LocalDateTime;

@Entity // This annotation tells Hibernate to make a Table called "ScanHistory"
public class ScanHistory {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String fileName;
    private String role;
    private int score;
    private LocalDateTime scanDate;

    // Constructors
    public ScanHistory() {}

    public ScanHistory(String fileName, String role, int score) {
        this.fileName = fileName;
        this.role = role;
        this.score = score;
        this.scanDate = LocalDateTime.now();
    }

    // Getters and Setters (IntelliJ can generate these: Alt+Insert)
    public Long getId() { return id; }
    public String getFileName() { return fileName; }
    public String getRole() { return role; }
    public int getScore() { return score; }
    public LocalDateTime getScanDate() { return scanDate; }
}