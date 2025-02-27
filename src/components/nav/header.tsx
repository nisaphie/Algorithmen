import {
  BetweenVerticalEnd,
  Binary,
  BoomBox,
  Cat,
  House,
  ListOrdered,
  PawPrint,
} from "lucide-react";
import { Button } from "../ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Separator } from "../ui/separator";
import Link from "next/link";

export default function Header() {
  return (
    <div className="justify-center sticky top-0 left-0 right-0 h-12 flex flex-row p-4 gap-4 items-center border-b mb-2">
      <h1 className="font-semibold">Sortieralgorithmen</h1>

      <Sheet>
        <SheetTrigger asChild>
          <Button variant={"ghost"} className="absolute left-2">
            <PawPrint className="text-primary" />
          </Button>
        </SheetTrigger>
        <SheetContent className="w-60" side={"left"}>
          <SheetHeader>
            <SheetTitle className="mb-6">Übersicht</SheetTitle>
            <SheetDescription className="flex flex-col gap-2">
              <SheetClose>
                <Link href="/home">
                  <Button
                    variant={"ghost"}
                    className="justify-start gap-3 font-semibold w-full"
                  >
                    <House className="text-primary" />
                    Home
                  </Button>
                </Link>
              </SheetClose>

              <Separator />
              <SheetClose>
                <Link href="/insertionSort">
                  <Button
                    variant={"ghost"}
                    className="w-full justify-start gap-3"
                  >
                    <BetweenVerticalEnd className="text-primary" />
                    InsertionSort
                  </Button>
                </Link>
              </SheetClose>
              <SheetClose>
                <Link href="/catSort">
                  <Button
                    variant={"ghost"}
                    className="justify-start gap-3 w-full"
                  >
                    <Cat className="text-primary" />
                    KatzenSort
                  </Button>
                </Link>
                </SheetClose>
              <SheetClose>
                <Link href="/radixSort">
                  <Button
                    variant={"ghost"}
                    className="justify-start gap-3 w-full"
                  >
                    <Binary className="text-primary" />
                    RadixSort
                  </Button>
                </Link>
              </SheetClose>
            </SheetDescription>
          </SheetHeader>
        </SheetContent>
      </Sheet>
    </div>
  );
}
