
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Eye, Trash2, MoreHorizontal } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface ActivityFeedProps {
  showAll?: boolean;
}

const activityData = [
  {
    id: 1,
    date: "2025-01-15",
    type: "Live",
    output: "Hello, how are you today?",
    accuracy: 94,
  },
  {
    id: 2,
    date: "2025-01-14",
    type: "Upload",
    output: "Thank you for your help with...",
    accuracy: 87,
  },
  {
    id: 3,
    date: "2025-01-13",
    type: "Live",
    output: "Good morning everyone",
    accuracy: 92,
  },
  {
    id: 4,
    date: "2025-01-12",
    type: "Upload",
    output: "I would like to schedule a meeting...",
    accuracy: 89,
  },
];

export function ActivityFeed({ showAll = false }: ActivityFeedProps) {
  const displayData = showAll ? activityData : activityData.slice(0, 3);

  if (activityData.length === 0) {
    return (
      <Card className="h-fit">
        <CardHeader>
          <CardTitle className="text-lg">Recent Sessions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-12">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-muted flex items-center justify-center">
              <Eye className="h-8 w-8 text-muted-foreground" />
            </div>
            <p className="text-muted-foreground font-medium">No activity yet</p>
            <p className="text-sm text-muted-foreground mt-1">Try translating to see your sessions here!</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="h-fit">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">Recent Sessions</CardTitle>
          {!showAll && activityData.length > 3 && (
            <Button variant="ghost" size="sm" className="text-primary">
              View All
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="space-y-4">
          {displayData.map((activity) => (
            <div key={activity.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors">
              <div className="flex-1 space-y-2">
                <div className="flex items-center gap-3">
                  <Badge 
                    variant={activity.type === "Live" ? "default" : "secondary"}
                    className="text-xs"
                  >
                    {activity.type}
                  </Badge>
                  <span className="text-sm text-muted-foreground">
                    {activity.date}
                  </span>
                </div>
                <p className="text-sm font-medium truncate max-w-[300px]">
                  {activity.output}
                </p>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-muted-foreground">Accuracy:</span>
                  <Badge 
                    variant={activity.accuracy >= 90 ? "default" : "secondary"}
                    className="text-xs"
                  >
                    {activity.accuracy}%
                  </Badge>
                </div>
              </div>
              
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>
                    <Eye className="mr-2 h-4 w-4" />
                    View Details
                  </DropdownMenuItem>
                  <DropdownMenuItem className="text-red-600">
                    <Trash2 className="mr-2 h-4 w-4" />
                    Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
