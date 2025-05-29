import { ProfileForm } from "./profile-form.presentational";
import { fetchUser } from "@/features/user/repositories";

export async function ProfileFormContainer() {
  const user = await fetchUser();

  return <ProfileForm username={user.userName || ""} />;
}
