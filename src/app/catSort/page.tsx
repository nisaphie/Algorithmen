"use client";
import Header from "@/components/nav/header";
import { Button } from "@/components/ui/button";
import {
  BetweenVerticalEnd,
  Binary,
  BoomBox,
  Cat,
  ListOrdered,
  PawPrint,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";

export default function Home() {
  const [image, setImage] = useState("/default_cat_1.jpg");
  const [columns, setColumns] = useState(5);
  const [rows, setRows] = useState(4);

  return (
    <div className="flex flex-col w-screen h-screen">
      <Header />
      <div className="flex flex-col gap-4 p-4">
        <Card>
          <CardHeader className="flex flex-col">
            <CardTitle className="flex flex-row gap-1">
              <Cat size={16} /> CatSort
            </CardTitle>
            <CardDescription>
              Hier kannst du ein Bild durchmischen und dann schrittweise
              sortieren lassen.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col flex-grow gap-4 items-center">
            <div className="flex flex-row gap-4 items-center w-full">
              {[
                "/default_cat_1.jpg",
                "/default_cat_2.jpg",
                "/default_cat_3.jpg",
                "/default_cat_4.jpg",
              ].map((src) => (
                <Image
                  key={src}
                  src={src}
                  alt="Default Cat"
                  width={48}
                  height={48}
                  className="rounded-md border-foreground border-2 hover:cursor-pointer transition-all duration-500 hover:border-muted-foreground hover:shadow-xl hover:scale-105"
                  onClick={() => setImage(src)}
                />
              ))}
              <Input type="file" placeholder="Datei hochladen" onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) {
                  const reader = new FileReader();
                  reader.onload = (e) => {
                    const result = e.target?.result;
                    if (typeof result === "string") {
                      setImage(result);
                    }
                  };
                  reader.readAsDataURL(file);
                }
              }} />
            </div>
            <Image src={image} alt="" width={512} height={128} />
            <div className="flex flex-row w-full gap-4">
              <div className="w-full">
                <Label>Zeilen</Label>
                <Slider
                  min={1}
                  max={10}
                  defaultValue={[columns]}
                  onValueChange={(value: number[]) => setColumns(value[0])}
                />
              </div>
              <div className="w-full">
                <Label>Spalten</Label>
                <Slider
                  min={1}
                  max={10}
                  defaultValue={[rows]}
                  onValueChange={(value: number[]) => setRows(value[0])}
                />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
