import { useEffect } from "react";

const SITE_NAME = "TechFest 2026";
const BASE_URL = "https://techfest2026.in";

type DocumentHeadOptions = {
  title: string;
  description?: string;
  path?: string;
};

function upsertMeta(attr: "name" | "property", key: string, content: string) {
  let el = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

function upsertCanonical(href: string) {
  let el = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
  if (!el) {
    el = document.createElement("link");
    el.setAttribute("rel", "canonical");
    document.head.appendChild(el);
  }
  el.setAttribute("href", href);
}

/**
 * Sets the document title, meta description, canonical URL, and
 * Open Graph/Twitter tags for the current route. Call once per page
 * component. Falls back gracefully if `path` is omitted (canonical
 * just isn't updated).
 */
export function useDocumentHead({ title, description, path }: DocumentHeadOptions) {
  useEffect(() => {
    const fullTitle = title === SITE_NAME ? title : `${title} | ${SITE_NAME}`;
    document.title = fullTitle;

    if (description) {
      upsertMeta("name", "description", description);
      upsertMeta("property", "og:description", description);
      upsertMeta("name", "twitter:description", description);
    }

    upsertMeta("property", "og:title", fullTitle);
    upsertMeta("name", "twitter:title", fullTitle);

    if (path) {
      upsertCanonical(`${BASE_URL}${path}`);
      upsertMeta("property", "og:url", `${BASE_URL}${path}`);
    }
  }, [title, description, path]);
}