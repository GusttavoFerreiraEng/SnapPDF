import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",

  // Desativa recursos incompatíveis com exportação estática
  cacheComponents: false,
  partialPrefetching: false,

  // Não exige otimização de imagens por servidor
  images: {
    unoptimized: true,
  },
};

export default nextConfig;