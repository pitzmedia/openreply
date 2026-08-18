import type { MetadataRoute } from "next";

// Private instance: nothing here should be indexed. Upstream ships SEO landing
// pages aimed at ranking for terms like "manychat alternative", which is not
// something this deployment wants attached to its domain.
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      disallow: "/",
    },
  };
}
