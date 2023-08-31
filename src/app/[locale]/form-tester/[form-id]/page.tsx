import FormTester from "@/components/FormTester";

export default function FormTesterPage({
  params,
}: {
  params: { "form-id": string };
}) {
  return <FormTester id={params["form-id"]} />;
}
