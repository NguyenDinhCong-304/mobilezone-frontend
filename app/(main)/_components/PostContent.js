"use client";

import DOMPurify from "dompurify";

export default function PostContent({ html }) {
  return (
    <div
      className="content"
      dangerouslySetInnerHTML={{
        __html: DOMPurify.sanitize(html),
      }}
    />
  );
}
