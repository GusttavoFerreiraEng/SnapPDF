"use client";

import { useEffect } from "react";

export default function PWARegister() {
  useEffect(() => {
    if (!("serviceWorker" in navigator)) {
      console.warn(
        "Este navegador não suporta Service Workers."
      );
      return;
    }

    if (process.env.NODE_ENV !== "production") {
      console.log(
        "Service Worker desativado no desenvolvimento."
      );
      return;
    }

    navigator.serviceWorker
      .register("/sw.js", { scope: "/" })
      .then((registration) => {
        console.log(
          "SnapPDF Service Worker registrado:",
          registration.scope
        );
      })
      .catch((error) => {
        console.error(
          "Erro ao registrar Service Worker:",
          error
        );
      });
  }, []);

  return null;
}