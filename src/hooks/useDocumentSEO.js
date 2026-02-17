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

    // — OG title —
    const ogTitle = document.querySelector('meta[property="og:title"]');
    const prevOgTitle = ogTitle?.getAttribute("content") || "";
    if (ogTitle) {
      ogTitle.setAttribute("content", document.title);
    }

    // — OG description —
    const ogDesc = document.querySelector('meta[property="og:description"]');
    const prevOgDesc = ogDesc?.getAttribute("content") || "";
    if (ogDesc) {
      ogDesc.setAttribute("content", description || BASE_DESC);
    }

    return () => {
      document.title = prevTitle;
      if (meta) meta.setAttribute("content", prevDesc);
      if (ogTitle) ogTitle.setAttribute("content", prevOgTitle);
      if (ogDesc) ogDesc.setAttribute("content", prevOgDesc);
    };
  }, [title, description]);
};

export default useDocumentSEO;
