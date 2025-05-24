import { AuthLayout } from "@/features/auth/auth-layout.shared";
import { SignUpForm } from "./sign-up-form.presentational";

export function SignUpPage() {
  return <AuthLayout title="サインアップ" formContent={<SignUpForm />} />;
}
