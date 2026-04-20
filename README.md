# Puzzle Invoice Maker

Sistema simples para criar, acompanhar e imprimir invoices para clientes do exterior.

Hoje o projeto cobre o fluxo principal de operacao:
- cadastro e edicao de clientes
- configuracao de dois perfis emissores
- criacao, edicao e exclusao de invoices
- atualizacao de status
- versao de impressao otimizada para PDF

## Stack

- Next.js 16
- React 19
- TypeScript
- Tailwind CSS 4
- Persistencia local em `data/store.json`

## Rodando localmente

Instale as dependencias e inicie o servidor:

```bash
npm install
npm run dev
```

Abra [http://localhost:3000](http://localhost:3000).

## Scripts

```bash
npm run dev
npm run build
npm run lint
```

## Estrutura importante

- `src/app/`: rotas e server actions
- `src/components/`: componentes compartilhados
- `src/lib/`: tipos, formatacao e persistencia
- `data/store.json`: base local do MVP
- `BACKLOG.md`: backlog priorizado do produto
- `.github/`: templates de issue e workflow de CI prontos para subir ao GitHub

## Backlog e organizacao

O backlog do produto fica versionado em [BACKLOG.md](./BACKLOG.md).

Quando o repositorio for conectado ao GitHub, a ideia e:
- transformar os itens priorizados em issues
- organizar o fluxo em um GitHub Project
- usar labels por prioridade, tipo e area
- deixar o workflow de CI rodando em push e pull request

As labels sugeridas estao documentadas em [docs/github-labels.md](./docs/github-labels.md).

## Proximos passos recomendados

1. Conectar este repositorio a um remoto no GitHub.
2. Subir a estrutura atual.
3. Criar labels com base em `docs/github-labels.md`.
4. Abrir as primeiras issues a partir do `BACKLOG.md`.
5. Ativar a automacao de CI em `.github/workflows/ci.yml`.

## Estado atual da arquitetura

O projeto ainda usa persistencia em arquivo JSON. Isso e intencional para manter o MVP simples, mas um proximo passo natural e migrar para banco de dados para ganhar:
- mais seguranca
- melhor escalabilidade
- historico mais confiavel
- menor risco de conflito de escrita

## Observacoes

- Este repositorio foi adaptado de um bootstrap inicial do Next.js e ja nao segue mais o escopo padrao de um projeto novo.
- Antes de fazer mudancas estruturais em Next.js, vale consultar a documentacao local em `node_modules/next/dist/docs/`, conforme a regra do workspace.
