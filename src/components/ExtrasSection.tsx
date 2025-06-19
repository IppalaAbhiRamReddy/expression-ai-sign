
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download, FileText, Map, Book } from "lucide-react";

const resources = [
  {
    title: "ISL Alphabet Chart",
    description: "Downloadable PDF with complete alphabet reference",
    icon: Book,
    fileSize: "2.3 MB",
    format: "PDF"
  },
  {
    title: "Common Facial Expressions",
    description: "Guide to non-manual features and their meanings",
    icon: FileText,
    fileSize: "1.8 MB", 
    format: "PDF"
  },
  {
    title: "Regional ISL Variants",
    description: "Understand different regional signing variations",
    icon: Map,
    fileSize: "3.1 MB",
    format: "PDF"
  }
];

export function ExtrasSection() {
  const handleDownload = (title: string) => {
    // Simulate download
    console.log(`Downloading ${title}`);
    // In real app, trigger actual download
  };

  return (
    <section>
      <div className="flex items-center mb-6">
        <Download className="h-6 w-6 mr-2 text-green-600" />
        <h2 className="text-2xl font-bold">Additional Resources</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {resources.map((resource) => (
          <Card key={resource.title} className="hover:shadow-md transition-shadow">
            <CardHeader className="text-center pb-4">
              <div className="mx-auto w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-3">
                <resource.icon className="h-6 w-6 text-blue-600" />
              </div>
              <CardTitle className="text-lg">{resource.title}</CardTitle>
            </CardHeader>
            <CardContent className="text-center space-y-4">
              <p className="text-sm text-muted-foreground leading-relaxed">
                {resource.description}
              </p>
              
              <div className="flex justify-center gap-4 text-xs text-muted-foreground">
                <span>{resource.format}</span>
                <span>{resource.fileSize}</span>
              </div>

              <Button 
                variant="outline" 
                size="sm" 
                className="w-full"
                onClick={() => handleDownload(resource.title)}
                aria-label={`Download ${resource.title}`}
              >
                <Download className="h-4 w-4 mr-2" />
                Download
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
