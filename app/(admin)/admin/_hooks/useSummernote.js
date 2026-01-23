"use client";

import { useEffect, useRef } from "react";

export default function useSummernote({
  height = 200,
  placeholder = "",
  value = "",
  onChange,
}) {
  const editorRef = useRef(null);
  const initialized = useRef(false);

  useEffect(() => {
    if (!editorRef.current || initialized.current) return;
    if (!window.$ || !window.$.fn?.summernote) return;

    const $el = window.$(editorRef.current);

    $el.summernote({
      height,
      placeholder,
      callbacks: {
        onChange(contents) {
          onChange && onChange(contents);
        },

        onImageUpload(files) {
          for (let file of files) {
            uploadImage(file);
          }
        },
      },
    });

    function uploadImage(file) {
      const data = new FormData();
      data.append("file", file);

      const token = localStorage.getItem("admin_token");

      fetch("http://localhost:8000/api/admin/upload/summernote", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: data,
      })
        .then((res) => res.json())
        .then((res) => {
          if (res.url) {
            $el.summernote("insertImage", res.url);
          }
        })
        .catch(() => alert("Upload ảnh thất bại"));
    }

    initialized.current = true;

    return () => {
      if ($el.next(".note-editor").length) {
        $el.summernote("destroy");
        initialized.current = false;
      }
    };
  }, [height, placeholder, onChange]);

  useEffect(() => {
    if (!editorRef.current || !initialized.current) return;

    const $el = window.$(editorRef.current);
    if (value && $el.summernote("code") !== value) {
      $el.summernote("code", value);
    }
  }, [value]);

  return editorRef;
}
