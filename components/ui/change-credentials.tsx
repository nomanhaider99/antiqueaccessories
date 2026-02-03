'use client';

import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "./button";
import { Label } from "./label";
import { Input } from "./input";
import React from "react";
import { Eye, EyeOff } from "lucide-react";

const ChangeCredentials = () => {
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [showPassword, setShowPassword] = React.useState(false);
  const [error, setError] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const [success, setSuccess] = React.useState(false);

  const submitHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await fetch("/api/admin/credentials", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password_hash: password }),
      });
    } catch {
      setError('Failed to update credentials. Please try again.');
    } finally {
      setLoading(false);
      setSuccess(true);
    }
  };

  return (
    <DialogContent className="w-[95vw] max-w-md sm:rounded-lg">
      <DialogHeader>
        <DialogTitle className="text-lg sm:text-xl">
          Change Credentials
        </DialogTitle>
        <DialogDescription className="text-sm">
          Update your admin email or password. This action affects your login.
        </DialogDescription>
      </DialogHeader>

      <form onSubmit={submitHandler} className="flex flex-col gap-4 py-2">
        <div className="flex flex-col gap-1">
          <Label htmlFor="username">Username</Label>
          <Input
            id="username"
            type="text"
            placeholder="Enter your username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>

        {/* Password with toggle */}
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

        {error && (
          <p className="text-sm text-red-500">{error}</p>
        )}
      </form>

      <DialogFooter className="flex flex-col-reverse sm:flex-row sm:justify-end gap-2 w-full">
        <DialogClose asChild>
          <Button
            type="button"
            variant="secondary"
            className="w-full sm:w-auto"
          >
            Cancel
          </Button>
        </DialogClose>

        <Button
          onClick={submitHandler}
          disabled={loading}
          className="w-full sm:w-auto"
        >
          {loading ? "Saving..." : success ? "Saved!" : "Save Changes"}
        </Button>
      </DialogFooter>
    </DialogContent>
  );
};

export default ChangeCredentials;
