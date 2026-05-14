# 🏠 Calculadora de Financiamento Imobiliário

[![CI](https://github.com/seuusuario/financiamento-calculadora/actions/workflows/ci.yml/badge.svg)](https://github.com/seuusuario/financiamento-calculadora/actions/workflows/ci.yml)
[![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)](https://github.com/seuusuario/financiamento-calculadora/releases/tag/v1.0.0)
[![License](https://img.shields.io/badge/license-MIT-green.svg)](LICENSE)

## 🌐 Acesso Online

A aplicação está disponível publicamente em:

🔗 **[https://beatriz-dezotti.github.io/financiamento_calculadora/](https://beatriz-dezotti.github.io/financiamento_calculadora/)**

A Taxa Selic é consultada em tempo real através da API oficial do Banco Central do Brasil.

---

## 📌 Índice

- [Sobre o Projeto](#sobre-o-projeto)
- [Problema Real](#problema-real)
- [Proposta da Solução](#proposta-da-solução)
- [Público-alvo](#público-alvo)
- [Funcionalidades](#funcionalidades)
- [Tecnologias Utilizadas](#tecnologias-utilizadas)
- [Estrutura do Projeto](#estrutura-do-projeto)
- [Instalação](#instalação)
- [Execução](#execução)
- [Testes](#testes)
- [Linting](#linting)
- [Versionamento](#versionamento)
- [Autor](#autor)
- [Link do Repositório](#link-do-repositório)

---

## Sobre o Projeto

A calculadora de financiamento imobiliário é uma aplicação web que calcula financiamentos imobiliários nos sistemas **SAC** (Sistema de Amortização Constante) e **Price** (Tabela Price). A ferramenta permite visualizar, de forma clara e transparente, o valor das parcelas, a amortização real da dívida, os juros pagos e o impacto no orçamento familiar.

![Tela Principal](screenshot.png)

---

## Problema Real

### A falta de transparência nos financiamentos imobiliários

Milhões de brasileiros sonham com a casa própria, mas poucos entendem como funciona um financiamento. As principais dores identificadas são:

| Problema | Impacto |
|----------|---------|
| **Falta de clareza sobre juros** | O comprador não sabe quanto do valor pago realmente reduz a dívida e quanto é "jogado fora" em juros. |
| **Comprometimento excessivo da renda** | Muitas pessoas assumem parcelas que comprometem mais de 30% da renda familiar, gerando endividamento. |
| **Dificuldade em comparar sistemas** | A maioria não sabe a diferença entre SAC e Price, nem qual é mais vantajoso para seu perfil. |
| **Ausência de planejamento** | Sem uma visualização clara do futuro, o comprador pode tomar decisões financeiras ruins. |

### Dados relevantes

- 📊 **70%** dos financiamentos imobiliários no Brasil são feitos sem simulação prévia adequada (Fonte: ABECIP)
- 💰 Em um financiamento de **R$ 300.000** em 30 anos, os juros podem ultrapassar **R$ 350.000** - mais que o valor do imóvel
- ⚠️ **40%** das famílias brasileiras estão endividadas acima do recomendado (30% da renda)

---

## Proposta da Solução

A **Calculadora** resolve essas dores oferecendo:

✅ **Transparência total** - Mostra, parcela a parcela, quanto é amortização e quanto são juros.

✅ **Planejamento familiar** - Calcula o percentual da renda comprometido e gera alertas coloridos.

✅ **Comparação entre sistemas** - Permite alternar entre SAC e Price no mesmo cenário.

✅ **Visualização clara** - Interface amigável com cards informativos e tabela detalhada.

✅ **Zero custo** - Aplicação 100% gratuita, rodando no navegador.

---

## Público-alvo

| Grupo | Como se beneficia |
|-------|-------------------|
| **Compradores de primeira viagem** | Entendem o impacto real do financiamento antes de assinar o contrato. |
| **Famílias de classe média** | Planejam o orçamento familiar com base em dados reais. |
| **Corretores de imóveis** | Oferecem simulações transparentes para seus clientes. |
| **Estudantes de finanças** | Aprendem na prática como funcionam os sistemas SAC e Price. |
| **Educadores financeiros** | Utilizam a ferramenta em aulas e workshops. |

---

## Funcionalidades

### ✅ Funcionalidades Implementadas (v1.0.0)

| # | Funcionalidade | Descrição |
|---|----------------|-----------|
| 1 | **Cálculo SAC** | Calcula parcela decrescente com amortização constante. |
| 2 | **Cálculo Price** | Calcula parcela fixa durante todo o financiamento. |
| 3 | **Amortização detalhada** | Mostra, parcela a parcela, o valor amortizado e os juros. |
| 4 | **Percentual da renda** | Calcula quanto da renda familiar será comprometido. |
| 5 | **Alertas coloridos** | 🔴 Vermelho (>40%), 🟡 Amarelo (30-40%), 🟢 Verde (≤30%). |
| 6 | **Tabela de parcelas** | Exibe as primeiras 12 parcelas com saldo devedor. |
| 7 | **Totais do financiamento** | Mostra total pago e total de juros. |
| 8 | **Cards informativos** | Dados resumidos em destaque na página. |
| 9 | **Design responsivo** | Funciona em computadores, tablets e celulares. |
| 10 | **Testes automatizados** | Suite de testes para validar os cálculos. |


---

## Tecnologias Utilizadas

| Tecnologia | Versão | Finalidade |
|------------|--------|------------|
| **HTML5** | - | Estrutura da página |
| **CSS3** | - | Estilização e layout responsivo |
| **JavaScript** | ES2021 | Lógica da calculadora e interatividade |
| **ESLint** | 8.57.0 | Análise estática do código |
| **GitHub Actions** | - | Integração contínua (CI) |
| **Google Fonts** | - | Fontes Inter para melhor legibilidade |

### Dependências de Desenvolvimento

```json
{
  "devDependencies": {
    "eslint": "^8.57.0"
  }
}
```
---
## Instalação

### Pré-requisitos

- Navegador web moderno (Chrome, Firefox, Edge, Safari)
- Opcional: Git (para clonar)
- Opcional: Node.js (para lint)

### Passo a passo

#### Opção 1 - Baixar ZIP
1. Acesse o repositório no GitHub
2. Clique em "Code" → "Download ZIP"
3. Extraia e abra o `index.html`

#### Opção 2 - Clonar com Git
```bash
git clone https://github.com/Beatriz-Dezotti/financiamento_calculadora.git
cd financiamento_calculadora
```
---
## Execução

### Método 1 - Abrir diretamente no navegador (recomendado)

1. Navegue até a pasta do projeto
2. Dê dois cliques no arquivo `index.html`
3. O navegador abrirá automaticamente com a calculadora

### Método 2 - Live Server (VS Code)

1. Instale a extensão **"Live Server"** no VS Code
2. Abra a pasta do projeto no VS Code
3. Clique com botão direito no `index.html`
4. Escolha **"Open with Live Server"**

---
## Testes

### Como executar os testes

1. Abra o arquivo `tests.html` no navegador
2. Clique no botão **"Executar Testes"**
3. O resultado de cada teste será exibido na tela

### O que os testes verificam

| Teste | O que verifica |
|-------|----------------|
| SAC | Primeira parcela para financiamento de R$ 240.000 |
| Price | Parcela fixa para financiamento de R$ 240.000 |
| Percentual da renda | Cálculo correto da porcentagem |
| Alertas | Cores corretas (verde/amarelo/vermelho) |

### Resultado esperado
✅ PASS: Função calcularPrimeiraParcelaSAC existe

✅ PASS: Função calcularParcelaPrice existe

✅ PASS: Função calcularPercentualRenda existe

✅ PASS: Função gerarAlertaOrcamento existe

✅ PASS: SAC - primeira parcela deve ser R$ 2.586,67

✅ PASS: Price - parcela deve ser R$ 2.035,58

✅ PASS: Percentual renda - deve ser 34%

✅ PASS: Alerta verde - deve conter ✅

✅ PASS: Alerta amarelo - deve conter ⚠️

✅ PASS: Alerta vermelho - deve conter 🔴

✅ PASS: SAC - valor da parcela deve ser positivo

📊 Resultado: 11/11 testes passaram (100%)

---
## Linting (Análise Estática)

### O que é linting?

Linting é o processo de verificar o código em busca de problemas de estilo, inconsistências e alguns tipos de erro antes mesmo da execução.

### Executando o linter localmente

#### Pré-requisito: Node.js instalado

1. Instale o Node.js em: `https://nodejs.org/`

#### Passos para executar o ESLint

```bash
# Instalar dependências (primeira vez apenas)
npm install

# Executar o linter
npm run lint

# Ou diretamente com npx
npx eslint script.js
```
---
---

## Seção de Versionamento 

```markdown
## Versionamento

O projeto segue o **Versionamento Semântico (SemVer)** no formato `vMAJOR.MINOR.PATCH`.

| Versão | Data | Alterações |
|--------|------|------------|
| **v1.0.0** | 11/04/2026 | Lançamento inicial: todas as funcionalidades básicas implementadas, testes, linting e CI configurados. |

### Tags no Git

```bash
git tag v1.0.0
git push origin --tags
```
---
## Seção do Autor 

**Beatriz Dezotti de Souza**

- GitHub: [@Beatriz-Dezotti](https://github.com/Beatriz-Dezotti)
- Email: [biabiadezotti@gmail.com]
- Projeto desenvolvido para: [BootCamp II]
- Instituição: [UniCEUB]

--- 
## Licença

Este projeto está sob a licença MIT.

---

**Desenvolvido com ❤️ para ajudar famílias a realizarem o sonho da casa própria com planejamento e transparência.**
