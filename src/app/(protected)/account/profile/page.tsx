import { ProfileForm } from "@/features/user/profile-form.presentational";

export const dynamic = "force-dynamic";

export default async function Dashboard() {
  return <ProfileForm />;
}
