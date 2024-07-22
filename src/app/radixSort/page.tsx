"use client";

import Header from "@/components/nav/header";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { neueZufallsliste } from "@/lib/array";
import { BarChart, Bar, XAxis, Cell, ResponsiveContainer } from "recharts";
import { useState, useRef, useEffect } from "react";
import { Slider } from "@/components/ui/slider";

export default function Home() {
  const [isRunning, setIsRunning] = useState(false);
  const [arraySize, setArraySize] = useState(20);
  const [data, setData] = useState(neueZufallsliste(arraySize));
  const dataRef = useRef(data);
  const [sortingSpeed, setSortingSpeed] = useState(1000);
  const sortingSpeedRef = useRef(sortingSpeed);

  useEffect(() => {
    dataRef.current = data;
  }, [data]);

  useEffect(() => {
    const newData = neueZufallsliste(arraySize);
    setData(newData);
    dataRef.current = newData;
  }, [arraySize]);


  useEffect(() => {
    sortingSpeedRef.current = sortingSpeed;
  }, [sortingSpeed]);

  async function radixSort() {
    setIsRunning(true);
    let array = dataRef.current;
    let n = array.length;
    let max = Math.max(...array.map((x) => x.value));
    let exp = 1;
    while (Math.floor(max / exp) > 0) {
      let output = Array(n).fill({ value: 0, fill: "" });
      let count = Array(10).fill(0);
      for (let i = 0; i < n; i++) {
        count[Math.floor(array[i].value / exp) % 10]++;
      }
      for (let i = 1; i < 10; i++) {
        count[i] += count[i - 1];
      }
      for (let i = n - 1; i >= 0; i--) {
        output[count[Math.floor(array[i].value / exp) % 10] - 1] = {
          value: array[i].value,
          fill: "hsl(var(--chart-1))",
        };
        count[Math.floor(array[i].value / exp) % 10]--;
      }
      for (let i = 0; i < n; i++) {
        array[i] = output[i];
        setData([...array]);
        await new Promise((r) => setTimeout(r, sortingSpeedRef.current));
      }
      exp *= 10;
    }
    setIsRunning(false);
  }

  return (
    <div className="flex flex-col w-screen h-screen">
      <Header />
      <div className="flex flex-col gap-4 p-4">
        <Card>
          <CardHeader className="flex flex-col">
            <CardTitle>RadixSort</CardTitle>
            <CardDescription>
              Generiere eine zufällige Liste und sortiere sie mit dem
              RadixSort Algorithmus!
            </CardDescription>
          </CardHeader>

          <CardContent className="flex flex-col flex-grow">
            <div className="w-full h-96">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={data}>
                  <Bar dataKey="value">
                    {dataRef.current.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.fill} />
                    ))}
                  </Bar>
                  <XAxis dataKey="value" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
        <div className="flex flex-col gap-4">
          <div className="flex gap-4">
            <Button
              disabled={isRunning}
              className="w-full"
              onClick={() => {
                const newData = neueZufallsliste(arraySize);
                setData(newData);
                dataRef.current = newData;
              }}
            >
              Neue Zufallsliste erstellen mit n={arraySize}
            </Button>
            <Button
              disabled={isRunning}
              className="w-full"
              onClick={radixSort}
            >
              Sortieren mit Verzögerung {sortingSpeed}ms
            </Button>
          </div>
          <div className="flex gap-4">
            <Slider disabled={isRunning} min={10} max={100} defaultValue={[arraySize]} onValueChange={(value: number[]) => setArraySize(value[0])}/>
            <Slider min={0} max={2000} defaultValue={[sortingSpeed]} onValueChange={(value: number[]) => setSortingSpeed(value[0])}/>
          </div>
        </div>
      </div>
    </div>
  );
}
 