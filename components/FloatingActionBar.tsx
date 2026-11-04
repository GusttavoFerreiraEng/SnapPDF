"use client";

import { motion, AnimatePresence } from "motion/react";
import {
  FileCheck2,
  Share2,
  LoaderCircle,
} from "lucide-react";

type Props = {
  visible: boolean;
  loading: boolean;
  onDownload: () => void;
  onShare: () => void;
};

export default function FloatingActionBar({
  visible,
  loading,
  onDownload,
  onShare,
}: Props) {
  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="floating-bar-wrapper"
          style={{ x: "-50%" }}
          initial={{ opacity: 0, y: 90 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 90 }}
          transition={{
            type: "spring",
            stiffness: 290,
            damping: 28,
          }}
        >
          <div className="floating-bar">
            <button
              type="button"
              className="primary-button generate-button"
              onClick={onDownload}
              disabled={loading}
            >
              {loading ? (
                <LoaderCircle
                  size={20}
                  className="spin"
                />
              ) : (
                <FileCheck2 size={20} />
              )}

              {loading ? "Convertendo..." : "Gerar PDF"}
            </button>

            <button
              type="button"
              className="share-button"
              onClick={onShare}
              disabled={loading}
              aria-label="Compartilhar PDF"
              title="Compartilhar PDF"
            >
              <Share2 size={21} />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}