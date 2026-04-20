# Backlog do Produto

Este backlog foi organizado para ajudar a transformar o MVP atual em uma ferramenta confiavel de uso mensal.

## P0 - Proximo ciclo

### 1. Lista completa de invoices com filtros

Objetivo:
Permitir localizar invoices rapidamente por numero, cliente, status, periodo e valor.

Escopo inicial:
- criar uma pagina "Todas as invoices"
- incluir busca por numero e cliente
- incluir filtros por status e periodo
- incluir ordenacao por data e valor

Valor:
Hoje o dashboard mostra apenas as ultimas invoices, o que limita bastante a operacao.

### 2. Validacao robusta dos formularios

Objetivo:
Evitar erros silenciosos e dados inconsistentes.

Escopo inicial:
- validar datas
- impedir invoice sem itens validos
- validar moeda
- validar valores numericos negativos ou zero quando nao fizer sentido
- melhorar mensagens de erro para o usuario

Valor:
Reduz retrabalho e aumenta confianca no uso real.

### 3. Duplicar invoice

Objetivo:
Permitir reaproveitar invoices recorrentes.

Escopo inicial:
- botao "Duplicar invoice" na tela de detalhe
- copiar itens, cliente, emissor, moeda e notas
- gerar novo numero automaticamente

Valor:
Economia direta de tempo para invoices mensais.

### 4. Historico de status

Objetivo:
Registrar a evolucao de cada invoice ao longo do tempo.

Escopo inicial:
- salvar mudancas de status com data
- exibir linha do tempo basica
- destacar quando foi marcada como paga

Valor:
Melhora o acompanhamento financeiro e reduz incerteza.

### 5. Remover e reordenar itens da invoice

Objetivo:
Dar controle real sobre o breakdown.

Escopo inicial:
- remover item no formulario
- mover item para cima e para baixo
- atualizar resumo em tempo real

Valor:
Fluxo de edicao mais pratico e menos frustrante.

## P1 - Alto valor

### 6. Templates por cliente

Objetivo:
Salvar configuracoes recorrentes por cliente.

Escopo inicial:
- titulo padrao
- moeda padrao
- payment details padrao
- notas padrao

### 7. Numeracao configuravel

Objetivo:
Permitir regras mais profissionais para numeracao.

Escopo inicial:
- prefixo por emissor
- reinicio por ano
- preview do proximo numero

### 8. Dashboard financeiro melhor

Objetivo:
Transformar a home em uma visao operacional.

Escopo inicial:
- receita por mes
- total em aberto
- total pago por periodo
- top clientes
- invoices vencidas

### 9. Campos financeiros extras

Objetivo:
Suportar invoices mais completas.

Escopo inicial:
- subtotal explicito
- desconto
- imposto ou taxa
- service period

### 10. Feedback visual e confirmacoes

Objetivo:
Melhorar a confianca de uso.

Escopo inicial:
- toasts de sucesso e erro
- estados de loading
- confirmacao antes de excluir
- mensagens claras quando algo falhar

## P2 - Evolucao do produto

### 11. Alertas de vencimento

Escopo inicial:
- destacar invoices proximas do vencimento
- sugerir status `overdue`
- criar area "Acoes pendentes"

### 12. PDF gerado pelo sistema

Escopo inicial:
- gerar arquivo PDF consistente no servidor
- manter layout padronizado
- reduzir dependencia da janela de impressao do navegador

### 13. Envio por email

Escopo inicial:
- enviar invoice para o cliente
- anexar PDF
- registrar data de envio

### 14. Traducoes e consistencia de idioma

Escopo inicial:
- padronizar PT-BR
- decidir o que fica em ingles na invoice
- evitar mistura de labels

### 15. Preview durante edicao

Escopo inicial:
- mostrar preview lateral ou em modal
- refletir mudancas sem sair do formulario

## P3 - Estrutura e escala

### 16. Migracao de JSON para banco de dados

Objetivo:
Sair de `data/store.json` e ir para uma persistencia mais robusta.

Sugestao:
- SQLite + Prisma no primeiro momento

### 17. Autenticacao

Escopo inicial:
- acesso protegido
- isolamento por usuario ou workspace

### 18. Testes automatizados

Escopo inicial:
- testes da camada de store
- testes das server actions
- smoke tests dos fluxos principais

### 19. Auditoria e backup

Escopo inicial:
- exportacao de dados
- importacao
- historico de alteracoes relevantes

### 20. Estruturacao da camada de dominio

Escopo inicial:
- separar validacao
- separar regras de negocio
- reduzir acoplamento entre UI e persistencia

## Sugestao de primeiras issues no GitHub

Quando o repositorio for para o GitHub, eu abriria nesta ordem:

1. `feat: criar pagina de listagem completa de invoices`
2. `feat: adicionar filtros e busca de invoices`
3. `feat: validar formularios com regras de negocio`
4. `feat: permitir duplicar invoice`
5. `feat: adicionar historico de status`
6. `feat: permitir remover e reordenar itens da invoice`
7. `feat: melhorar feedback visual e confirmacoes`
8. `feat: criar templates por cliente`
9. `feat: expandir dashboard financeiro`
10. `tech: preparar migracao da persistencia local para banco`
