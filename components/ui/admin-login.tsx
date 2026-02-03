'use client'

import React from "react"
import Button from "./custom-button"
import { Input } from "./input"
import { Label } from "./label"
import { useRouter } from "next/dist/client/components/navigation"
import { Eye, EyeOff } from "lucide-react"

const AdminLogin = () => {
  const [loading, setLoading] = React.useState(false)
  const [error, setError] = React.useState<string | null>(null)
  const [success, setSuccess] = React.useState<string | null>(null)
  const [username, setUsername] = React.useState("")
  const [password, setPassword] = React.useState("")
  const [showPassword, setShowPassword] = React.useState(false)
  const router = useRouter();

  const submitHandler = async (e: React.FormEvent) => {
  e.preventDefault();

  setError(null);
  setSuccess(null);

  if (!username || !password) {
    setError("Please fill out both fields.");
    return;
  }

  setLoading(true);

  try {
    const res = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });

    const data = await res.json();

    if (!res.ok) {
      setError(data.message || "Invalid username or password.");
      return;
    }

    setSuccess("Login successful. Redirecting...");
    router.push("/admin/dashboard");
  } catch {
    setError("Something went wrong. Please try again.");
  } finally {
    setLoading(false);
  }
};

  return (
    <form
      onSubmit={submitHandler}
      className="w-[400px] px-4 py-4 rounded-md border border-zinc-800/15 flex flex-col gap-4"
    >
      {/* Header */}
      <div className="flex flex-col tracking-tight">
        <h1 className="text-2xl font-semibold">Admin Login</h1>
        <p className="text-sm text-gray-600">
          Please enter your credentials to access the admin panel.
        </p>
      </div>

      {/* Inputs */}
      <div className="flex flex-col gap-3">
        <div className="flex flex-col gap-1">
          <Label htmlFor="username">Username</Label>
          <Input
            id="username"
            type="text"
            placeholder="Enter your email"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>

        {/* Password with eye toggle */}
        <div className="flex flex-col gap-1">
          <Label htmlFor="password">Password</Label>

          <div className="relative">
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="pr-10"
            />

            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
            >
              {showPassword ? (
                <EyeOff className="h-4 w-4" />
              ) : (
                <Eye className="h-4 w-4" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="flex flex-col gap-2">
        <Button
          className="w-full"
          variant="primary"
          type="submit"
          disabled={loading}
        >
          {loading ? "Logging in..." : "Login"}
        </Button>

        {error && (
          <p className="text-sm text-red-500">{error}</p>
        )}

        {success && (
          <p className="text-sm text-green-600">{success}</p>
        )}
      </div>
    </form>
  )
}

export default AdminLogin
