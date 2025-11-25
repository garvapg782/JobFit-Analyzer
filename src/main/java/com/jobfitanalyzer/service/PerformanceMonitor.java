package com.jobfitanalyzer.service;

import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;
import java.util.concurrent.CompletableFuture;

@Service
public class PerformanceMonitor {

    @Async // This runs in a separate thread!
    public void logPerformance(String fileName) {
        try {
            // Simulate a heavy background task
            System.out.println("🧵 [Thread-" + Thread.currentThread().getId() + "] Starting background performance check for: " + fileName);
            Thread.sleep(2000); // Sleep for 2 seconds to prove it's parallel
            System.out.println("✅ [Thread-" + Thread.currentThread().getId() + "] Performance check complete for: " + fileName);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
    }
}