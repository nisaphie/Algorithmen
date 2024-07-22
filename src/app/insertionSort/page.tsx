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

  async function insertionSort() {
    setIsRunning(true);
    let array = dataRef.current;
    let n = array.length;
  
    array[0].fill = "hsl(var(--chart-6))";
    setData([...array]);
    dataRef.current = [...array];
  
    for (let i = 1; i < n; i++) {
      array[i].fill = "hsl(var(--chart-1))";
      setData([...array]);
      dataRef.current = [...array];
      await new Promise((r) => setTimeout(r, sortingSpeedRef.current / 2));
      let current = array[i];
      let j = i - 1;
      while (j > -1 && current.value < array[j].value) {
        array[j + 1] = array[j];
        j--;
      }
      array[j + 1] = current;
      for (let k = 0; k <= i; k++) {
        array[k].fill = "hsl(var(--chart-6))";
      }
      setData([...array]);
      dataRef.current = [...array];
      await new Promise((r) => setTimeout(r, sortingSpeedRef.current / 2));
    }
    setIsRunning(false);
  }

  return (
    <div className="flex flex-col w-screen h-screen">
      <Header />
      <div className="flex flex-col gap-4 p-4">
        <Card>
          <CardHeader className="flex flex-col">
            <CardTitle>InsertionSort</CardTitle>
            <CardDescription>
              Generiere eine zufällige Liste und sortiere sie mit dem
              InsertionSort Algorithmus!
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
              onClick={insertionSort}
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
