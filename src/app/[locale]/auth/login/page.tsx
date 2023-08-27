import { getServerSession } from "next-auth/next";
import { authOptions } from "../../../api/auth/[...nextauth]/route";
import Login from "@/components/Login";

export default async function LoginPage() {
  const session = await getServerSession(authOptions);
  if (session) {
    return { redirect: { destination: "/" } };
  }

  return <Login session={session} />;
}
