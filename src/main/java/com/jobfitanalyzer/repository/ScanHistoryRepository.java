package com.jobfitanalyzer.repository;
import com.jobfitanalyzer.model.ScanHistory;
import org.springframework.data.jpa.repository.JpaRepository;
public interface ScanHistoryRepository extends JpaRepository<ScanHistory, Long> {}