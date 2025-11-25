package com.jobfitanalyzer.repository;

import com.jobfitanalyzer.model.Resume;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface resumeRepository extends JpaRepository<Resume, Long> {
}
