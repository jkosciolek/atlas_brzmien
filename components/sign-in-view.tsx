"use client"

import { useState } from "react"
import { Mail, Lock, LogIn } from "lucide-react"
import { useAtlas } from "@/components/atlas-context"

export function SignInView() {
  const { signIn, setView } = useAtlas()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    signIn()
    setView("profile")
  }

  return (
    <div className="flex min-h-full items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <h1 className="text-2xl font-bold tracking-tight">
            Welcome to Atlas Brzmień
          </h1>
          <p className="mt-1 text-muted-foreground">
            Sign in to access your musical passport
          </p>
        </div>

        <div className="space-y-3">
          <button
            onClick={() => {
              signIn()
              setView("profile")
            }}
            className="flex w-full items-center justify-center gap-3 rounded-xl border border-border bg-card py-3.5 font-semibold transition-colors hover:bg-accent"
          >
            <SpotifyIcon />
            Continue with Spotify
          </button>
          <button
            onClick={() => {
              signIn()
              setView("profile")
            }}
            className="flex w-full items-center justify-center gap-3 rounded-xl border border-border bg-card py-3.5 font-semibold transition-colors hover:bg-accent"
          >
            <GoogleIcon />
            Continue with Google
          </button>
        </div>

        <div className="my-6 flex items-center gap-4 text-sm text-muted-foreground">
          <span className="h-px flex-1 bg-border" />
          or
          <span className="h-px flex-1 bg-border" />
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="email"
              className="mb-1.5 block text-sm font-semibold"
            >
              Email Address
            </label>
            <div className="flex items-center gap-3 rounded-xl border border-border bg-card px-4 py-3">
              <Mail className="size-5 shrink-0 text-muted-foreground" />
              <input
                id="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground"
              />
            </div>
          </div>

          <div>
            <div className="mb-1.5 flex items-center justify-between">
              <label htmlFor="password" className="text-sm font-semibold">
                Password
              </label>
              <button
                type="button"
                className="text-sm font-medium text-primary hover:underline"
              >
                Forgot Password?
              </button>
            </div>
            <div className="flex items-center gap-3 rounded-xl border border-border bg-card px-4 py-3">
              <Lock className="size-5 shrink-0 text-muted-foreground" />
              <input
                id="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground"
              />
            </div>
          </div>

          <button
            type="submit"
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-primary py-3.5 font-semibold text-primary-foreground transition-transform hover:scale-[1.01]"
          >
            <LogIn className="size-5" />
            Sign In
          </button>
        </form>
      </div>
    </div>
  )
}

function SpotifyIcon() {
  return (
    <svg viewBox="0 0 24 24" className="size-5" fill="#1DB954" aria-hidden="true">
      <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.52 17.34c-.24.36-.66.48-1.02.24-2.82-1.74-6.36-2.1-10.56-1.14-.42.12-.78-.18-.9-.54-.12-.42.18-.78.54-.9 4.56-1.02 8.52-.6 11.64 1.32.42.18.48.66.3 1.02zm1.44-3.3c-.3.42-.84.6-1.26.3-3.24-1.98-8.16-2.58-11.94-1.38-.48.12-1.02-.12-1.14-.6-.12-.48.12-1.02.6-1.14 4.38-1.32 9.78-.66 13.5 1.62.36.18.54.78.24 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.3c-.6.18-1.2-.18-1.38-.72-.18-.6.18-1.2.72-1.38 4.26-1.26 11.28-1.02 15.72 1.62.54.3.72 1.02.42 1.56-.3.42-1.02.6-1.56.3z" />
    </svg>
  )
}

function GoogleIcon() {
  return (
    <svg viewBox="0 0 24 24" className="size-5" aria-hidden="true">
      <path
        fill="#4285F4"
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
      />
      <path
        fill="#34A853"
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
      />
      <path
        fill="#FBBC05"
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"
      />
      <path
        fill="#EA4335"
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
      />
    </svg>
  )
}
