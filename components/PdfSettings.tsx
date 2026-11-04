"use client";

import { ArrowLeft, FileText, Settings2 } from "lucide-react";
import {
  type PDFSettings,
} from "../lib/pdf";

type Props = {
  settings: PDFSettings;
  onChange: (settings: PDFSettings) => void;
  onBack: () => void;
  onDownload: () => void;
  onShare: () => void;
  loading: boolean;
  count: number;
};

export default function PdfSettings({
  settings,
  onChange,
  onBack,
  onDownload,
  onShare,
  loading,
  count,
}: Props) {
  function update<K extends keyof PDFSettings>(
    key: K,
    value: PDFSettings[K]
  ) {
    onChange({ ...settings, [key]: value });
  }

  return (
    <section className="settings-screen">
      <div className="settings-top">
        <button
          type="button"
          onClick={onBack}
          className="settings-back"
        >
          <ArrowLeft size={19} />
          Voltar
        </button>

        <span className="settings-step">Etapa 2 de 2</span>
      </div>

      <div className="settings-heading">
        <div className="upload-icon">
          <Settings2 size={30} />
        </div>
        <h2>Seu PDF, do seu jeito.</h2>
        <p>
          Personalize o documento antes de compartilhar.
        </p>
      </div>

      <div className="glass-panel settings-panel">
        <div className="settings-field">
          <label htmlFor="pdf-name">
            Nome do documento
          </label>
          <input
            id="pdf-name"
            className="settings-input"
            maxLength={100}
            value={settings.filename}
            onChange={(e) =>
              update("filename", e.target.value)
            }
            placeholder="Meu documento"
          />
        </div>

        <div className="settings-field">
          <label htmlFor="pdf-quality">
            Qualidade das imagens
          </label>
          <select
            id="pdf-quality"
            className="settings-input"
            value={settings.quality}
            onChange={(e) =>
              update(
                "quality",
                e.target.value as PDFSettings["quality"]
              )
            }
          >
            <option value="high">Alta qualidade</option>
            <option value="balanced">Equilibrada</option>
            <option value="small">Arquivo compacto</option>
          </select>
          <small>
            A qualidade influencia o tamanho final do PDF.
          </small>
        </div>

        <div className="settings-field">
          <label htmlFor="pdf-paper">
            Tamanho da página
          </label>
          <select
            id="pdf-paper"
            className="settings-input"
            value={settings.paper}
            onChange={(e) =>
              update(
                "paper",
                e.target.value as PDFSettings["paper"]
              )
            }
          >
            <option value="a4">A4</option>
            <option value="original">
              Proporção original
            </option>
          </select>
        </div>

        <div className="settings-field">
          <label htmlFor="pdf-margin">Margens</label>
          <select
            id="pdf-margin"
            className="settings-input"
            value={settings.margin}
            onChange={(e) =>
              update(
                "margin",
                e.target.value as PDFSettings["margin"]
              )
            }
          >
            <option value="none">Sem margens</option>
            <option value="small">Pequenas</option>
            <option value="large">Grandes</option>
          </select>
        </div>

        <div className="settings-summary">
          <FileText size={20} />
          <span>
            {count} {count === 1 ? "imagem" : "imagens"} no PDF
          </span>
        </div>

        <button
          type="button"
          className="primary-button settings-submit"
          onClick={onDownload}
          disabled={loading}
        >
          {loading ? "Convertendo..." : "Gerar meu PDF"}
        </button>

        <button
          type="button"
          className="settings-share"
          onClick={onShare}
          disabled={loading}
        >
          Compartilhar diretamente
        </button>
      </div>
    </section>
  );
}