/* eslint-disable @next/next/no-img-element */
import Header from "@/components/nav/header";
import { Button } from "@/components/ui/button";
import { BetweenVerticalEnd, BoomBox, Cat, ListOrdered, PawPrint } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function Home() {
  return (
    <div className="flex flex-col w-screen h-screen">
      <Header />
      <p className="mb-4">
        Auf dieser Webseite werden verschiedene Sortieralgorithmen dargestellt.
        Schau dir die verschiedenen Algorithmen an.
      </p>
      <a href="/insertionSort">
      <Card>
        <CardHeader>
          <CardTitle>InsertionSort</CardTitle>
          <CardDescription>Sortieren durch einsetzen</CardDescription>
        </CardHeader>
        <CardContent>
          <BetweenVerticalEnd size={64} />
        </CardContent>
        <CardFooter>
        </CardFooter>
      </Card>
      </a>
      <a href="/catSort">
      <Card>
        <CardHeader>
          <CardTitle>CatSort</CardTitle>
          <CardDescription>Bild einer Katze sortieren</CardDescription>
        </CardHeader>
        <CardContent>
          <Cat size={64} />
        </CardContent>
        <CardFooter>
        </CardFooter>
      </Card>
      </a>
      <a href="/radixSort">
      <Card>
        <CardHeader>
          <CardTitle>RadixSort</CardTitle>
          <CardDescription>Sortieren nach Ziffer</CardDescription>
        </CardHeader>
        <CardContent>
          <ListOrdered size={64} />
        </CardContent>
        <CardFooter>
        </CardFooter>
      </Card>
      </a>
    </div>
  );
}
