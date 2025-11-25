package com.jobfitanalyzer;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableAsync;

@SpringBootApplication
public class JobFitAnalyzerApplication {
    public static void main(String[] args) {
        SpringApplication.run(JobFitAnalyzerApplication.class, args);
    }
}
