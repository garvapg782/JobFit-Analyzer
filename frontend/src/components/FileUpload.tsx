import { useRef, useState } from 'react';
import { Upload, File, X } from 'lucide-react';
import { Button } from './ui/button';

interface FileUploadProps {
  onFileSelect: (file: File | null) => void;
  selectedFile: File | null;
}

export function FileUpload({ onFileSelect, selectedFile }: FileUploadProps) {
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      const file = files[0];
      if (file.type === 'application/pdf' || file.name.endsWith('.docx')) {
        onFileSelect(file);
      } else {
        alert('Please upload a PDF or DOCX file');
      }
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      onFileSelect(files[0]);
    }
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const handleRemove = (e: React.MouseEvent) => {
    e.stopPropagation();
    onFileSelect(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div>
      <input
        ref={fileInputRef}
        type="file"
        accept=".pdf,.docx"
        onChange={handleFileChange}
        className="hidden"
      />
      
      <div
        onClick={handleClick}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`
          relative h-[200px] border-2 border-dashed rounded-xl cursor-pointer
          transition-all duration-200 flex flex-col items-center justify-center
          ${isDragging 
            ? 'border-[#2563EB] bg-[#EFF6FF]' 
            : selectedFile
            ? 'border-[#10B981] bg-[#F0FDF4]'
            : 'border-[#CBD5E1] bg-[#F8FAFC] hover:border-[#2563EB] hover:bg-[#EFF6FF]'
          }
        `}
      >
        {selectedFile ? (
          <div className="flex flex-col items-center gap-3">
            <File className="w-12 h-12 text-[#10B981]" />
            <div className="text-center px-4">
              <p className="text-[#1E293B] truncate max-w-[200px]">{selectedFile.name}</p>
              <p className="text-[#64748B]">
                {(selectedFile.size / 1024).toFixed(1)} KB
              </p>
            </div>
            <Button
              onClick={handleRemove}
              variant="ghost"
              size="sm"
              className="mt-2 text-[#EF4444] hover:text-[#DC2626] hover:bg-[#FEE2E2]"
            >
              <X className="w-4 h-4 mr-1" />
              Remove
            </Button>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-3 px-4">
            <Upload className="w-12 h-12 text-[#2563EB]" />
            <div className="text-center">
              <p className="text-[#1E293B] mb-1">Drop your PDF or DOCX here</p>
              <p className="text-[#64748B]">or click to browse</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
