// Import required libraries and components
import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";

// Generate all available time zones
const allTimeZones = Intl.supportedValuesOf("timeZone").map((tz) => ({
  id: tz,
  name: tz.replace("_", " "),
  offset: new Date().toLocaleString("en-US", {
    timeZone: tz,
    timeZoneName: "short",
  }).split(" ").slice(-1)[0],
}));

// World map placeholder component
const WorldMap = () => (
  <div className="w-full h-72 bg-gradient-to-br from-blue-300 to-blue-500 dark:from-gray-800 dark:to-gray-900 rounded-lg relative shadow-lg">
    <div className="absolute inset-0 flex items-center justify-center text-white">
      <p className="text-lg font-bold">Interactive World Map Placeholder</p>
    </div>
  </div>
);

// Clock component to show current time for a time zone
const Clock = ({ timeZone }) => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const currentTime = new Date().toLocaleString("en-US", {
    timeZone: timeZone.id,
    timeStyle: "medium",
  });

  return (
    <Card className="w-full sm:w-48">
      <CardHeader>
        <CardTitle>{timeZone.name}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-2xl font-bold">{currentTime}</p>
        <p className="text-sm text-gray-500 dark:text-gray-400">{timeZone.offset}</p>
      </CardContent>
    </Card>
  );
};

// Time zone converter component
const TimeZoneConverter = () => {
  const [sourceZone, setSourceZone] = useState(allTimeZones[0]);
  const [targetZone, setTargetZone] = useState(allTimeZones[1]);
  const [sourceTime, setSourceTime] = useState("12:00");

  const convertTime = () => {
    const [hours, minutes] = sourceTime.split(":").map(Number);
    const sourceDate = new Date();
    sourceDate.setHours(hours, minutes, 0);

    const targetTime = new Date(
      sourceDate.toLocaleString("en-US", {
        timeZone: sourceZone.id,
      })
    );

    return targetTime.toLocaleTimeString("en-US", {
      timeZone: targetZone.id,
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Time Zone Converter</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex space-x-4">
          <Select
            onValueChange={(value) =>
              setSourceZone(allTimeZones.find((tz) => tz.id === value))
            }
          >
            <SelectTrigger>
              <SelectValue placeholder="Source Zone" />
            </SelectTrigger>
            <SelectContent>
              {allTimeZones.map((tz) => (
                <SelectItem key={tz.id} value={tz.id}>
                  {tz.name} ({tz.offset})
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Input
            type="time"
            value={sourceTime}
            onChange={(e) => setSourceTime(e.target.value)}
          />
        </div>
        <div className="flex space-x-4">
          <Select
            onValueChange={(value) =>
              setTargetZone(allTimeZones.find((tz) => tz.id === value))
            }
          >
            <SelectTrigger>
              <SelectValue placeholder="Target Zone" />
            </SelectTrigger>
            <SelectContent>
              {allTimeZones.map((tz) => (
                <SelectItem key={tz.id} value={tz.id}>
                  {tz.name} ({tz.offset})
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Input type="text" value={convertTime()} readOnly />
        </div>
      </CardContent>
    </Card>
  );
};

// Scheduler for meetings across time zones
const MeetingScheduler = () => {
  const [participants, setParticipants] = useState([]);
  const [meetingTime, setMeetingTime] = useState("12:00");

  const addParticipant = (timeZone) => {
    if (!participants.some((p) => p.id === timeZone.id)) {
      setParticipants([...participants, timeZone]);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Meeting Scheduler</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <Select
          onValueChange={(value) =>
            addParticipant(allTimeZones.find((tz) => tz.id === value))
          }
        >
          <SelectTrigger>
            <SelectValue placeholder="Add Participant" />
          </SelectTrigger>
          <SelectContent>
            {allTimeZones.map((tz) => (
              <SelectItem key={tz.id} value={tz.id}>
                {tz.name} ({tz.offset})
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <div className="flex flex-wrap gap-2">
          {participants.map((p) => (
            <Badge key={p.id}>{p.name}</Badge>
          ))}
        </div>
        <Input
          type="time"
          value={meetingTime}
          onChange={(e) => setMeetingTime(e.target.value)}
        />
        <div className="space-y-2">
          {participants.map((p, index) => {
            const [hours, minutes] = meetingTime.split(":").map(Number);
            const sourceDate = new Date();
            sourceDate.setHours(hours, minutes, 0);

            const participantTime = new Date(
              sourceDate.toLocaleString("en-US", {
                timeZone: p.id,
              })
            );

            return (
              <div key={index}>
                {p.name}:{" "}
                {participantTime.toLocaleTimeString("en-US", {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};

// Main application
export default function App() {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  return (
    <div
      className={`min-h-screen p-4 ${
        darkMode ? "dark bg-gray-900 text-white" : "bg-white text-black"
      }`}
    >
      <div className="max-w-6xl mx-auto space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">World Time Buddy</h1>
          <div className="flex items-center space-x-2">
            <span>Dark Mode</span>
            <Switch checked={darkMode} onCheckedChange={setDarkMode} />
          </div>
        </div>

        <WorldMap />
        <TimeZoneConverter />
        <MeetingScheduler />
      </div>
    </div>
  );
}
