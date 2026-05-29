"use client";

import { GitBranch, Mail } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { signIn } from "next-auth/react";

export default function SignInPage() {
  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-violet-500 to-fuchsia-500 flex items-center justify-center text-white font-bold text-lg mx-auto mb-4">AI</div>
          <h1 className="text-2xl font-bold text-white">Welcome to AIStack</h1>
          <p className="text-zinc-400 text-sm mt-1">Sign in to save favorites and write reviews</p>
        </div>

        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 space-y-3">
          <Button onClick={() => signIn("google", { callbackUrl: "/" })} variant="outline" size="lg" className="w-full">
            <Mail size={16} /> Continue with Google
          </Button>
          <Button onClick={() => signIn("github", { callbackUrl: "/" })} variant="outline" size="lg" className="w-full">
            <GitBranch size={16} /> Continue with GitHub
          </Button>
          <p className="text-zinc-600 text-xs text-center pt-2">
            By signing in, you agree to our Terms of Service
          </p>
        </div>
      </div>
    </div>
  );
}
