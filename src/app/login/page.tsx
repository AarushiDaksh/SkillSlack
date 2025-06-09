'use client'

import { signIn } from 'next-auth/react'
import { Button } from '@/components/ui/button'

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background text-foreground">
      <div className="w-full max-w-sm bg-white dark:bg-zinc-900 p-6 rounded-xl shadow-xl space-y-6">
        <h2 className="text-xl font-semibold text-center">Login with GitHub</h2>
        <Button onClick={() => signIn('github', { callbackUrl: '/dashboard' })} className="w-full">
          Sign in with GitHub
        </Button>
      </div>
    </div>
  )
}
