// import { useState } from "react";
// import { Card, CardContent } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { Bell, Calendar, MessageCircle, PlusCircle } from "lucide-react";

// export default function HomeDashboard() {
//   const [cycleData, setCycleData] = useState({
//     nextPeriod: "April 10, 2025",
//     ovulation: "March 28, 2025",
//   });

//   return (
//     <div className="p-6 space-y-6">
//       {/* Header */}
//       <div className="flex justify-between items-center">
//         <h1 className="text-2xl font-bold">Welcome to Uterly 👋</h1>
//         <Bell className="w-6 h-6" />
//       </div>

//       <Card>
//         <CardContent className="p-4 space-y-2">
//           <h2 className="text-lg font-semibold">Cycle Overview</h2>
//           <p>Next Period: <strong>{cycleData.nextPeriod}</strong></p>
//           <p>Ovulation: <strong>{cycleData.ovulation}</strong></p>
//           <Button variant="outline" className="mt-2">View Details</Button>
//         </CardContent>
//       </Card>

//       {/* Quick Actions */}
//       <div className="grid grid-cols-2 gap-4">
//         <Button variant="secondary" className="flex items-center gap-2">
//           <PlusCircle className="w-5 h-5" /> Add Symptom
//         </Button>
//         <Button variant="secondary" className="flex items-center gap-2">
//           <Calendar className="w-5 h-5" /> Log Cycle
//         </Button>
//       </div>

//       {/* Health Insights */}
//       <Card>
//         <CardContent className="p-4">
//           <h2 className="text-lg font-semibold">Health Insights</h2>
//           <p>AI-powered analysis coming soon!</p>
//         </CardContent>
//       </Card>

//       {/* Community Highlights */}
//       <Card>
//         <CardContent className="p-4 flex justify-between items-center">
//           <div>
//             <h2 className="text-lg font-semibold">Community</h2>
//             <p>Join discussions & get support.</p>
//           </div>
//           <MessageCircle className="w-6 h-6" />
//         </CardContent>
//       </Card>
//     </div>
//   );
// }
