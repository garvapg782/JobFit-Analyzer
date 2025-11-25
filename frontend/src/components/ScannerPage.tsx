import { useState } from 'react';
import { FileUpload } from './FileUpload';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Button } from './ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Textarea } from './ui/textarea';
import { Sparkles } from 'lucide-react';

interface ScannerPageProps {
  onAnalyze: (resumeFile: File | null, jobInput: string, isPreset: boolean) => void;
}

export function ScannerPage({ onAnalyze }: ScannerPageProps) {
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [selectedRole, setSelectedRole] = useState('');
  const [customJob, setCustomJob] = useState('');
  const [activeTab, setActiveTab] = useState('preset');

  const handleAnalyze = () => {
    const jobInput = activeTab === 'preset' ? selectedRole : customJob;
    const isPreset = activeTab === 'preset';
    
    if (!resumeFile || !jobInput) {
      alert('Please upload a resume and select/enter a job description');
      return;
    }

    onAnalyze(resumeFile, jobInput, isPreset);
  };

  const isValid = resumeFile && (activeTab === 'preset' ? selectedRole : customJob);

  return (
    <div className="min-h-screen py-16 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 mb-4">
            <Sparkles className="w-8 h-8 text-[#2563EB]" />
            <h1 className="text-[#1E293B]">Optimize Your Resume for the Perfect Role</h1>
          </div>
          <p className="text-[#64748B] max-w-2xl mx-auto">
            Upload your resume and compare it against any job description to get an instant compatibility score.
          </p>
        </div>

        {/* Control Center */}
        <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
          <div className="grid md:grid-cols-2 gap-8 mb-8">
            {/* Left Side - Resume Upload */}
            <div>
              <h3 className="text-[#1E293B] mb-4">Your Resume</h3>
              <FileUpload onFileSelect={setResumeFile} selectedFile={resumeFile} />
            </div>

            {/* Right Side - Job Context */}
            <div>
              <h3 className="text-[#1E293B] mb-4">Job Context</h3>
              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="grid w-full grid-cols-2 mb-4">
                  <TabsTrigger value="preset">Preset Role</TabsTrigger>
                  <TabsTrigger value="custom">Custom Job</TabsTrigger>
                </TabsList>
                
                <TabsContent value="preset" className="mt-0">
                  <Select value={selectedRole} onValueChange={setSelectedRole}>
                    <SelectTrigger className="h-[200px] items-start">
                      <SelectValue placeholder="Select a role..." />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Java Developer">Java Developer</SelectItem>
                      <SelectItem value="Data Analyst">Data Analyst</SelectItem>
                      <SelectItem value="Frontend Developer">Frontend Developer</SelectItem>
                      <SelectItem value="Product Manager">Product Manager</SelectItem>
                      <SelectItem value="DevOps Engineer">DevOps Engineer</SelectItem>
                    </SelectContent>
                  </Select>
                </TabsContent>
                
                <TabsContent value="custom" className="mt-0">
                  <Textarea
                    placeholder="Paste the Job Description from LinkedIn/Indeed here..."
                    value={customJob}
                    onChange={(e) => setCustomJob(e.target.value)}
                    className="min-h-[200px] resize-none"
                  />
                </TabsContent>
              </Tabs>
            </div>
          </div>

          {/* CTA Button */}
          <div className="flex justify-center">
            <Button
              onClick={handleAnalyze}
              disabled={!isValid}
              size="lg"
              className="bg-[#1E40AF] hover:bg-[#1E3A8A] text-white px-12 py-6 shadow-xl hover:shadow-2xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Analyze Match
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}