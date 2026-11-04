import { PDFDocument } from "pdf-lib";

export type PDFSettings = {
  filename: string;
  quality: "high" | "balanced" | "small";
  paper: "a4" | "original";
  margin: "none" | "small" | "large";
};

export const defaultPDFSettings: PDFSettings = {
  filename: "SnapPDF-documento",
  quality: "balanced",
  paper: "a4",
  margin: "small",
};

const QUALITY = {
  high: { maxSize: 3200, jpeg: 0.92 },
  balanced: { maxSize: 2000, jpeg: 0.78 },
  small: { maxSize: 1200, jpeg: 0.58 },
};

function compressImage(
  file: File,
  quality: PDFSettings["quality"]
): Promise<ArrayBuffer> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    const url = URL.createObjectURL(file);

    img.onload = () => {
      try {
        const config = QUALITY[quality];

        const ratio = Math.min(
          1,
          config.maxSize / Math.max(img.width, img.height)
        );

        const width = Math.max(1, Math.round(img.width * ratio));
        const height = Math.max(1, Math.round(img.height * ratio));

        const canvas = document.createElement("canvas");
        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext("2d");

        if (!ctx) {
          throw new Error("Não foi possível processar a imagem.");
        }

        // Fundo branco para imagens PNG transparentes.
        ctx.fillStyle = "#FFFFFF";
        ctx.fillRect(0, 0, width, height);
        ctx.drawImage(img, 0, 0, width, height);

        canvas.toBlob(
          async (blob) => {
            URL.revokeObjectURL(url);

            if (!blob) {
              reject(new Error("Erro na compressão."));
              return;
            }

            try {
              resolve(await blob.arrayBuffer());
            } catch (error) {
              reject(error);
            }
          },
          "image/jpeg",
          config.jpeg
        );
      } catch (error) {
        URL.revokeObjectURL(url);
        reject(error);
      }
    };

    img.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error("Imagem inválida: " + file.name));
    };

    img.src = url;
  });
}

export async function generatePDF(
  images: File[],
  settings: PDFSettings = defaultPDFSettings
): Promise<Blob> {
  if (images.length === 0) {
    throw new Error("Selecione pelo menos uma imagem.");
  }

  const pdf = await PDFDocument.create();

  const margins = {
    none: 0,
    small: 20,
    large: 48,
  };

  const margin = margins[settings.margin];

  for (const file of images) {
    if (
      file.type !== "image/jpeg" &&
      file.type !== "image/png"
    ) {
      throw new Error("Formato não suportado: " + file.name);
    }

    const compressedBytes = await compressImage(
      file,
      settings.quality
    );

    const image = await pdf.embedJpg(compressedBytes);

    let pageWidth: number;
    let pageHeight: number;

    if (settings.paper === "a4") {
      // A4 em pontos PDF.
      const landscape = image.width > image.height;

      pageWidth = landscape ? 841.89 : 595.28;
      pageHeight = landscape ? 595.28 : 841.89;
    } else {
      // Limita a página para dimensões práticas.
      const scale = Math.min(
        1,
        1440 / Math.max(image.width, image.height)
      );

      pageWidth = image.width * scale + margin * 2;
      pageHeight = image.height * scale + margin * 2;
    }

    const page = pdf.addPage([pageWidth, pageHeight]);

    const scaled = image.scaleToFit(
      Math.max(1, pageWidth - margin * 2),
      Math.max(1, pageHeight - margin * 2)
    );

    page.drawImage(image, {
      x: (pageWidth - scaled.width) / 2,
      y: (pageHeight - scaled.height) / 2,
      width: scaled.width,
      height: scaled.height,
    });
  }

  const pdfBytes = await pdf.save();

  return new Blob([new Uint8Array(pdfBytes)], {
    type: "application/pdf",
  });
}