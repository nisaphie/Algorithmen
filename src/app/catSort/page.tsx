"use client";
import { useEffect, useRef, useState } from "react";
import Header from "@/components/nav/header";
import { Button } from "@/components/ui/button";
import { Cat, Loader2 } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import NextImage from "next/image";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { delay } from "@/lib/utils";

export default function Home() {
  const [sortingSpeed, setSortingSpeed] = useState(200);
  const sortingSpeedRef = useRef(sortingSpeed);

  const [columns, setColumns] = useState(5);
  const [rows, setRows] = useState(4);

  const [image, setImage] = useState("/default_cat_1.jpg");
  const [imageState, setImageState] = useState<
    "original" | "shuffled" | "sorted" | "loading"
  >("original");
  const [imageElements, setImageElements] = useState<
    React.ReactNode[] | null
  >();

  const [sortingAlgorithm, setSortingAlgorithm] = useState<
    "bubble" | "insertion"
  >();

  useEffect(() => {
    sortingSpeedRef.current = sortingSpeed;
  }, [sortingSpeed]);

  useEffect(() => {
    setImageState("original");
    const elements = [];
    for (var i = 0; i < rows * columns; ++i) {
      elements.push(
        <div
          key={i}
          className={`h-full border-black/60 ${i % columns < columns - 1 ? "border-r-2" : ""} ${i < columns * (rows - 1) ? "border-b-2" : ""}`}
        />
      );
    }
    setImageElements(elements);
  }, [rows, columns]);

  function cutUpAndShuffle() {
    var imageToCut = new Image();
    imageToCut.onload = cutImageUp;
    imageToCut.src = image;

    async function cutImageUp() {
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
      // Shuffle the pieces
      imagePieces.sort(() => Math.random() - 0.5);
      const elements = imagePieces.map((piece, index) => (
        <div
          key={piece.index}
          data-key={piece.index}
          style={{
            backgroundImage: `url(${piece.data})`,
            backgroundSize: "cover",
          }}
        />
      ));
      setImageState("shuffled");
      setImageElements(elements);
    }
  }

  function handleSort() {
    if (!sortingAlgorithm) return alert("Please select a sorting algorithm");
    setImageState("loading");
    const elements = imageElements as React.ReactElement<any>[];
    const length = elements?.length;
    if (!length) return;
    const bubbleSort = async () => {
      for (let i = 0; i < length - 1; i++) {
        for (let j = 0; j < length - i - 1; j++) {
          if (
            elements[j].props["data-key"] > elements[j + 1].props["data-key"]
          ) {
            const temp = elements[j];
            elements[j] = elements[j + 1];
            elements[j + 1] = temp;
            setImageElements([...elements]);
            await delay(sortingSpeedRef.current);
          }
        }
      }
      setImageState("original");
    };

    const insertionSort = async () => {
      // TODO: Implement insertion sort
      setImageElements(
        [...elements].sort((a, b) => a.props["data-key"] - b.props["data-key"])
      );
      for (let i = 1; i < length; i++) {
        let key = elements[i];
        let j = i - 1;
        while (
          j >= 0 &&
          elements[j].props["data-key"] > key.props["data-key"]
        ) {
          elements[j + 1] = elements[j];
          j = j - 1;
        }
        elements[j + 1] = key;
        setImageElements([...elements]);
        await delay(sortingSpeedRef.current);
      }
      setImageState("original");
    };

    if (sortingAlgorithm === "insertion") insertionSort();
    if (sortingAlgorithm === "bubble") bubbleSort();
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
              <NextImage
                src={image}
                alt="Picture to divide"
                fill={true}
                style={imageState === "original" ? {} : { display: "none" }}
              />
              <div
                className="absolute w-full h-full grid"
                style={{
                  gridTemplateColumns: `repeat(${columns}, 1fr)`,
                  gridTemplateRows: `repeat(${rows}, 1fr)`,
                }}
              >
                {imageElements}
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
                  disabled={imageState !== "original"}
                  className={imageState !== "original" ? "opacity-50" : ""}
                />
              </div>
              <div className="w-full">
                <Label>Spalten: {columns}</Label>
                <Slider
                  min={1}
                  max={25}
                  defaultValue={[columns]}
                  onValueChange={(value: number[]) => setColumns(value[0])}
                  disabled={imageState !== "original"}
                  className={imageState !== "original" ? "opacity-50" : ""}
                />
              </div>
            </div>
            <div className="flex flex-row gap-4 w-full">
              {imageState === "loading" ? (
                <Button disabled className="w-full">
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Please wait
                </Button>
              ) : (
                <Button
                  className="w-full"
                  onClick={cutUpAndShuffle}
                  disabled={imageState !== "original"}
                >
                  Mischen
                </Button>
              )}
              <Select
                onValueChange={(value) =>
					setSortingAlgorithm(value as "bubble" | "insertion")
                }
				>
                <SelectTrigger className="w-[280px]">
                  <SelectValue placeholder="Algorithmus auswählen" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="insertion">InsertionSort</SelectItem>
                  <SelectItem value="bubble">BubbleSort</SelectItem>
                </SelectContent>
              </Select>
            </div>
			  <div className="flex flex-row gap-4 w-full">
				  {imageState === "loading" ? (
					<Button disabled className="w-full">
					  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
					  Please wait
					</Button>
				  ) : (
					<Button
					  className="w-full"
					  onClick={handleSort}
					  disabled={imageState !== "shuffled"}
					>
					  Sortieren mit Verzögerung: {sortingSpeed}ms
					</Button>
				  )}
			  <Slider min={0} max={2000} defaultValue={[sortingSpeed]} onValueChange={(value: number[]) => setSortingSpeed(value[0])}/>
				</div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
