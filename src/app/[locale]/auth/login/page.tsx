import { getServerSession } from "next-auth/next";
import { authOptions } from "../../../api/auth/[...nextauth]/route";
import Login from "@/components/Login";
import { ERoutesPaths } from "@/types";

export default async function LoginPage() {
  const session = await getServerSession(authOptions);
  if (session) {
    return { redirect: { destination: ERoutesPaths.root } };
  }

  return <Login session={session} />;
}
