
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Award } from "lucide-react";

export function LearningProgressWidget() {
  const overallProgress = 28; // Calculate from completed modules

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center text-lg">
          <Award className="mr-2 h-5 w-5 text-yellow-600" />
          Your Progress
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Overall Progress */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Overall Completion</span>
            <span className="font-semibold">{overallProgress}%</span>
          </div>
          <Progress value={overallProgress} className="h-3" />
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-4 pt-4 border-t">
          <div className="text-center">
            <div className="text-lg font-semibold">4</div>
            <div className="text-xs text-muted-foreground">Modules</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-semibold">21</div>
            <div className="text-xs text-muted-foreground">Lessons</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
