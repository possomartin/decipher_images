import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { UploadCloud } from "lucide-react";

export default function MortgageAnalyzer() {
  const [files, setFiles] = useState([]);
  const [results, setResults] = useState(null);

  const handleFileUpload = (event) => {
    const uploadedFiles = event.target.files;
    setFiles([...files, ...uploadedFiles]);
  };

  const analyzeFiles = async () => {
    // Placeholder for API integration to analyze interest rates and LTV
    setResults("Analysis in progress...");
    setTimeout(() => {
      setResults("Interest rates and LTV determined based on uploaded data.");
    }, 2000);
  };

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <Card className="p-6">
        <h2 className="text-xl font-bold mb-4">Mortgage Data Analyzer</h2>
        <div className="flex items-center gap-4 mb-4">
          <Input type="file" accept="image/*,.pdf" multiple onChange={handleFileUpload} />
          <Button onClick={analyzeFiles} className="flex items-center">
            <UploadCloud className="mr-2" /> Upload & Analyze
          </Button>
        </div>
        <CardContent>
          {files.length > 0 && (
            <ul className="mb-4">
              {files.map((file, index) => (
                <li key={index} className="text-sm">{file.name}</li>
              ))}
            </ul>
          )}
          {results && <p className="text-green-600 font-semibold">{results}</p>}
        </CardContent>
      </Card>
    </div>
  );
}