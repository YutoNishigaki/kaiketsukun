import { AuthLayout } from "@/features/auth/auth-layout.shared";
import { SignInForm } from "./sign-in-form.presentational";

export function SignInPage() {
  return <AuthLayout title="サインイン" formContent={<SignInForm />} />;
}
