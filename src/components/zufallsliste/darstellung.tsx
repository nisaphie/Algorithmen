"use client";

import * as React from "react";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import { Slider } from "@radix-ui/react-slider";
import Link from "next/link";

export const description = "An interactive bar chart";

var chartData = [
  { value: 387 },
  { value: 215 },
  { value: 75 },
  { value: 383 },
  { value: 122 },
];

const chartConfig = {
  value: {
    color: "",
  },
} satisfies ChartConfig;

export function neueZufallsliste() {
  for (let i = 0; i < chartData.length; i++) {
    chartData[i] = { value: Math.floor(Math.random() * 100) };
  }
}

export function Darstellung() {
  neueZufallsliste();
  const [activeChart, setActiveChart] =
    React.useState<keyof typeof chartConfig>("value");

  const total = React.useMemo(
    () => ({
      value: chartData.reduce((acc, curr) => acc + curr.value, 0),
    }),
    []
  );

  return (
    <Card>
      <CardHeader className="flex flex-col items-stretch space-y-0 border-b p-0 sm:flex-row mb-2">
        <div className="flex flex-1 flex-col justify-center gap-1 px-6 py-5 sm:py-6">
          <CardTitle>Bar Chart - InsertionSort</CardTitle>
          <CardDescription>
            Generiere eine zufällige Liste und sortiere sie mit dem
            InsertionSort Algorithmus!
          </CardDescription>
        </div>
        <div className="flex mb-2">
          <Button className="w-full justify-start gap-3" onClick={() => window.location.reload()}>
            Neue Zufallsliste erstellen
          </Button>
        </div>
      </CardHeader>

      <CardContent className="px-2 sm:p-6">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[250px] w-full"
        >
          <BarChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="value"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              tickFormatter={(value) => {
                return value;
              }}
            />

            <Bar dataKey={activeChart} fill={`var(--color-${activeChart})`} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
