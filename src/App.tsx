import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FileUp, Search, CheckCircle, AlertTriangle } from "lucide-react";
import { cn } from "@/lib/utils";

const App = () => {
  const [images, setImages] = useState<string[]>([]);
  const [pdfs, setPdfs] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<
    { ltv?: number; interestRate?: number }[]
  >([]);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;

    const files = Array.from(e.target.files);
    const validImages = files.filter((file) => file.type.startsWith("image/"));

    if (validImages.length !== files.length) {
      alert("Invalid file type: Only images are allowed for image upload.");
      return;
    }

    setImages(validImages.map((file) => URL.createObjectURL(file)));
  };

  const handlePdfUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;

    const files = Array.from(e.target.files);
    const validPdfs = files.filter((file) => file.type === "application/pdf");

    if (validPdfs.length !== files.length) {
      alert("Invalid file type: Only PDFs are allowed for PDF upload.");
      return;
    }

    setPdfs(validPdfs.map((file) => URL.createObjectURL(file)));
  };

  const analyzeData = async () => {
    if (images.length === 0 && pdfs.length === 0) {
      alert("Please upload images or PDFs to analyze.");
      return;
    }

    setLoading(true);
    setResults([]);

    // Simulate analysis with a timeout
    await new Promise((resolve) => setTimeout(resolve, 2000));

    const newResults: { ltv?: number; interestRate?: number }[] = [];

    if (images.length > 0) {
      // Simulate interest rate analysis
      newResults.push({ interestRate: 3.5 + Math.random() * 1.5 }); // Random interest rate between 3.5% and 5%
    }

    if (pdfs.length > 0) {
      // Simulate LTV analysis
      newResults.push({ ltv: 80 + Math.random() * 15 }); // Random LTV between 80% and 95%
    }

    setResults(newResults);
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-black p-4 sm:p-8">
      <div className="max-w-4xl mx-auto space-y-8">
        <h1 className="text-3xl sm:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400 text-center">
          Mortgage Data Analyzer
        </h1>

        <div className="bg-white/5 backdrop-blur-lg rounded-xl p-4 sm:p-6 border border-white/10 shadow-lg space-y-6">
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-gray-300">
              Upload Images (Mortgage Data Sheets)
            </h2>
            <Input
              type="file"
              multiple
              accept="image/*"
              onChange={handleImageUpload}
              className="bg-black/20 text-white border-purple-500/30 file:bg-purple-500/20 file:border-0 file:text-purple-300 file:px-4 file:py-2 file:rounded-md file:cursor-pointer"
            />
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {images.map((image, index) => (
                <div key={index} className="relative group">
                  <img
                    src={image}
                    alt={`Uploaded ${index}`}
                    className="w-full h-auto rounded-md border border-gray-700"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/50 transition-colors duration-300 rounded-md flex items-center justify-center opacity-0 group-hover:opacity-100">
                    <Search className="w-8 h-8 text-white" />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-gray-300">
              Upload PDFs (Credit Score)
            </h2>
            <Input
              type="file"
              multiple
              accept="application/pdf"
              onChange={handlePdfUpload}
              className="bg-black/20 text-white border-purple-500/30 file:bg-purple-500/20 file:border-0 file:text-purple-300 file:px-4 file:py-2 file:rounded-md file:cursor-pointer"
            />
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {pdfs.map((pdf, index) => (
                <div key={index} className="relative group">
                  <div className="w-full aspect-square bg-gray-800 rounded-md border border-gray-700 flex items-center justify-center">
                    <FileUp className="w-10 h-10 text-gray-400" />
                  </div>
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/50 transition-colors duration-300 rounded-md flex items-center justify-center opacity-0 group-hover:opacity-100">
                    <Search className="w-8 h-8 text-white" />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <Button
            onClick={analyzeData}
            disabled={loading}
            className={cn(
              "w-full bg-gradient-to-r from-purple-500 to-blue-500 text-white font-semibold py-3 rounded-full transition-all duration-300",
              "hover:from-purple-600 hover:to-blue-600 hover:scale-105",
              "disabled:opacity-50 disabled:cursor-not-allowed",
              "flex items-center justify-center gap-2"
            )}
          >
            {loading ? (
              <>
                <svg
                  className="animate-spin h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Analyzing...
              </>
            ) : (
              "Analyze Data"
            )}
          </Button>

          {results.length > 0 && (
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-gray-300">
                Analysis Results
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {results.map((result, index) => (
                  <div
                    key={index}
                    className="bg-black/20 rounded-lg p-4 border border-purple-500/30 shadow-md"
                  >
                    {result.interestRate !== undefined && (
                      <div className="flex items-center gap-4">
                        <CheckCircle className="w-6 h-6 text-green-500" />
                        <div>
                          <p className="text-lg font-medium text-gray-200">
                            Estimated Interest Rate:{" "}
                            <span className="text-white">
                              {result.interestRate.toFixed(2)}%
                            </span>
                          </p>
                          <p className="text-sm text-gray-400">
                            Based on uploaded mortgage data sheet.
                          </p>
                        </div>
                      </div>
                    )}
                    {result.ltv !== undefined && (
                      <div className="flex items-center gap-4">
                        <CheckCircle className="w-6 h-6 text-green-500" />
                        <div>
                          <p className="text-lg font-medium text-gray-200">
                            Recommended Loan-to-Value (LTV):{" "}
                            <span className="text-white">
                              {result.ltv.toFixed(2)}%
                            </span>
                          </p>
                          <p className="text-sm text-gray-400">
                            Based on uploaded credit score PDF.
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default App;
