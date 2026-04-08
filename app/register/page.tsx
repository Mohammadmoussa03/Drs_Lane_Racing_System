import { Metadata } from "next";
import Link from "next/link";
import { RegisterForm } from "@/components/auth/register-form";

export const metadata: Metadata = {
  title: "Register | DRS Lane Racing",
  description: "Create your DRS Lane Racing account and start your racing journey today.",
};

export default function RegisterPage() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <Link href="/" className="flex items-center justify-center gap-3 mb-8">
          <div className="w-12 h-12 bg-primary rounded-sm flex items-center justify-center transform -skew-x-6">
            <span className="text-primary-foreground font-bold text-xl transform skew-x-6">
              DRS
            </span>
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-foreground text-xl tracking-tight leading-none">
              DRS LANE
            </span>
            <span className="text-xs text-muted-foreground tracking-widest uppercase">
              Racing
            </span>
          </div>
        </Link>

        {/* Form Card */}
        <div className="bg-card border border-border rounded-sm p-8">
          <h1 className="text-2xl font-bold text-foreground mb-2 text-center">
            Join the Grid
          </h1>
          <p className="text-muted-foreground text-center mb-8">
            Create your account and start racing today
          </p>

          <RegisterForm />

          <p className="text-center text-sm text-muted-foreground mt-6">
            Already have an account?{" "}
            <Link href="/login" className="text-primary hover:underline font-medium">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
