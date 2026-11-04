import { Files, ShieldCheck } from "lucide-react";

export default function GlassHeader() {
  return (
    <header className="glass-header">
      <div className="brand">
        <div className="brand-icon">
          <Files size={23} strokeWidth={2.2} />
        </div>

        <div>
          <h1>Snap<span>PDF</span></h1>
          <p>Suas fotos. Um documento.</p>
        </div>
      </div>

      <div className="privacy-indicator">
        <ShieldCheck size={17} />
        <span>Privado e gratuito</span>
      </div>
    </header>
  );
}