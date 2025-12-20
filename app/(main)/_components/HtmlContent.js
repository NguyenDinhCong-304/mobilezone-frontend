"use client";

import { useEffect, useState } from "react";

export default function HtmlContent({ html, className = "" }) {
  const [safeHtml, setSafeHtml] = useState("");

  useEffect(() => {
    if (!html) return;

    import("dompurify").then((DOMPurify) => {
      setSafeHtml(DOMPurify.default.sanitize(html));
    });
  }, [html]);

  if (!safeHtml) return null;

  return (
    <div
      className={className}
      dangerouslySetInnerHTML={{ __html: safeHtml }}
    />
  );
}

