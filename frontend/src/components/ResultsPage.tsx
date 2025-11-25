import { Button } from "./ui/button";
import { ScoreCircle } from "./ScoreCircle"; // Check path!

interface ResultsPageProps {
  score: number;
  missingSkills: string[];
  role: string;
  onReset: () => void;
}

export function ResultsPage({ score, missingSkills, role, onReset }: ResultsPageProps) {
  return (
    <div className="min-h-screen py-12 px-4 bg-gray-50">
      <div className="max-w-4xl mx-auto space-y-8">

        {/* Header */}
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900">Analysis Results</h1>
          <p className="text-gray-500 mt-2">Target Role: <span className="font-semibold text-blue-600">{role}</span></p>
        </div>

        {/* Score Section */}
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center">
          <ScoreCircle score={score} />
          <p className="mt-4 text-lg font-medium text-gray-700">
            {score >= 70 ? "🎉 Great Match!" : "⚠️ Needs Improvement"}
          </p>
        </div>

        {/* Missing Skills Section */}
        {missingSkills.length > 0 ? (
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
            <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <span className="text-red-500">⚠️</span> Missing Skills
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {missingSkills.map((skill, index) => (
                <div key={index} className="flex items-center gap-3 p-3 bg-red-50 text-red-700 rounded-lg border border-red-100">
                  <span className="text-sm">❌</span>
                  <span className="font-medium">{skill}</span>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="bg-green-50 p-8 rounded-2xl border border-green-100 text-center">
            <h3 className="text-xl font-bold text-green-700">Perfect Match!</h3>
            <p className="text-green-600">You have all the required keywords.</p>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex justify-center pt-4">
          <Button onClick={onReset} variant="outline" className="px-8">
            Upload Another Resume
          </Button>
        </div>
      </div>
    </div>
  );
}