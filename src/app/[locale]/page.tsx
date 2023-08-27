import { getServerSession } from "next-auth";
import Home from "@/components/Home";
import { Card } from "@/components/UI/Card";

export default async function HomePage() {
  const session = await getServerSession();

  return (
    <Card>
      <Home session={session} />
    </Card>
  );
}
