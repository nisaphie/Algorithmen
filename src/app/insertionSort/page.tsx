import Header from "@/components/nav/header";
import { Button } from "@/components/ui/button";
import { PawPrint } from "lucide-react";

export default function Home() {
  return (
    <div className="flex flex-col w-screen h-screen">
        <Header />
        Hier kannst du den Insertion Sort Algorithmus ausprobieren.
    </div>
  );
}
