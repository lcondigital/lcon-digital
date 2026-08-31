# LCON DIGITAL — Website

Website institucional da **LCON DIGITAL**, empresa especializada em consultoria SAP e transformação digital, fundada por Leandro Costa.

## Objetivo

O site apresenta a empresa, a experiência e áreas de especialização, a abordagem de trabalho e os canais de contacto. A experiência visual foi pensada para transmitir uma imagem profissional, tecnológica e próxima, com suporte para desktop, tablet e dispositivos móveis.

## Funcionalidades

- Design responsive para web e mobile.
- Conteúdo disponível em Português e Inglês através do seletor de idioma.
- Slogan mantido em inglês: **Bespoke Consulting. Tailored Digitally.**
- Apresentação da LCON DIGITAL e dos seus serviços.
- Secção de experiência e especialização em SAP, mantendo a terminologia técnica dos módulos.
- Secção dedicada ao fundador, Leandro Costa.
- Apresentação da abordagem de trabalho da LCON DIGITAL.
- Formulário de contacto com envio automático de mensagens por email.
- Links para LinkedIn e Instagram.
- Página de informação sobre privacidade.
- Identidade visual e ícones da LCON DIGITAL.
- Estrutura preparada para alojamento através do Cloudflare Pages.
- Área privada para consulta dos acessos e contactos recebidos, com dados de localização aproximada derivados do IP.

## Estrutura

- `index.html` — página principal.
- `assets/` — imagens, identidade visual, estilos e JavaScript.
- `functions/` — funcionalidades server-side do site.
- `schema.sql` — estrutura da base de dados utilizada pelas funcionalidades privadas.
- `privacy.html` — informação de privacidade do website.
- `site.webmanifest` — configuração para utilização como Web App.
- `_headers` e `_redirects` — configurações de alojamento.

## Idiomas

O site suporta Português de Portugal e Inglês. A alteração de idioma é feita diretamente no header, sem necessidade de recarregar a página. O slogan e a terminologia técnica SAP permanecem conforme definidos pela LCON DIGITAL.

## Configuração de funcionalidades privadas

As funcionalidades de registo e consulta privada requerem configuração de uma base de dados Cloudflare D1 e credenciais de acesso no ambiente Cloudflare. O procedimento encontra-se documentado em `SETUP-PRIVATE-AREA.md`.

## Contacto

As mensagens submetidas através do formulário são encaminhadas para o endereço de contacto da LCON DIGITAL. O endereço de email é apresentado no site apenas através da designação **E-mail**.

## Área privada e registos de utilização

A aplicação pode registar acessos e pedidos de contacto numa base de dados privada. Os registos incluem informação técnica necessária para gestão, segurança e análise de utilização, podendo incluir endereço IP e localização geográfica aproximada. Os dados são mantidos por um período máximo de 90 dias de acordo com a configuração da aplicação.

A área privada destina-se exclusivamente à gestão interna da LCON DIGITAL.

## Tecnologias

O projeto utiliza HTML, CSS e JavaScript no frontend e Cloudflare Pages Functions no backend, com integração opcional de serviços de email e base de dados da plataforma Cloudflare.
