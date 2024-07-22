/* eslint-disable @next/next/no-img-element */
import Header from "@/components/nav/header";
import { Button } from "@/components/ui/button";
import {
  BetweenVerticalEnd,
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
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col w-screen h-screen">
      <Header />
      <div className="flex flex-col gap-4 p-4">
        <h1 className="font-semibold text-xl">Übersicht</h1>
        <p className="">
          Auf dieser Webseite werden verschiedene Sortieralgorithmen
          dargestellt. Schau dir die verschiedenen Algorithmen an.
        </p>

        <Link href="/insertionSort">
          <Card className="">
            <CardHeader>
              <CardTitle>InsertionSort</CardTitle>
              <CardDescription>Sortieren durch Einsetzen</CardDescription>
            </CardHeader>
            <CardContent>
              <BetweenVerticalEnd size={64} />
            </CardContent>
            <CardFooter></CardFooter>
          </Card>
        </Link>
        <Link href="/catSort">
          <Card>
            <CardHeader>
              <CardTitle>CatSort</CardTitle>
              <CardDescription>Bild einer Katze sortieren</CardDescription>
            </CardHeader>
            <CardContent>
              <Cat size={64} />
            </CardContent>
            <CardFooter></CardFooter>
          </Card>
        </Link>
        <Link href="/radixSort">
          <Card>
            <CardHeader>
              <CardTitle>RadixSort</CardTitle>
              <CardDescription>Sortieren nach Ziffer</CardDescription>
            </CardHeader>
            <CardContent>
              <ListOrdered size={64} />
            </CardContent>
            <CardFooter></CardFooter>
          </Card>
        </Link>
      </div>
    </div>
  );
}
