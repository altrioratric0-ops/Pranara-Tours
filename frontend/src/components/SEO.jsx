import { useEffect } from 'react';

const DEFAULT_DOMAIN = 'https://www.pranaramunnar.com';

export default function SEO({
  title = "Pranara | Premium Kerala & Munnar Tour Packages | Customized Travel Planner",
  description = "Discover the magic of Kerala with Prana Munnar. Customized tour packages for Munnar tea hills, Kolukkumalai jeep safari, Alleppey backwaters, Thekkady, and Wayanad.",
  keywords = "Kerala travel, Munnar tour packages, Prana Munnar, Kolukkumalai jeep safari, Alleppey houseboat cruise, Wayanad tours, Pranara Travel",
  canonical,
  noindex = false,
  ogTitle,
  ogDescription,
  ogImage = "/assets/logo.png",
  ogType = "website",
  jsonLd = null,
}) {
  useEffect(() => {
    // 1. Title
    document.title = title;

    // Helper function to update or create meta tags
    const updateMetaTag = (selector, attributeName, attributeValue, contentValue) => {
      if (!contentValue) return;
      let el = document.head.querySelector(selector);
      if (!el) {
        el = document.createElement('meta');
        el.setAttribute(attributeName, attributeValue);
        document.head.appendChild(el);
      }
      el.setAttribute('content', contentValue);
    };

    // 2. Standard Meta Tags
    updateMetaTag('meta[name="description"]', 'name', 'description', description);
    updateMetaTag('meta[name="keywords"]', 'name', 'keywords', keywords);
    updateMetaTag('meta[name="robots"]', 'name', 'robots', noindex ? 'noindex, follow' : 'index, follow');

    // 3. Canonical URL
    const targetCanonical = canonical || `${DEFAULT_DOMAIN}${window.location.pathname}`;
    let canonicalEl = document.head.querySelector('link[rel="canonical"]');
    if (!canonicalEl) {
      canonicalEl = document.createElement('link');
      canonicalEl.setAttribute('rel', 'canonical');
      document.head.appendChild(canonicalEl);
    }
    canonicalEl.setAttribute('href', targetCanonical);

    // 4. Open Graph Meta Tags
    const finalOgTitle = ogTitle || title;
    const finalOgDesc = ogDescription || description;
    const absoluteOgImage = ogImage.startsWith('http')
      ? ogImage
      : `${DEFAULT_DOMAIN}${ogImage.startsWith('/') ? '' : '/'}${ogImage}`;

    updateMetaTag('meta[property="og:title"]', 'property', 'og:title', finalOgTitle);
    updateMetaTag('meta[property="og:description"]', 'property', 'og:description', finalOgDesc);
    updateMetaTag('meta[property="og:type"]', 'property', 'og:type', ogType);
    updateMetaTag('meta[property="og:url"]', 'property', 'og:url', targetCanonical);
    updateMetaTag('meta[property="og:image"]', 'property', 'og:image', absoluteOgImage);
    updateMetaTag('meta[property="og:site_name"]', 'property', 'og:site_name', 'PRANARA Travel Co.');

    // 5. Twitter Card Meta Tags
    updateMetaTag('meta[name="twitter:card"]', 'name', 'twitter:card', 'summary_large_image');
    updateMetaTag('meta[name="twitter:title"]', 'name', 'twitter:title', finalOgTitle);
    updateMetaTag('meta[name="twitter:description"]', 'name', 'twitter:description', finalOgDesc);
    updateMetaTag('meta[name="twitter:image"]', 'name', 'twitter:image', absoluteOgImage);

    // 6. JSON-LD Structured Data Injection
    let scriptEl = document.head.querySelector('script[id="seo-json-ld"]');
    if (jsonLd) {
      if (!scriptEl) {
        scriptEl = document.createElement('script');
        scriptEl.setAttribute('type', 'application/ld+json');
        scriptEl.setAttribute('id', 'seo-json-ld');
        document.head.appendChild(scriptEl);
      }
      scriptEl.textContent = JSON.stringify(jsonLd);
    } else if (scriptEl) {
      scriptEl.remove();
    }
  }, [title, description, keywords, canonical, noindex, ogTitle, ogDescription, ogImage, ogType, jsonLd]);

  return null;
}
