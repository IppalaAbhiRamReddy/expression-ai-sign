
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
import { Eye, Trash2 } from "lucide-react";

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
      <Card>
        <CardHeader>
          <CardTitle>Recent Sessions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">
            <p className="text-muted-foreground">No activity yet. Try translating!</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Sessions</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Date</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Output</TableHead>
              <TableHead>Accuracy</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody role="list">
            {displayData.map((activity) => (
              <TableRow key={activity.id}>
                <TableCell>{activity.date}</TableCell>
                <TableCell>
                  <Badge variant={activity.type === "Live" ? "default" : "secondary"}>
                    {activity.type}
                  </Badge>
                </TableCell>
                <TableCell className="max-w-xs truncate">
                  {activity.output}
                </TableCell>
                <TableCell>
                  <Badge 
                    variant={activity.accuracy >= 90 ? "default" : "secondary"}
                  >
                    {activity.accuracy}%
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="flex space-x-2">
                    <Button size="sm" variant="ghost">
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button size="sm" variant="ghost" className="text-red-600">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
