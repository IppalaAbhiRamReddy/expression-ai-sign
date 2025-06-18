
import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { 
  ArrowLeft, 
  Camera, 
  CameraOff, 
  Download, 
  Pause, 
  Play, 
  Copy,
  Trash2
} from "lucide-react";
import { Link } from "react-router-dom";

export default function LiveTranslate() {
  const [isStreaming, setIsStreaming] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [resolution, setResolution] = useState("720p");
  const [language, setLanguage] = useState("English");
  const [subtitlesEnabled, setSubtitlesEnabled] = useState(true);
  const [translatedText, setTranslatedText] = useState("");
  const [accuracy, setAccuracy] = useState(0);
  const [nmfStatus, setNmfStatus] = useState({
    eyebrowRaised: false,
    headTiltLeft: false,
    mouthMovement: false
  });

  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const { toast } = useToast();

  const startCamera = async () => {
    try {
      const constraints = {
        video: {
          width: resolution === "720p" ? 1280 : resolution === "480p" ? 640 : 480,
          height: resolution === "720p" ? 720 : resolution === "480p" ? 480 : 360
        }
      };

      const stream = await navigator.mediaDevices.getUserMedia(constraints);
      streamRef.current = stream;

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
      }

      setIsStreaming(true);
      toast({
        title: "Camera connected",
        description: "Live translation is now active",
      });

      // Simulate translation activity
      simulateTranslation();
    } catch (error) {
      toast({
        title: "Camera access denied",
        description: "Please allow camera access to use live translation",
        variant: "destructive",
      });
    }
  };

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }

    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }

    setIsStreaming(false);
    setAccuracy(0);
    toast({
      title: "Camera disconnected",
      description: "Live translation stopped",
    });
  };

  const simulateTranslation = () => {
    // Simulate real-time translation updates
    const sampleTexts = [
      "Hello, how are you?",
      "I am learning sign language",
      "Thank you for your help",
      "What is your name?",
      "Nice to meet you"
    ];

    let textIndex = 0;
    const interval = setInterval(() => {
      if (!isStreaming || isPaused) {
        clearInterval(interval);
        return;
      }

      setTranslatedText(sampleTexts[textIndex % sampleTexts.length]);
      setAccuracy(Math.floor(Math.random() * 20) + 80); // 80-100%
      
      // Simulate NMF detection
      setNmfStatus({
        eyebrowRaised: Math.random() > 0.5,
        headTiltLeft: Math.random() > 0.7,
        mouthMovement: Math.random() > 0.3
      });

      textIndex++;
    }, 3000);

    return () => clearInterval(interval);
  };

  const downloadTranslation = () => {
    const blob = new Blob([translatedText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'translated_output.txt';
    a.click();
    URL.revokeObjectURL(url);

    toast({
      title: "File saved",
      description: "Translation saved as translated_output.txt",
    });
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(translatedText);
    toast({
      title: "Copied to clipboard",
      description: "Translation text copied successfully",
    });
  };

  const clearOutput = () => {
    setTranslatedText("");
    setAccuracy(0);
    toast({
      title: "Output cleared",
      description: "Translation output has been cleared",
    });
  };

  useEffect(() => {
    return () => {
      stopCamera();
    };
  }, []);

  return (
    <div className="min-h-screen bg-background">
      {/* Page Header */}
      <div className="border-b bg-card">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center gap-4">
            <Link to="/dashboard">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Dashboard
              </Button>
            </Link>
            <div>
              <h1 className="text-2xl font-bold">Live ISL Translator</h1>
              <p className="text-muted-foreground">
                Use your webcam to translate Indian Sign Language with facial expressions.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-6 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Camera Stream */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Camera className="h-5 w-5" />
                  Camera Stream
                  <Badge variant={isStreaming ? "default" : "secondary"}>
                    {isStreaming ? "🟢 Live" : "🔴 Offline"}
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Video Stream */}
                <div className="relative aspect-video bg-muted rounded-lg overflow-hidden">
                  {isStreaming ? (
                    <video
                      ref={videoRef}
                      className="w-full h-full object-cover"
                      autoPlay
                      playsInline
                      muted
                      aria-label="Live camera feed for sign language translation"
                    />
                  ) : (
                    <div className="flex items-center justify-center h-full">
                      <div className="text-center">
                        <CameraOff className="h-12 w-12 mx-auto mb-2 text-muted-foreground" />
                        <p className="text-muted-foreground">Camera not active</p>
                      </div>
                    </div>
                  )}
                  
                  {isStreaming && isPaused && (
                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                      <div className="text-white text-center">
                        <Pause className="h-8 w-8 mx-auto mb-2" />
                        <p>Translation Paused</p>
                      </div>
                    </div>
                  )}
                </div>

                {/* Camera Controls */}
                <div className="flex flex-wrap gap-2">
                  <Button
                    onClick={isStreaming ? stopCamera : startCamera}
                    variant={isStreaming ? "destructive" : "default"}
                    className="flex-1"
                  >
                    {isStreaming ? (
                      <>
                        <CameraOff className="h-4 w-4 mr-2" />
                        Stop Camera
                      </>
                    ) : (
                      <>
                        <Camera className="h-4 w-4 mr-2" />
                        Start Camera
                      </>
                    )}
                  </Button>
                  
                  {isStreaming && (
                    <Button
                      onClick={() => setIsPaused(!isPaused)}
                      variant="outline"
                    >
                      {isPaused ? (
                        <Play className="h-4 w-4" />
                      ) : (
                        <Pause className="h-4 w-4" />
                      )}
                    </Button>
                  )}
                </div>

                {/* Camera Settings */}
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="text-sm font-medium mb-1 block">Resolution</label>
                    <Select value={resolution} onValueChange={setResolution}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="360p">360p</SelectItem>
                        <SelectItem value="480p">480p</SelectItem>
                        <SelectItem value="720p">720p</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium mb-1 block">Language</label>
                    <Select value={language} onValueChange={setLanguage}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="English">English</SelectItem>
                        <SelectItem value="Hindi">हिंदी</SelectItem>
                        <SelectItem value="Telugu">తెలుగు</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Translation Panel */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="space-y-6"
          >
            {/* Translation Output */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>Translation Output</span>
                  {accuracy > 0 && (
                    <Badge variant="outline">
                      Accuracy: {accuracy}%
                    </Badge>
                  )}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div 
                  className="min-h-[120px] p-4 bg-muted rounded-lg mb-4"
                  aria-live="polite"
                  aria-label="Translation output"
                >
                  {translatedText ? (
                    <motion.p
                      key={translatedText}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-lg"
                    >
                      {translatedText}
                    </motion.p>
                  ) : (
                    <p className="text-muted-foreground italic">
                      Translation will appear here...
                    </p>
                  )}
                </div>

                <div className="flex flex-wrap gap-2">
                  <Button
                    onClick={copyToClipboard}
                    variant="outline"
                    size="sm"
                    disabled={!translatedText}
                  >
                    <Copy className="h-4 w-4 mr-2" />
                    Copy
                  </Button>
                  <Button
                    onClick={downloadTranslation}
                    variant="outline"
                    size="sm"
                    disabled={!translatedText}
                  >
                    <Download className="h-4 w-4 mr-2" />
                    Download
                  </Button>
                  <Button
                    onClick={clearOutput}
                    variant="outline"
                    size="sm"
                    disabled={!translatedText}
                  >
                    <Trash2 className="h-4 w-4 mr-2" />
                    Clear
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* NMF Status Panel */}
            <Card>
              <CardHeader>
                <CardTitle>NMF Detection Status</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 gap-3">
                  <div className="flex items-center justify-between">
                    <span>Eyebrow Raised</span>
                    <span>{nmfStatus.eyebrowRaised ? "✅" : "❌"}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Head Tilt Left</span>
                    <span>{nmfStatus.headTiltLeft ? "✅" : "❌"}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Mouth Movement</span>
                    <span>{nmfStatus.mouthMovement ? "✅" : "❌"}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Tools Panel */}
            <Card>
              <CardHeader>
                <CardTitle>Options</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <label htmlFor="subtitles" className="text-sm font-medium">
                    Show Subtitles
                  </label>
                  <Switch
                    id="subtitles"
                    checked={subtitlesEnabled}
                    onCheckedChange={setSubtitlesEnabled}
                  />
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
