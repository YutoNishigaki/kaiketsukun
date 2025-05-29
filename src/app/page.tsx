import { redirect } from "next/navigation";
import { ROUTING_PATHS } from "@/constants/paths";

export default async function RootPage() {
  redirect(ROUTING_PATHS.dashboard.root);
}
