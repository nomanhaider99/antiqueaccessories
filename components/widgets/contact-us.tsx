"use client";


import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Mail, Phone, MapPin } from "lucide-react";

export default function ContactUs() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<null | "success" | "error">(null);
  const [error, setError] = useState("");


  return (
    <section className="w-full bg-white px-4 md:px-0">
      <div className="max-w-6xl mx-auto py-20">
        {/* Breadcrumb */}
        <p className="text-center text-sm text-muted-foreground mb-4">
          Home · Contact Us
        </p>

        {/* Heading */}
        <h1 className="text-center text-3xl tracking-widest font-light mb-3">
          CONTACT US
        </h1>
        <p className="text-center text-sm text-muted-foreground mb-16">
          Please use the below form. You can also call customer service on
          <span className="ml-1">+92 312 2745789.</span>
        </p>

        {/* Content */}
        <div className="grid md:grid-cols-2 gap-16 items-start">
          {/* Support Info */}
          <div>
            <h2 className="text-lg tracking-widest mb-4">SUPPORT CUSTOMER</h2>
            <p className="text-sm text-muted-foreground mb-6 max-w-sm">
              Have a question? Please contact us using the customer support
              channels below.
            </p>

            <div className="space-y-3 text-sm">
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4" />
                <span>Phone: +92 312 2745789</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4" />
                <span>Email: antiqueaccessoriess@gmail.com</span>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <Card className="border-none shadow-none">
            <CardContent className="p-0">
              <h2 className="text-lg tracking-widest mb-4">CONTACT US</h2>
              <p className="text-sm text-muted-foreground mb-6">
                Please submit all general enquiries in the contact form below
                and we look forward to hearing from you soon.
              </p>

              <div className="grid grid-cols-2 gap-4 mb-4">
                <Input
                  required
                  placeholder="Your name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />

                <Input
                  required
                  type="email"
                  placeholder="Your Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />

              </div>

              <Textarea
                required
                placeholder="Enter your message"
                className="min-h-[160px] mb-6"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />

              <Button
                disabled={loading}
                onClick={async () => {
                  setStatus(null);
                  setError("");

                  if (!name || !email || !message) {
                    setError("All fields are required.");
                    return;
                  }

                  setLoading(true);

                  const res = await fetch("/api/contact", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ name, email, message }),
                  });

                  setLoading(false);

                  if (res.ok) {
                    setStatus("success");
                    setName("");
                    setEmail("");
                    setMessage("");
                  } else {
                    setStatus("error");
                    setError("Something went wrong. Please try again.");
                  }
                }}
                className="rounded-full px-10 py-6 bg-black text-[#E8C985] hover:bg-black/90"
              >
                {loading ? "Sending..." : "Send"}
              </Button>
              {status === "success" && (
                <p className="mt-4 text-sm text-green-600">
                  ✅ Your message has been sent successfully.
                </p>
              )}

              {(status === "error" || error) && (
                <p className="mt-4 text-sm text-red-600">
                  ❌ {error}
                </p>
              )}

            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
