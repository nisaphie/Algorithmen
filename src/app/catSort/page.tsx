"use client";
import Header from "@/components/nav/header";
import { Button } from "@/components/ui/button";
import { Cat } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import NextImage from "next/image";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Loader2 } from "lucide-react";

export default function Home() {
  const [isLoading, setIsLoading] = useState(false);
  const [image, setImage] = useState("/default_cat_1.jpg");
  const [columns, setColumns] = useState(5);
  const [rows, setRows] = useState(4);
  const [imageState, setImageState] = useState<
    "original" | "shuffled" | "sorted"
  >("original");

  function ButtonLoading() {
    return (
      <Button className="w-full" disabled>
        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
        Please wait
      </Button>
    );
  }

  async function handleShuffle() {
    setIsLoading(true);
    // Shuffle image
    cutUpImage();
    shuffleImage();
    setImageState("shuffled");
    await new Promise((r) => setTimeout(r, 100));
    setIsLoading(false);
  }

  function shuffleImage() {  
    
  }

  useEffect(() => {
    // Reset image state
    setImageState("original");
    const image = document.getElementById("image");
    if (image) {
      while (image.firstChild) {
        image.removeChild(image.firstChild);
      }
    }
    for (var i = 0; i < rows * columns; ++i) {
      const img = document.createElement("div");
      img.className = `h-full border-black/60 ${
        i % columns < columns - 1 ? "border-r-2" : ""
      } ${i < columns * (rows - 1) ? "border-b-2" : ""}`;
      image?.appendChild(img);
    }
  }, [rows, columns]);

  function cutUpImage() {
    var imageToCut = new Image();
    imageToCut.onload = cutImageUp;
    imageToCut.src = image;

    function cutImageUp() {
      var widthOfOnePiece = imageToCut.width / columns;
      var heightOfOnePiece = imageToCut.height / rows;
      var imagePieces = [];
      var index = 0;
      for (var y = 0; y < rows; ++y) {
        for (var x = 0; x < columns; ++x) {
          var canvas = document.createElement("canvas");
          canvas.width = widthOfOnePiece;
          canvas.height = heightOfOnePiece;
          var context = canvas.getContext("2d");
          context?.drawImage(
            imageToCut,
            x * widthOfOnePiece,
            y * heightOfOnePiece,
            widthOfOnePiece,
            heightOfOnePiece,
            0,
            0,
            canvas.width,
            canvas.height
          );
          imagePieces.push({
            index: index++,
            data: canvas.toDataURL(),
          });
        }
      }
      // Display pieces
      var image = document.getElementById("image");
      if (image) {
        for (var i = 0; i < imagePieces.length; ++i) {
          var imgElement = image.children[i] as HTMLImageElement;
          if (imgElement) {
            imgElement.style.backgroundImage = `url(${imagePieces[i].data})`;
            imgElement.dataset.index = imagePieces[i].index.toString();
            imgElement.style.backgroundSize = "cover";
            imgElement.style.backgroundPosition = "center";
          }
        }
      }
    }
  }

  function handleSort() {
    // Sort image
    const imageElements = document.getElementById("image")?.children;
    if (!imageElements) {
      return;
    }

    // Bublesort
    console.log(imageElements);
    for (var i = 0; i < imageElements.length; ++i) {
      for (var j = 0; j < imageElements.length - i - 1; ++j) {
        const a = imageElements[j] as HTMLImageElement;
        const b = imageElements[j + 1] as HTMLImageElement;
        if (a.dataset.index && b.dataset.index) {
          if (parseInt(a.dataset.index) > parseInt(b.dataset.index)) {
            const temp = a.style.backgroundImage;
            a.style.backgroundImage = b.style.backgroundImage;
            b.style.backgroundImage = temp;
            const tempIndex = a.dataset.index;
            a.dataset.index = b.dataset.index;
            b.dataset.index = tempIndex;
          }
        }
      }
    }

    setImageState("sorted");
  }

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
                <NextImage
                  key={src}
                  src={src}
                  alt="Default Cat"
                  width={48}
                  height={48}
                  className="rounded-md border-foreground border-2 hover:cursor-pointer transition-all duration-500 hover:border-muted-foreground hover:shadow-xl hover:scale-105"
                  onClick={() => setImage(src)}
                />
              ))}
              <Input
                type="file"
                placeholder="Datei hochladen"
                onChange={(e) => {
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
                }}
              />
            </div>
            <div className="relative w-96 aspect-[3/4]">
              <NextImage src={image} alt="Picture to divide" fill={true} />
              <div
                className="absolute w-full h-full grid"
                style={{
                  gridTemplateColumns: `repeat(${columns}, 1fr)`,
                  gridTemplateRows: `repeat(${rows}, 1fr)`,
                }}
                id="image"
              >
                {/* Image pieces will be inserted here */}
              </div>
            </div>
            <div className="flex flex-row w-full gap-4">
              <div className="w-full">
                <Label>Zeilen: {rows}</Label>
                <Slider
                  min={1}
                  max={25}
                  defaultValue={[rows]}
                  onValueChange={(value: number[]) => setRows(value[0])}
                />
              </div>
              <div className="w-full">
                <Label>Spalten: {columns}</Label>
                <Slider
                  min={1}
                  max={25}
                  defaultValue={[columns]}
                  onValueChange={(value: number[]) => setColumns(value[0])}
                />
              </div>
            </div>
            <div className="flex flex-row gap-4 w-full">
              {isLoading ? (
                <ButtonLoading />
              ) : (
                <Button className="w-full" onClick={handleShuffle}>
                  Mischen
                </Button>
              )}
              {isLoading ? (
                <ButtonLoading />
              ) : (
                <Button className="w-full" onClick={handleSort}>
                  Sortieren
                </Button>
              )}
              <h1>{imageState}</h1>
              <Select>
                <SelectTrigger className="w-[280px]">
                  <SelectValue placeholder="Algorithmus auswählen" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="light">InsertionSort</SelectItem>
                  <SelectItem value="dark">BubbleSort</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
