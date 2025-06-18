
import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { 
  Upload, 
  Play, 
  Download, 
  Copy, 
  Trash2, 
  CheckCircle, 
  AlertCircle,
  X
} from "lucide-react";

export function UploadVideoTranslation() {
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [videoPreview, setVideoPreview] = useState<string>("");
  const [videoTitle, setVideoTitle] = useState("");
  const [language, setLanguage] = useState("English");
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);
  const [processingStage, setProcessingStage] = useState("");
  const [translatedText, setTranslatedText] = useState("");
  const [accuracy, setAccuracy] = useState(0);
  const [nmfBreakdown, setNmfBreakdown] = useState({
    expression: false,
    headTilt: false,
    lipSync: false
  });
  const [showNMFInspector, setShowNMFInspector] = useState(false);
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const { toast } = useToast();

  const handleFileSelect = (file: File) => {
    // Validate file
    if (file.size > 100 * 1024 * 1024) { // 100MB limit
      toast({
        title: "File too large",
        description: "Please select a video file smaller than 100MB",
        variant: "destructive",
      });
      return;
    }

    if (!file.type.startsWith("video/")) {
      toast({
        title: "Invalid file type",
        description: "Please select a video file (.mp4, .mov, .webm)",
        variant: "destructive",
      });
      return;
    }

    setUploadedFile(file);
    setVideoTitle(file.name.replace(/\.[^/.]+$/, ""));
    
    // Create preview URL
    const previewUrl = URL.createObjectURL(file);
    setVideoPreview(previewUrl);
    
    toast({
      title: "Video loaded",
      description: "Ready to upload and translate",
    });
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) {
      handleFileSelect(files[0]);
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      handleFileSelect(files[0]);
    }
  };

  const startTranslation = async () => {
    if (!uploadedFile) return;

    setIsProcessing(true);
    setUploadProgress(0);
    setProcessingStage("Uploading...");

    // Simulate upload progress
    const uploadInterval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 100) {
          clearInterval(uploadInterval);
          setProcessingStage("Analyzing...");
          
          // Start analysis phase
          setTimeout(() => {
            setProcessingStage("Translating...");
            
            // Complete translation
            setTimeout(() => {
              setTranslatedText("Hello, my name is Sarah. I am learning Indian Sign Language. Thank you for watching this video.");
              setAccuracy(92);
              setNmfBreakdown({
                expression: true,
                headTilt: true,
                lipSync: false
              });
              setIsProcessing(false);
              setProcessingStage("");
              
              toast({
                title: "Translation complete!",
                description: "Your video has been successfully translated",
              });
            }, 2000);
          }, 1500);
          
          return 100;
        }
        return prev + 10;
      });
    }, 200);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(translatedText);
    toast({
      title: "Copied to clipboard",
      description: "Translation text copied successfully",
    });
  };

  const downloadTranslation = () => {
    const blob = new Blob([translatedText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${videoTitle}_translation.txt`;
    a.click();
    URL.revokeObjectURL(url);

    toast({
      title: "File saved",
      description: "Translation saved successfully",
    });
  };

  const clearUpload = () => {
    setUploadedFile(null);
    setVideoPreview("");
    setVideoTitle("");
    setUploadProgress(0);
    setIsProcessing(false);
    setProcessingStage("");
    setTranslatedText("");
    setAccuracy(0);
    setNmfBreakdown({ expression: false, headTilt: false, lipSync: false });
    
    if (videoPreview) {
      URL.revokeObjectURL(videoPreview);
    }
  };

  return (
    <div className="space-y-6">
      {/* Upload Form */}
      <Card>
        <CardHeader>
          <CardTitle>Upload Video for Translation</CardTitle>
          <p className="text-sm text-muted-foreground">
            Supports ISL videos with facial expressions & gestures. Max: 100MB, 2 min.
          </p>
        </CardHeader>
        <CardContent className="space-y-4">
          {!uploadedFile ? (
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-8 text-center cursor-pointer hover:border-primary/50 transition-colors"
              onDragOver={handleDragOver}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
            >
              <Upload className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
              <p className="text-lg font-medium mb-2">Drop your video here</p>
              <p className="text-sm text-muted-foreground mb-4">
                or click to browse files
              </p>
              <p className="text-xs text-muted-foreground">
                Supports .mp4, .mov, .webm up to 100MB
              </p>
              <input
                ref={fileInputRef}
                type="file"
                accept="video/*"
                onChange={handleFileInput}
                className="hidden"
              />
            </motion.div>
          ) : (
            <div className="space-y-4">
              {/* Video Preview */}
              <div className="relative">
                <video
                  ref={videoRef}
                  src={videoPreview}
                  controls
                  className="w-full max-h-64 rounded-lg"
                  aria-label="Video preview for translation"
                />
                <Button
                  onClick={clearUpload}
                  variant="destructive"
                  size="sm"
                  className="absolute top-2 right-2"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>

              {/* Video Details */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="video-title">Video Title</Label>
                  <Input
                    id="video-title"
                    value={videoTitle}
                    onChange={(e) => setVideoTitle(e.target.value)}
                    placeholder="Enter video title"
                  />
                </div>
                <div>
                  <Label htmlFor="video-language">Language Region</Label>
                  <Select value={language} onValueChange={setLanguage}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="English">English</SelectItem>
                      <SelectItem value="Hindi">हिंदी</SelectItem>
                      <SelectItem value="Tamil">தமிழ்</SelectItem>
                      <SelectItem value="Telugu">తెలుగు</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Upload Button */}
              <Button
                onClick={startTranslation}
                disabled={isProcessing}
                className="w-full"
                size="lg"
              >
                {isProcessing ? (
                  <>Processing...</>
                ) : (
                  <>
                    <Upload className="h-4 w-4 mr-2" />
                    Upload and Translate
                  </>
                )}
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Upload Progress */}
      {isProcessing && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                Processing Video
                <Badge variant="outline">{processingStage}</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Progress value={uploadProgress} className="mb-2" />
              <p className="text-sm text-muted-foreground text-center">
                {processingStage} {uploadProgress < 100 && `${uploadProgress}%`}
              </p>
            </CardContent>
          </Card>
        </motion.div>
      )}

      {/* Translation Result */}
      {translatedText && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-4"
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Translation Result</span>
                <Badge variant="outline">
                  Accuracy: {accuracy}%
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-muted rounded-lg p-4 mb-4">
                <p className="text-lg leading-relaxed">{translatedText}</p>
              </div>

              <div className="flex flex-wrap gap-2">
                <Button onClick={copyToClipboard} variant="outline" size="sm">
                  <Copy className="h-4 w-4 mr-2" />
                  Copy
                </Button>
                <Button onClick={downloadTranslation} variant="outline" size="sm">
                  <Download className="h-4 w-4 mr-2" />
                  Download
                </Button>
                <Button 
                  onClick={() => setShowNMFInspector(!showNMFInspector)} 
                  variant="outline" 
                  size="sm"
                >
                  Show Analysis
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* NMF Inspector */}
          {showNMFInspector && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
            >
              <Card>
                <CardHeader>
                  <CardTitle>NMF Detection Analysis</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="flex items-center justify-between p-3 rounded-lg border">
                      <span className="font-medium">Facial Expression</span>
                      {nmfBreakdown.expression ? (
                        <CheckCircle className="h-5 w-5 text-green-500" />
                      ) : (
                        <AlertCircle className="h-5 w-5 text-red-500" />
                      )}
                    </div>
                    <div className="flex items-center justify-between p-3 rounded-lg border">
                      <span className="font-medium">Head Tilt</span>
                      {nmfBreakdown.headTilt ? (
                        <CheckCircle className="h-5 w-5 text-green-500" />
                      ) : (
                        <AlertCircle className="h-5 w-5 text-red-500" />
                      )}
                    </div>
                    <div className="flex items-center justify-between p-3 rounded-lg border">
                      <span className="font-medium">Lip Sync</span>
                      {nmfBreakdown.lipSync ? (
                        <CheckCircle className="h-5 w-5 text-green-500" />
                      ) : (
                        <AlertCircle className="h-5 w-5 text-red-500" />
                      )}
                    </div>
                  </div>
                  {!nmfBreakdown.lipSync && (
                    <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                      <p className="text-sm text-yellow-800">
                        <AlertCircle className="h-4 w-4 inline mr-2" />
                        Lip sync detection was unclear. Consider better lighting and camera angle for improved accuracy.
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          )}

          {/* Post Upload Actions */}
          <Card>
            <CardContent className="pt-6">
              <div className="flex flex-wrap gap-2">
                <Button onClick={clearUpload} variant="outline">
                  Translate Another Video
                </Button>
                <Button variant="outline">
                  Save to My History
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}

      {/* Tips Footer */}
      <Card className="bg-muted/50">
        <CardContent className="pt-6">
          <div className="text-center space-y-2">
            <p className="text-sm text-muted-foreground">
              💡 <strong>Tips:</strong> Ensure bright lighting and full face visibility for best results.
            </p>
            <div className="flex justify-center gap-4 text-sm">
              <a href="#" className="text-primary hover:underline">Upload Guidelines</a>
              <a href="#" className="text-primary hover:underline">Contact Support</a>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
