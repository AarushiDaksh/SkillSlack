"use client";

import { SignIn } from "@clerk/nextjs";
import { motion } from "framer-motion";

export default function SignInPage() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex items-center justify-center h-screen bg-gradient-to-br from-white to-neutral-100 dark:from-black dark:to-neutral-900"
    >
      <div className="rounded-xl border p-6 bg-white dark:bg-black shadow-xl">
        <SignIn
          redirectUrl="/splash"
          path="/sign-in"
          routing="path"
          signUpUrl="/sign-up"
          afterSignInUrl="/dashboard/User"    
        />
      </div>
    </motion.div>
  );
}
