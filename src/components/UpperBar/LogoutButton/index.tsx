import { Button } from "@/components/UI/Button";
import { signOut } from "next-auth/react";
import { LogOut } from "react-feather";

export default function LogoutButton({ label }: { label: string }) {
  return (
    <Button onClick={() => signOut()}>
      <span>{label}</span>
      <LogOut />
    </Button>
  );
}
