import React, { useState, useEffect } from 'react';
import { Button, Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectItem } from "@/components/ui/select";

const timeZones = [
  { name: 'New York', offset: '-05:00' },
  { name: 'London', offset: '+00:00' },
  { name: 'Tokyo', offset: '+09:00' },
  { name: 'Sydney', offset: '+10:00' },
];

function Clock({ name, time }) {
  return (
    <Card className="w-full sm:w-1/2 md:w-1/4 p-2">
      <CardHeader>
        <CardTitle>{name}</CardTitle>
      </CardHeader>
      <CardContent className="text-center">
        <div>{time}</div>
      </CardContent>
    </Card>
  );
}

function TimeConverter() {
  const [fromTime, setFromTime] = useState('12:00');
  const [fromZone, setFromZone] = useState(timeZones[0]);
  const [toZone, setToZone] = useState(timeZones[1]);

  const convertTime = () => {
    const [hours, minutes] = fromTime.split(':').map(Number);
    const fromOffset = Number(fromZone.offset.replace(':', ''));
    const toOffset = Number(toZone.offset.replace(':', ''));
    let totalMinutes = hours * 60 + minutes + (fromOffset - toOffset) * 60;
    
    const newHours = Math.floor(totalMinutes / 60) % 24;
    const newMinutes = totalMinutes % 60;
    
    return `${String(newHours).padStart(2, '0')}:${String(newMinutes).padStart(2, '0')}`;
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Time Zone Converter</CardTitle>
      </CardHeader>
      <CardContent>
        <Input 
          type="time" 
          value={fromTime} 
          onChange={(e) => setFromTime(e.target.value)} 
          className="mb-2"
        />
        <Select value={fromZone.name} onChange={(e) => setFromZone(timeZones.find(z => z.name === e))}>
          {timeZones.map(zone => <SelectItem key={zone.name}>{zone.name}</SelectItem>)}
        </Select>
        <p className="my-2">to</p>
        <Select value={toZone.name} onChange={(e) => setToZone(timeZones.find(z => z.name === e))}>
          {timeZones.map(zone => <SelectItem key={zone.name}>{zone.name}</SelectItem>)}
        </Select>
        <div className="mt-4">
          Converted Time: {convertTime()}
        </div>
      </CardContent>
    </Card>
  );
}

export default function App() {
  const [clocks, setClocks] = useState([]);

  useEffect(() => {
    const interval = setInterval(() => {
      setClocks(timeZones.map(zone => ({
        name: zone.name,
        time: new Date().toLocaleTimeString("en-US", {timeZone: `Etc/GMT${zone.offset}`, hour: '2-digit', minute:'2-digit'})
      })));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">World Clock</h1>
      <div className="flex flex-wrap -mx-2">
        {clocks.map((clock, index) => (
          <Clock key={index} name={clock.name} time={clock.time} />
        ))}
      </div>
      <TimeConverter />
    </div>
  );
}