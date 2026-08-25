# LCON DIGITAL

Website institucional da **LCON DIGITAL** — consultoria SAP e transformação digital, fundada por Leandro Costa.

🔗 [lcon-digital.com](https://lcon-digital.com)

## Sobre

LCON DIGITAL presta serviços especializados de consultoria SAP e transformação digital, combinando conhecimento funcional, compreensão técnica e uma abordagem orientada ao negócio.

**Áreas de atuação:**
- SAP Consulting (S/4HANA)
- Financial Transformation
- Business Process Optimization
- Technology Advisory

## Stack técnica

- HTML5 + CSS3 (estilos inline no `<head>`, sem framework)
- JavaScript vanilla (menu mobile, animações de scroll com `IntersectionObserver`, envio do formulário de contacto)
- Sem build step — site estático servido diretamente

## Infraestrutura

| Componente | Serviço |
|---|---|
| Hosting | [Cloudflare Pages](https://pages.cloudflare.com/) |
| Domínio | `lcon-digital.com`, gerido no Cloudflare (DNS) e adquirido via Google Workspace |
| Deploy | Automático a partir deste repositório (push para `main` → deploy) |
| Email profissional | Google Workspace (`geral@lcon-digital.com`), com SPF, DKIM e DMARC configurados |
| SSL | Certificado automático via Cloudflare Pages (custom domain) |

### DNS (Cloudflare)

- `lcon-digital.com` → CNAME → `lcon-digital.pages.dev` (proxied)
- `www.lcon-digital.com` → CNAME → `lcon-digital.pages.dev` (proxied)
- Registos `MX`, `SPF`, `DKIM` e `DMARC` configurados para o Google Workspace

## Estrutura do projeto

```
.
├── index.html          # Página única do site
├── assets/
│   └── leandro-costa.png
└── README.md
```

## Formulário de contacto

O formulário na secção `#contact` está atualmente ligado a um `mailto:` construído via JavaScript (não usa `action="mailto:..."` no `<form>`, para evitar o aviso de "mixed content" dos browsers). Esta é uma solução **temporária** — o objetivo é substituir por um serviço de formulário dedicado (ex: Formspree, Web3Forms, ou uma Cloudflare Pages Function) antes de produção definitiva.

## Desenvolvimento local

Não há dependências nem build. Basta abrir o `index.html` num browser ou servir a pasta com um servidor estático simples:

```bash
npx serve .
```

## Deploy

O deploy é automático via Cloudflare Pages a cada push para a branch `main`. Pull requests geram automaticamente um deploy preview.

## Licença

© 2026 LCON DIGITAL. Todos os direitos reservados.
