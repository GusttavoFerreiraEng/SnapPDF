"use client";

import { useEffect, useRef, useState } from "react";
import { ShieldCheck, Trash2 } from "lucide-react";

import GlassHeader from "@/components/GlassHeader";
import UploadArea from "@/components/UploadArea";
import SortableImageGrid, {
  type Photo,
} from "@/components/SortableImageGrid";
import PdfSettings from "@/components/PdfSettings";

import {
  generatePDF,
  defaultPDFSettings,
  type PDFSettings,
} from "@/lib/pdf";

export default function Home() {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");

  const [screen, setScreen] = useState<
    "home" | "settings"
  >("home");

  const [settings, setSettings] = useState<PDFSettings>(
    { ...defaultPDFSettings }
  );

  const photosRef = useRef<Photo[]>([]);

  // Mantém a referência atualizada para limpeza final.
  useEffect(() => {
    photosRef.current = photos;
  }, [photos]);

  // Libera as URLs temporárias ao desmontar.
  useEffect(() => {
    return () => {
      photosRef.current.forEach((photo) => {
        URL.revokeObjectURL(photo.preview);
      });
    };
  }, []);

  // Adiciona imagens JPG e PNG.
  function addImages(files: File[]) {
    const valid = files.filter(
      (file) =>
        file.type === "image/jpeg" ||
        file.type === "image/png"
    );

    setError("");
    setNotice("");

    if (valid.length !== files.length) {
      setError(
        "Algumas imagens foram ignoradas. Use JPG ou PNG."
      );
    }

    const newPhotos: Photo[] = valid.map((file) => ({
      id: crypto.randomUUID(),
      file,
      preview: URL.createObjectURL(file),
    }));

    setPhotos((previous) => [
      ...previous,
      ...newPhotos,
    ]);
  }

  // Remove uma imagem.
  function removePhoto(id: string) {
    const selected = photos.find(
      (photo) => photo.id === id
    );

    if (selected) {
      URL.revokeObjectURL(selected.preview);
    }

    setPhotos((previous) =>
      previous.filter((photo) => photo.id !== id)
    );
  }

  // Limpa todas as imagens.
  function clearPhotos() {
    photos.forEach((photo) => {
      URL.revokeObjectURL(photo.preview);
    });

    setPhotos([]);
    setScreen("home");
    setError("");
    setNotice("");
  }

  // Converte e baixa ou compartilha o PDF.
  async function createPDF(share: boolean) {
    if (photos.length === 0 || loading) return;

    setLoading(true);
    setError("");
    setNotice("");

    try {
      const blob = await generatePDF(
        photos.map((photo) => photo.file),
        settings
      );

      // Remove caracteres inválidos do nome.
      const safeName =
        settings.filename
          .replace(/\.pdf$/i, "")
          .replace(/[<>:"/\\|?*\x00-\x1f]/g, "")
          .trim() || "SnapPDF-documento";

      const file = new File(
        [blob],
        safeName + ".pdf",
        { type: "application/pdf" }
      );

      // Compartilhamento nativo quando disponível.
      if (
        share &&
        navigator.share &&
        navigator.canShare?.({ files: [file] })
      ) {
        await navigator.share({
          files: [file],
          title: "Documento SnapPDF",
        });

        setNotice("PDF compartilhado com sucesso!");
        return;
      }

      // Download como alternativa.
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");

      link.href = url;
      link.download = file.name;

      document.body.appendChild(link);
      link.click();
      link.remove();

      setTimeout(() => {
        URL.revokeObjectURL(url);
      }, 60000);

      setNotice(
        share
          ? "Compartilhamento indisponível. PDF baixado."
          : "PDF gerado e enviado para download!"
      );
    } catch (err) {
      // Usuário cancelou o menu de compartilhamento.
      if (
        err instanceof DOMException &&
        err.name === "AbortError"
      ) {
        return;
      }

      setError(
        err instanceof Error
          ? err.message
          : "Não foi possível gerar o PDF."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="app-shell">
      {/* Efeitos visuais do fundo */}
      <div className="ambient-glow ambient-one" />
      <div className="ambient-glow ambient-two" />

      <div className="app-container">
        <GlassHeader />

        <div className="app-content">
          {screen === "settings" ? (
            <PdfSettings
              settings={settings}
              onChange={setSettings}
              onBack={() => {
                setScreen("home");
                setError("");
                setNotice("");
              }}
              onDownload={() => createPDF(false)}
              onShare={() => createPDF(true)}
              loading={loading}
              count={photos.length}
            />
          ) : (
            <>
              <UploadArea
                onImageSelected={addImages}
              />

              {photos.length > 0 && (
                <>
                  <div className="clear-row">
                    <button
                      type="button"
                      onClick={clearPhotos}
                      className="clear-button"
                      disabled={loading}
                    >
                      <Trash2 size={15} />
                      Limpar tudo
                    </button>
                  </div>

                  <SortableImageGrid
                    photos={photos}
                    onChange={setPhotos}
                    onRemove={removePhoto}
                  />

                  <button
                    type="button"
                    className="primary-button settings-submit"
                    onClick={() => {
                      setScreen("settings");
                      setError("");
                      setNotice("");
                    }}
                  >
                    Continuar para configurações
                  </button>
                </>
              )}
            </>
          )}

          {/* Mensagens visíveis nas duas telas */}
          {error && (
            <div
              className="message error-message"
              role="alert"
            >
              {error}
            </div>
          )}

          {notice && (
            <div
              className="message info-message"
              role="status"
            >
              {notice}
            </div>
          )}

          <div className="privacy-note">
            <ShieldCheck size={18} />
            <span>
              Suas fotos são processadas no dispositivo.
              Nenhuma imagem é enviada para nossos servidores.
            </span>
          </div>
        </div>
      </div>
    </main>
  );
}