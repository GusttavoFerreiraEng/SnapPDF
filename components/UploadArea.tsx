"use client";

import { ChangeEvent } from "react";
import { motion } from "motion/react";
import { ImagePlus, Sparkles } from "lucide-react";

type Props = {
    onImageSelected: (files: File[]) => void;
};

export default function UploadArea({ onImageSelected }: Props) {
    function handleChange(event: ChangeEvent<HTMLInputElement>) {
        const files = Array.from(event.target.files || []);
        if (files.length > 0) {
            onImageSelected(files);
        }

        event.target.value = "";
    }

  return (
    <motion.section
      className="glass-panel upload-area"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45 }}
    >
      <div className="upload-icon">
        <ImagePlus size={34} strokeWidth={1.8} />
      </div>

      <div className="upload-copy">
        <div className="eyebrow">
          <Sparkles size={14} />
          CONVERSÃO INTELIGENTE
        </div>

        <h2>Suas fotos, um PDF.</h2>

        <p>
          Transforme imagens em documentos
          em poucos segundos.
        </p>
      </div>

      <label className="primary-button upload-button">
        <ImagePlus size={19} />
        Adicionar fotos

        <input
          type="file"
          accept="image/jpeg,image/png"
          multiple
          onChange={handleChange}
          className="visually-hidden"
        />
      </label>

      <span className="upload-footnote">
        JPG e PNG · Sem cadastro · Sem custos
      </span>
    </motion.section>
  );
}