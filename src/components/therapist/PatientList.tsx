
import { useState } from "react";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { 
  ArrowUpDown, 
  Search, 
  MoreHorizontal, 
  Filter, 
  UserPlus 
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

// Mock patient data
const patients = [
  { id: 1, name: "Anna Schmidt", status: "Active", diagnosis: "Anxiety, Depression", lastSession: "Apr 10, 2025", progress: "Improving" },
  { id: 2, name: "Thomas Becker", status: "At Risk", diagnosis: "PTSD", lastSession: "Apr 8, 2025", progress: "Needs Attention" },
  { id: 3, name: "Maria Wagner", status: "Critical", diagnosis: "Severe Depression", lastSession: "Apr 11, 2025", progress: "Declining" },
  { id: 4, name: "Julia Fischer", status: "Active", diagnosis: "Social Anxiety", lastSession: "Apr 9, 2025", progress: "Stable" },
  { id: 5, name: "Markus Weber", status: "Inactive", diagnosis: "Generalized Anxiety", lastSession: "Mar 25, 2025", progress: "Unknown" },
  { id: 6, name: "Sarah Krause", status: "Active", diagnosis: "OCD", lastSession: "Apr 7, 2025", progress: "Improving" },
  { id: 7, name: "Robert Mueller", status: "Active", diagnosis: "Depression", lastSession: "Apr 5, 2025", progress: "Stable" },
  { id: 8, name: "Lena Zimmermann", status: "Active", diagnosis: "Adjustment Disorder", lastSession: "Apr 6, 2025", progress: "Improving" },
];

export const PatientList = () => {
  const [searchQuery, setSearchQuery] = useState("");
  
  const filteredPatients = patients.filter(patient => 
    patient.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    patient.diagnosis.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Active":
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Active</Badge>;
      case "At Risk":
        return <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-100">At Risk</Badge>;
      case "Critical":
        return <Badge className="bg-red-100 text-red-800 hover:bg-red-100">Critical</Badge>;
      case "Inactive":
        return <Badge className="bg-gray-100 text-gray-800 hover:bg-gray-100">Inactive</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  const getProgressBadge = (progress: string) => {
    switch (progress) {
      case "Improving":
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Improving</Badge>;
      case "Stable":
        return <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">Stable</Badge>;
      case "Needs Attention":
        return <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-100">Needs Attention</Badge>;
      case "Declining":
        return <Badge className="bg-red-100 text-red-800 hover:bg-red-100">Declining</Badge>;
      default:
        return <Badge className="bg-gray-100 text-gray-800 hover:bg-gray-100">{progress}</Badge>;
    }
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Patient Management</CardTitle>
            <CardDescription>View and manage your patients</CardDescription>
          </div>
          <Button>
            <UserPlus className="mr-2 h-4 w-4" />
            Add Patient
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between mb-4">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search patients..."
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Button variant="outline" size="sm">
            <Filter className="mr-2 h-4 w-4" />
            Filter
          </Button>
        </div>
        
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Diagnosis</TableHead>
                <TableHead>Last Session</TableHead>
                <TableHead>Progress</TableHead>
                <TableHead className="w-14"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredPatients.map((patient) => (
                <TableRow key={patient.id}>
                  <TableCell className="font-medium">{patient.name}</TableCell>
                  <TableCell>{getStatusBadge(patient.status)}</TableCell>
                  <TableCell>{patient.diagnosis}</TableCell>
                  <TableCell>{patient.lastSession}</TableCell>
                  <TableCell>{getProgressBadge(patient.progress)}</TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>View Profile</DropdownMenuItem>
                        <DropdownMenuItem>Schedule Session</DropdownMenuItem>
                        <DropdownMenuItem>Send Message</DropdownMenuItem>
                        <DropdownMenuItem>View Progress</DropdownMenuItem>
                        <DropdownMenuItem>Edit Details</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};
