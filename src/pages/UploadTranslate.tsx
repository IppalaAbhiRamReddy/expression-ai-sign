
import { motion } from "framer-motion";
import { ArrowLeft, Upload, FileVideo } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";

const UploadTranslate = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      {/* Page Header */}
      <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 py-6">
          <nav className="flex items-center text-sm text-muted-foreground mb-4">
            <button 
              onClick={() => navigate("/dashboard")}
              className="hover:text-foreground flex items-center"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Dashboard
            </button>
          </nav>
          
          <div className="space-y-2">
            <h1 className="text-4xl font-bold tracking-tight">Upload Video for Translation</h1>
            <p className="text-xl text-muted-foreground">
              Upload your sign language videos to get text translations
            </p>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8" role="main">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Card className="max-w-2xl mx-auto">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileVideo className="h-5 w-5" />
                Video Upload
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-8 text-center">
                <Upload className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                <h3 className="text-lg font-medium mb-2">Drop your video here</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Or click to browse and select a video file
                </p>
                <Button>
                  Select Video File
                </Button>
              </div>
              
              <div className="text-sm text-muted-foreground">
                <p className="font-medium mb-2">Supported formats:</p>
                <ul className="list-disc list-inside space-y-1">
                  <li>MP4, MOV, AVI (Max 100MB)</li>
                  <li>Duration: Up to 5 minutes</li>
                  <li>Resolution: 720p or higher recommended</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </main>
    </div>
  );
};

export default UploadTranslate;
