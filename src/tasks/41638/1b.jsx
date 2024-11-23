import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const timeZones = [
  { id: "UTC", name: "UTC", offset: 0 },
  { id: "EST", name: "Eastern Time", offset: -5 },
  { id: "PST", name: "Pacific Time", offset: -8 },
  { id: "JST", name: "Japan Standard Time", offset: 9 },
  { id: "CET", name: "Central European Time", offset: 1 },
];

const WorldMap = () => (
  <div className="w-full h-64 bg-gray-200 dark:bg-gray-700 rounded-lg">
    {/* Placeholder for world map */}
    <div className="flex items-center justify-center h-full text-gray-500 dark:text-gray-400">
      World Map Placeholder
    </div>
  </div>
);

const Clock = ({ timeZone }) => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const offsetTime = new Date(time.getTime() + timeZone.offset * 3600000);

  return (
    <Card className="w-full sm:w-48">
      <CardHeader>
        <CardTitle>{timeZone.name}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-2xl font-bold">{offsetTime.toLocaleTimeString()}</p>
      </CardContent>
    </Card>
  );
};

const TimeZoneConverter = () => {
  const [sourceZone, setSourceZone] = useState(timeZones[0]);
  const [targetZone, setTargetZone] = useState(timeZones[1]);
  const [sourceTime, setSourceTime] = useState("12:00");

  const convertTime = () => {
    const [hours, minutes] = sourceTime.split(":").map(Number);
    const date = new Date();
    date.setHours(hours);
    date.setMinutes(minutes);
    date.setSeconds(0);
    const targetTime = new Date(date.getTime() + (targetZone.offset - sourceZone.offset) * 3600000);
    return targetTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Time Zone Converter</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex space-x-4">
          <Select onValueChange={(value) => setSourceZone(timeZones.find(tz => tz.id === value))}>
            <SelectTrigger>
              <SelectValue placeholder="Source Zone" />
            </SelectTrigger>
            <SelectContent>
              {timeZones.map((tz) => (
                <SelectItem key={tz.id} value={tz.id}>{tz.name}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Input type="time" value={sourceTime} onChange={(e) => setSourceTime(e.target.value)} />
        </div>
        <div className="flex space-x-4">
          <Select onValueChange={(value) => setTargetZone(timeZones.find(tz => tz.id === value))}>
            <SelectTrigger>
              <SelectValue placeholder="Target Zone" />
            </SelectTrigger>
            <SelectContent>
              {timeZones.map((tz) => (
                <SelectItem key={tz.id} value={tz.id}>{tz.name}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Input type="text" value={convertTime()} readOnly />
        </div>
      </CardContent>
    </Card>
  );
};

const MeetingScheduler = () => {
  const [participants, setParticipants] = useState([]);
  const [meetingTime, setMeetingTime] = useState("12:00");

  const addParticipant = (timeZone) => {
    setParticipants([...participants, timeZone]);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Meeting Scheduler</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <Select onValueChange={(value) => addParticipant(timeZones.find(tz => tz.id === value))}>
          <SelectTrigger>
            <SelectValue placeholder="Add Participant" />
          </SelectTrigger>
          <SelectContent>
            {timeZones.map((tz) => (
              <SelectItem key={tz.id} value={tz.id}>{tz.name}</SelectItem>
            ))}
          </SelectContent>
        </Select>
        <div className="flex flex-wrap gap-2">
          {participants.map((p, index) => (
            <Badge key={index} variant="secondary">{p.name}</Badge>
          ))}
        </div>
        <Input type="time" value={meetingTime} onChange={(e) => setMeetingTime(e.target.value)} />
        <div className="space-y-2">
          {participants.map((p, index) => {
            const [hours, minutes] = meetingTime.split(":").map(Number);
            const date = new Date();
            date.setHours(hours);
            date.setMinutes(minutes);
            const participantTime = new Date(date.getTime() + p.offset * 3600000);
            return (
              <div key={index}>
                {p.name}: {participantTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};

const GlobalInsights = () => (
  <Card>
    <CardHeader>
      <CardTitle>Global Insights</CardTitle>
    </CardHeader>
    <CardContent>
      <p>Did you know? France has the most time zones of any country, with 12 zones including its overseas territories.</p>
    </CardContent>
  </Card>
);

export default function App() {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  return (
    <div className={`min-h-screen p-4 ${darkMode ? 'dark bg-gray-900 text-white' : 'bg-white text-black'}`}>
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">World Clock App</h1>
          <div className="flex items-center space-x-2">
            <span>Dark Mode</span>
            <Switch checked={darkMode} onCheckedChange={setDarkMode} />
          </div>
        </div>

        <WorldMap />

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {timeZones.slice(0, 3).map((tz) => (
            <Clock key={tz.id} timeZone={tz} />
          ))}
        </div>

        <Tabs defaultValue="converter">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="converter">Converter</TabsTrigger>
            <TabsTrigger value="scheduler">Scheduler</TabsTrigger>
            <TabsTrigger value="insights">Insights</TabsTrigger>
          </TabsList>
          <TabsContent value="converter">
            <TimeZoneConverter />
          </TabsContent>
          <TabsContent value="scheduler">
            <MeetingScheduler />
          </TabsContent>
          <TabsContent value="insights">
            <GlobalInsights />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}