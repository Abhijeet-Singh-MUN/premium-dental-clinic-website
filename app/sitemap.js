const siteUrl = "https://globalsmilemzn.vercel.app";

const routes = [
  "",
  "/services",
  "/about",
  "/gallery",
  "/faq",
  "/contact",
  "/book-appointment"
];

export default function sitemap() {
  const lastModified = new Date();

  return routes.map((route) => ({
    url: `${siteUrl}${route}`,
    lastModified,
    changeFrequency: route === "" ? "weekly" : "monthly",
    priority: route === "" ? 1 : route === "/book-appointment" ? 0.9 : 0.8
  }));
}
