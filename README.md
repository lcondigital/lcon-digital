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
- Hospedagem em CDN estático com deploy automático a partir deste repositório

## Estrutura do projeto

```
.
├── index.html          # Página única do site
├── robots.txt           # Indicações para motores de busca
├── sitemap.xml           # Mapa do site para indexação
├── _headers               # Cabeçalhos HTTP de segurança
├── _redirects               # Regras de redirecionamento
├── assets/
│   ├── styles.css
│   ├── main.js
│   ├── favicon.svg
│   └── leandro-costa.png
└── README.md
```

## Segurança

Este projeto aplica um conjunto de boas práticas de segurança ao nível do front-end e da entrega de conteúdo:

- Cabeçalhos HTTP restritivos (`_headers`): CSP, HSTS, X-Frame-Options, X-Content-Type-Options, Referrer-Policy e Permissions-Policy.
- CSS e JavaScript em ficheiros externos (`assets/styles.css`, `assets/main.js`), sem código inline, para que a CSP não precise de `unsafe-inline`.
- Todos os links externos usam `rel="noopener noreferrer"`.
- O formulário de contacto inclui um campo *honeypot* invisível para reduzir spam automatizado.
- Sem segredos, chaves de API, tokens ou dados de configuração de infraestrutura neste repositório — a gestão de domínio, DNS e email é feita fora do código-fonte, em painéis próprios com acesso restrito.

Não abras *issues* públicas com detalhes de configuração de infraestrutura (DNS, hosting, email). Reporta esse tipo de assunto por um canal privado.

## Formulário de contacto

O formulário na secção `#contact` está ligado a um `mailto:` construído via JavaScript (não usa `action="mailto:..."` no `<form>`, para evitar avisos de "mixed content" nos browsers) e inclui um campo *honeypot* para reduzir spam. Uma evolução possível é ligar um serviço de formulário dedicado (ex: Formspree, Web3Forms, ou uma função serverless) para não depender do cliente de email do visitante.

## Desenvolvimento local

Não há dependências nem build. Basta abrir o `index.html` num browser ou servir a pasta com um servidor estático simples:

```bash
npx serve .
```

## Deploy

O deploy é automático a cada push para a branch `main`. Pull requests geram automaticamente um deploy preview.

## Licença

© 2026 LCON DIGITAL. Todos os direitos reservados.
