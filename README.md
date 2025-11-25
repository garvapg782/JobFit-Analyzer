# 🚀 JobFit Analyzer - AI-Powered Resume Screening Tool

JobFit Analyzer is a Full-Stack application that parses resumes (PDF/DOCX) and matches them against job descriptions using keyword analysis. It provides candidates with an instant compatibility score and identifies missing skills.

## 🌟 Features
* **Smart Parsing:** Extracts text from both PDF (Apache PDFBox) and Word (Apache POI) documents.
* **Role-Based Analysis:** Pre-configured rule sets for Java, Data Analysis, Web Dev, Product Management, and DevOps.
* **Gap Analysis:** Instantly identifies missing keywords required for the role.
* **Persistent History:** Automatically saves all scan results to a local database.
* **Multithreaded:** Uses asynchronous processing for performance monitoring.
* **Modern UI:** Built with React, Tailwind CSS, and Shadcn UI.

## 🛠️ Tech Stack
* **Backend:** Java 17, Spring Boot, Hibernate (JPA), H2 Database.
* **Frontend:** React (Vite), TypeScript, Tailwind CSS.
* **Algorithms:** Keyword Frequency & Coverage Ratio.

## 🚀 How to Run locally

### 1. Backend (Spring Boot)
1.  Open the project in IntelliJ IDEA.
2.  Run `JobFitAnalyzerApplication.java`.
3.  Server starts at `http://localhost:8081`.

### 2. Frontend (React)
```bash
cd frontend
npm install
npm run dev