import { useState } from "react";
import { ScannerPage } from "./components/ScannerPage";
import { ResultsPage } from "./components/ResultsPage";

export default function App() {
  const [currentView, setCurrentView] = useState<"scanner" | "results">("scanner");
  const [isLoading, setIsLoading] = useState(false);

  // Data from Backend
  const [score, setScore] = useState(0);
  const [missingSkills, setMissingSkills] = useState<string[]>([]);
  const [roleName, setRoleName] = useState("");

  const handleAnalyze = async (resumeFile: File | null, jobInput: string, isPreset: boolean) => {
    if (!resumeFile) return;

    setIsLoading(true);

    const formData = new FormData();
    formData.append("file", resumeFile);

    if (isPreset) {
      // --- UPDATED ROLE MAP ---
      // This maps the Dropdown Text (Left) to the Backend Switch Case (Right)
      const roleMap: Record<string, string> = {
        "Java Developer": "java",
        "Data Analyst": "data",
        "Frontend Developer": "web",
        "Product Manager": "pm",
        "DevOps Engineer": "devops"
      };

      formData.append("role", roleMap[jobInput] || "java");
      setRoleName(jobInput);
    } else {
      formData.append("jobText", jobInput);
      setRoleName("Custom Role");
    }

    try {
      const response = await fetch("http://localhost:8081/api/analyze", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to analyze");
      }

      const data = await response.json();
      console.log("Java Response:", data);

      setScore(data.score);
      setMissingSkills(data.missingSkills || []);
      setCurrentView("results");

    } catch (error) {
      console.error("Error connecting to Java:", error);
      alert("Could not connect to the Backend. Is IntelliJ running?");
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setScore(0);
    setMissingSkills([]);
    setCurrentView("scanner");
  };

  return (
    <div className="bg-[#F5F7FA] min-h-screen">
      {currentView === "scanner" ? (
        <ScannerPage onAnalyze={handleAnalyze} />
      ) : (
        <ResultsPage
          score={score}
          missingSkills={missingSkills}
          role={roleName}
          onReset={handleReset}
        />
      )}

      {isLoading && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-xl text-center">
            <div className="animate-spin h-8 w-8 border-4 border-blue-500 border-t-transparent rounded-full mx-auto mb-4"></div>
            <p className="text-gray-700 font-medium">Analyzing Resume...</p>
          </div>
        </div>
      )}
    </div>
  );
}