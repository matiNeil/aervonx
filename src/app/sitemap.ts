import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes: { path: string; changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"]; priority: number }[] = [
    { path: "/", changeFrequency: "daily", priority: 1 },
    { path: "/flights", changeFrequency: "daily", priority: 0.9 },
    { path: "/accommodation", changeFrequency: "daily", priority: 0.9 },
    { path: "/packages", changeFrequency: "daily", priority: 0.8 },
    { path: "/transfers", changeFrequency: "daily", priority: 0.8 },
    { path: "/car-rentals", changeFrequency: "daily", priority: 0.8 },
    { path: "/support", changeFrequency: "monthly", priority: 0.5 },
    { path: "/privacy", changeFrequency: "yearly", priority: 0.2 },
    { path: "/terms", changeFrequency: "yearly", priority: 0.2 },
  ];

  const lastModified = new Date();

  return routes.map((route) => ({
    url: `${siteConfig.url}${route.path}`,
    lastModified,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));
}
