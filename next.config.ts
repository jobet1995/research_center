import type { NextConfig } from "next";
import os from "os";

// Dynamically detect local network IPs
function getLocalNetworkIPs(): string[] {
  const interfaces = os.networkInterfaces();
  const ips: string[] = [];

  for (const name of Object.keys(interfaces)) {
    const networkInterface = interfaces[name];
    if (!networkInterface) continue;

    for (const iface of networkInterface) {
      // Skip internal (loopback) and non-IPv4 addresses
      if (iface.internal || iface.family !== "IPv4") continue;

      // Include private network ranges (192.168.x.x, 10.x.x.x, 172.16-31.x.x)
      const ip = iface.address;
      if (
        ip.startsWith("192.168.") ||
        ip.startsWith("10.") ||
        /^172\.(1[6-9]|2[0-9]|3[0-1])\./.test(ip)
      ) {
        ips.push(ip);
      }
    }
  }

  return ips;
}

const nextConfig: NextConfig = {
  /* config options here */
  allowedDevOrigins: process.env.ALLOWED_DEV_ORIGINS
    ? process.env.ALLOWED_DEV_ORIGINS.split(",")
    : getLocalNetworkIPs(),
};

export default nextConfig;
