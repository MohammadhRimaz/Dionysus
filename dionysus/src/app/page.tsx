import { Button } from "@/components/ui/button";
import Link from "next/link";

export default async function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-4">
      <h1>Hello Dionysus!</h1>
      <Link href="/dashboard">
        <Button>Click me</Button>
      </Link>
    </div>
  );
}
