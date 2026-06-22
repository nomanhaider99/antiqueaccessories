import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    allowedDevOrigins: ["http://localhost:3000", "http://localhost:3001", "192.168.100.29", "192.168.0.111", "https://antiqueaccessoriess.com"],
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "utfs.io"
            }
        ],
        unoptimized: true
    }
};

export default nextConfig;
