import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    /* config options here */
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "media.dodostatic.net",
                port: "",
                search: "",
            },
            {
                protocol: "https",
                hostname: "cdn.dodostatic.net",
                port: "",
                search: "",
            },
            {
                protocol: "https",
                hostname: "cdn.inappstory.ru",
                pathname: "/story/**",
            },
        ],
        // domains: ["media.dodostatic.net", "cdn.dodostatic.net"],
    },
};

export default nextConfig;
