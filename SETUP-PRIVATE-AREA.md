# Configuração da área privada e registos de acessos

Esta versão do site inclui suporte para registo de acessos e pedidos de contacto numa base de dados Cloudflare D1 e uma área privada em `/admin`.

## 1. Criar a base de dados D1

No Cloudflare:

1. Abrir **Workers & Pages → D1**.
2. Selecionar **Create database**.
3. Sugestão de nome: `lcon-digital-website`.
4. Como a empresa está na UE, pode ser escolhida a jurisdição **European Union (eu)**.
5. Criar a base de dados.

A D1 é a base de dados SQL nativa da Cloudflare e pode ser utilizada por Pages Functions através de uma binding.\n
## 2. Criar as tabelas

Abrir a base de dados e escolher **Console**. Copiar o conteúdo de `schema.sql` e executar.

Serão criadas as tabelas:

- `page_views` — acessos ao site;
- `contacts` — pedidos enviados através do formulário.

## 3. Ligar a D1 ao site

No projeto **LCON DIGITAL** em **Workers & Pages**:

**Settings → Bindings → Add → D1 database bindings**

Usar exatamente:

- **Variable name:** `DB`
- **D1 database:** `lcon-digital-website`

Depois guardar e fazer um novo deploy.

## 4. Configurar a área privada

Em:

**Settings → Variables and Secrets → Add**

Criar os seguintes secrets para o ambiente **Production**:

- `ADMIN_USER` — nome de utilizador escolhido por ti;
- `ADMIN_PASSWORD` — uma password forte escolhida por ti.

O `RESEND_API_KEY` existente deve continuar configurado para o formulário de contacto.

Os secrets devem ser criados como valores encriptados e não devem ser colocados no GitHub.

## 5. Aceder à área privada

Depois do deploy, abrir:

`https://lcon-digital.com/admin`

O browser solicitará o utilizador e a password configurados nos secrets.

A área mostra:

- visitas dos últimos 30 dias;
- visitantes únicos aproximados por IP;
- contactos recebidos;
- origem por país;
- acessos recentes com IP e localização aproximada;
- contactos com os dados submetidos e localização aproximada.

## 6. Retenção

A aplicação está configurada para manter os registos durante um máximo de **90 dias**. A limpeza é executada automaticamente pelas funções de manutenção e quando a área privada é aberta.

## 7. Localização por IP

A localização apresentada é aproximada. O site utiliza os dados disponibilizados pelo Cloudflare para o IP do visitante, podendo obter país, cidade e região quando disponíveis.

Se os campos de cidade/região não aparecerem, pode ser ativada no domínio a funcionalidade do Cloudflare que adiciona os headers de localização do visitante.

## 8. Privacidade

O site inclui uma página pública em `/privacy.html` com uma descrição do tratamento implementado.

Antes de colocar o sistema em produção, recomenda-se validar o texto da política de privacidade e a base legal aplicável à utilização dos dados com o responsável jurídico/privacidade da empresa.
