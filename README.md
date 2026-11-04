<<<<<<< HEAD
This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
=======
# SnapPDF

### Transforme suas fotos em PDF de forma simples, gratuita e privada.

O **SnapPDF** é uma aplicação web progressiva (PWA) desenvolvida para transformar múltiplas imagens em um único documento PDF, diretamente no navegador.

O projeto foi criado com foco em **facilidade de uso, privacidade, desempenho e acessibilidade**, oferecendo uma experiência responsiva tanto em computadores quanto em dispositivos móveis.

🌐 **[Acessar SnapPDF](https://snappdf-2ho.pages.dev/)**

## Funcionalidades

- **Conversão de imagens em PDF:** selecione várias fotos e gere um único documento.
- **Organização das páginas:** reordene as imagens arrastando-as antes de converter.
- **Visualização prévia:** confira as fotos selecionadas e remova as indesejadas.
- **Configurações personalizadas:** escolha nome do arquivo, qualidade, formato da página e margens.
- **Download e compartilhamento:** salve o PDF ou compartilhe diretamente pelo dispositivo, quando compatível.
- **Funcionamento offline:** após o carregamento inicial e armazenamento dos recursos necessários, o aplicativo pode funcionar sem conexão.
- **Instalação como aplicativo (PWA):** adicione o SnapPDF à tela inicial do celular.
- **Interface responsiva:** experiência adaptada para smartphones, tablets e computadores.
- **Processamento local:** as imagens são processadas no dispositivo, sem necessidade de enviá-las a um servidor para conversão.

## Tecnologias utilizadas

| Tecnologia | Finalidade |
|---|---|
| Next.js 16 | Framework da aplicação |
| React | Interface e componentes |
| TypeScript | Tipagem e desenvolvimento |
| Tailwind CSS | Estilização |
| pdf-lib | Geração de documentos PDF |
| dnd-kit | Organização das imagens por arrastar e soltar |
| Lucide React | Ícones |
| Service Worker | Armazenamento de recursos para uso offline |
| Cloudflare Pages | Hospedagem da aplicação |

## Como executar localmente

**Pré-requisitos:** Node.js e npm instalados.

**1. Clone o repositório**

`git clone https://github.com/SEU-USUARIO/snappdf.git`

**2. Entre na pasta**

`cd snappdf`

**3. Instale as dependências**

`npm install`

**4. Inicie o servidor de desenvolvimento**

`npm run dev`

Acesse `http://localhost:3000` no navegador.

## Gerar versão de produção

Execute:

`npm run build`

O projeto está configurado para exportação estática, gerando os arquivos de publicação na pasta `out`.

Para testar a versão gerada localmente:

`npx serve out -l 3000`

## Como utilizar

1. Abra o SnapPDF no navegador.
2. Adicione as fotos desejadas.
3. Organize a sequência das páginas.
4. Acesse as configurações do documento.
5. Escolha o nome, a qualidade, o formato e as margens.
6. Gere o PDF e faça o download ou compartilhe o documento.

## Privacidade

O SnapPDF foi desenvolvido para realizar a conversão de imagens localmente no navegador.

Os documentos selecionados não precisam ser enviados a servidores para que o PDF seja gerado.

**Observação:** o aplicativo é hospedado na web, portanto o acesso inicial e a distribuição dos arquivos da aplicação dependem da infraestrutura de hospedagem. O processamento dos documentos é realizado no dispositivo.

## Limitações atuais

- A conversão é voltada principalmente para imagens.
- O desempenho e o tamanho máximo dos documentos dependem da memória e da capacidade do dispositivo.
- Recursos de compartilhamento podem variar conforme navegador e sistema operacional.
- O funcionamento offline depende dos recursos previamente armazenados no dispositivo.

## Próximas melhorias

- Scanner de documentos com ajuste de perspectiva.
- Compressão de documentos PDF existentes.
- Melhorias de desempenho para documentos grandes.
- Aprimoramento da atualização e do armazenamento offline.

## Desenvolvedor

**Gustavo Ferreira**

Desenvolvedor de software, com interesse em aplicações web, interfaces responsivas e soluções digitais acessíveis.

## Status

**Versão inicial publicada e funcional.**

[Experimentar o SnapPDF](https://snappdf-2ho.pages.dev/)

---

Desenvolvido com dedicação para tornar a conversão de documentos mais simples e acessível.
>>>>>>> fda02415fb52540dc9a36d72da6d6c57cbbe2553
