
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Trophy, Target, Calendar, Award } from "lucide-react";

export function LearningProgressWidget() {
  const overallProgress = 28; // Calculate from completed modules
  const streak = 5;
  const badges = [
    { name: "Beginner", earned: true, icon: Trophy },
    { name: "Daily Signs", earned: false, icon: Target },
    { name: "Week Streak", earned: true, icon: Calendar }
  ];

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

        {/* Learning Streak */}
        <div className="text-center p-4 bg-gradient-to-r from-orange-50 to-blue-50 rounded-lg">
          <div className="text-2xl font-bold text-orange-600">{streak}</div>
          <div className="text-sm text-muted-foreground">Day Streak</div>
        </div>

        {/* Badges */}
        <div className="space-y-3">
          <h4 className="font-medium text-sm">Achievements</h4>
          <div className="space-y-2">
            {badges.map((badge) => (
              <div key={badge.name} className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <badge.icon className={`h-4 w-4 ${badge.earned ? 'text-yellow-600' : 'text-gray-300'}`} />
                  <span className={`text-sm ${badge.earned ? 'text-foreground' : 'text-muted-foreground'}`}>
                    {badge.name}
                  </span>
                </div>
                {badge.earned && (
                  <Badge variant="secondary" className="text-xs">
                    Earned
                  </Badge>
                )}
              </div>
            ))}
          </div>
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
