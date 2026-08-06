import { useEffect } from "react";

const BASE_TITLE = "Tarunya Systems";
const BASE_DESC =
  "Tarunya Kesharwani builds high-performance systems, AI-powered tools, and scalable web applications.";

/**
 * Lightweight per-page SEO hook.
 * Updates document.title and the meta description tag on mount.
 * Restores defaults on unmount to keep the SPA SEO-friendly.
 *
 * @param {{ title?: string, description?: string }} options
 */
const useDocumentSEO = ({ title, description } = {}) => {
  useEffect(() => {
    // — Title —
    const prevTitle = document.title;
    document.title = title ? `${title} — ${BASE_TITLE}` : BASE_TITLE;

    // — Meta description —
    let meta = document.querySelector('meta[name="description"]');
    const prevDesc = meta?.getAttribute("content") || "";
    if (meta) {
      meta.setAttribute("content", description || BASE_DESC);
    }

    // — OG title & Twitter title —
    const ogTitle = document.querySelector('meta[property="og:title"]');
    const twitterTitle = document.querySelector('meta[name="twitter:title"]');
    const prevOgTitle = ogTitle?.getAttribute("content") || "";
    const prevTwTitle = twitterTitle?.getAttribute("content") || "";
    if (ogTitle) ogTitle.setAttribute("content", document.title);
    if (twitterTitle) twitterTitle.setAttribute("content", document.title);

    // — OG description & Twitter description —
    const ogDesc = document.querySelector('meta[property="og:description"]');
    const twitterDesc = document.querySelector('meta[name="twitter:description"]');
    const prevOgDesc = ogDesc?.getAttribute("content") || "";
    const prevTwDesc = twitterDesc?.getAttribute("content") || "";
    if (ogDesc) ogDesc.setAttribute("content", description || BASE_DESC);
    if (twitterDesc) twitterDesc.setAttribute("content", description || BASE_DESC);

    // — Canonical URL —
    let canonical = document.querySelector('link[rel="canonical"]');
    const prevCanonical = canonical?.getAttribute("href") || "";
    const currentUrl = window.location.href;
    if (canonical) {
      canonical.setAttribute("href", currentUrl);
    } else {
      canonical = document.createElement("link");
      canonical.setAttribute("rel", "canonical");
      canonical.setAttribute("href", currentUrl);
      document.head.appendChild(canonical);
    }

    // — OG URL —
    const ogUrl = document.querySelector('meta[property="og:url"]');
    const prevOgUrl = ogUrl?.getAttribute("content") || "";
    if (ogUrl) {
      ogUrl.setAttribute("content", currentUrl);
    }

    return () => {
      document.title = prevTitle;
      if (meta) meta.setAttribute("content", prevDesc);
      if (ogTitle) ogTitle.setAttribute("content", prevOgTitle);
      if (ogDesc) ogDesc.setAttribute("content", prevOgDesc);
      if (canonical) {
        if (prevCanonical) {
          canonical.setAttribute("href", prevCanonical);
        } else {
          canonical.remove();
        }
      }
      if (ogUrl && prevOgUrl) {
        ogUrl.setAttribute("content", prevOgUrl);
      }
    };
  }, [title, description]);
};

export default useDocumentSEO;
