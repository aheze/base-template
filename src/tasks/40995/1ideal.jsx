import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Dialog } from "@/components/ui/dialog";
import { 
  Card, 
  CardContent,
  CardTitle,
  CardDescription 
} from "@/components/ui/card";

const tips = [
  "Stick to a sleep schedule.",
  "Create a restful environment.",
  "Limit exposure to screens.",
  "Be mindful of food and drink.",
  "Exercise regularly.",
  "Manage stress and anxiety.",
  "Limit naps during the day.",
  "Avoid heavy meals before bed.",
  "Consider sleep aids cautiously.",
  "Consult a doctor if problems persist.",
];

export default function App() {
  const [sleepEntries, setSleepEntries] = useState([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [sleepTime, setSleepTime] = useState("");
  const [wakeTime, setWakeTime] = useState("");
  const [warning, setWarning] = useState("");

  const handleAddSleepEntry = () => {
    const sleepDuration = calculateDuration(sleepTime, wakeTime);
    if (sleepDuration < 6) {
      setWarning("Warning: This entry indicates sleep deprivation.");
    } else {
      setWarning("");
    }
    setSleepEntries((prev) => [
      ...prev,
      { title, date, sleepTime, wakeTime, duration: sleepDuration },
    ]);
    resetForm();
  };

  const resetForm = () => {
    setTitle("");
    setDate("");
    setSleepTime("");
    setWakeTime("");
    setIsDialogOpen(false);
  };

  const calculateDuration = (sleep, wake) => {
    const sleepDate = new Date(`${date}T${sleep}`);
    const wakeDate = new Date(`${date}T${wake}`);
    if (wakeDate < sleepDate) wakeDate.setDate(wakeDate.getDate() + 1);
    return Math.abs(wakeDate - sleepDate) / 36e5; // in hours
  };

  const handleQualityAnalysis = () => {
    alert("Analyzing sleep quality based on entries...");
  };

  const renderSleepEntries = () =>
    sleepEntries.map((entry, index) => (
      <Card key={index} className="mb-4">
        <CardContent>
          <CardTitle>{entry.title}</CardTitle>
          <CardDescription>
            Date: {entry.date} - Duration: {entry.duration.toFixed(2)} hours
          </CardDescription>
        </CardContent>
      </Card>
    ));

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-center mb-6">Sleep Tracker</h1>
      <div className="flex justify-around mb-4">
        <Button onClick={() => setIsDialogOpen(true)}>Add Sleep Entry</Button>
        <Button onClick={handleQualityAnalysis}>Sleep Quality Analysis</Button>
        <Button onClick={() => alert(tips.join("\n"))}>Useful Tips</Button>
      </div>
      {renderSleepEntries()}
      <Dialog open={isDialogOpen} onClose={resetForm}>
        <div className="text-lg font-bold mb-2">Add Sleep Entry</div>
        <div>
          <Input
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="mb-2"
          />
          <Input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="mb-2"
          />
          <Input
            type="time"
            value={sleepTime}
            onChange={(e) => setSleepTime(e.target.value)}
            className="mb-2"
          />
          <Input
            type="time"
            value={wakeTime}
            onChange={(e) => setWakeTime(e.target.value)}
            className="mb-2"
          />
          {warning && <p className="text-red-500">{warning}</p>}
        </div>
        <div className="flex justify-end mt-4">
          <Button onClick={resetForm} className="mr-2">Cancel</Button>
          <Button onClick={handleAddSleepEntry}>Submit</Button>
        </div>
      </Dialog>
    </div>
  );
}
