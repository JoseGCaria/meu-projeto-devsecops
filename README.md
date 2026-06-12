# Portal DevSecOps - API Node.js (PoC DCC/UFLA)

Este repositório apresenta uma Prova de Conceito (PoC) estruturada para validar a implementação prática da cultura **DevSecOps** através do conceito de **Shift-Left Security**. O projeto consiste em uma API desenvolvida em Node.js e Express, integrada a uma esteira automatizada de Integração Contínua (CI) via GitHub Actions, responsável por auditar a qualidade do código, executar testes automatizados e validar vulnerabilidades de dependências antes de qualquer build ou deployment.

---

## O que este projeto faz?

A aplicação principal é uma API REST simplificada projetada para demonstrar conformidade arquitetural, práticas de segurança em desenvolvimento e auditoria automatizada.

### Funcionalidades do Código:
* **Ponto de Entrada Segurado:** Rota raiz (`/`) configurada para validação de integridade.
* **Módulo de Teste de Corretude:** Rota funcional (`/soma`) implementada para validar o comportamento lógico de entradas e saídas por meio de testes automatizados.
* **Mitigação de Code Smell / Divulgação de Informação:** Correção estrutural da vulnerabilidade nativa do Express que expõe a versão do framework no cabeçalho HTTP (`X-Powered-By`), mitigando vetores de ataque baseados em engenharia reversa de software.

### Recursos da Esteira Automatizada (CI):
1. **Garantia de Qualidade Local e Remota:** Execução automática do framework Jest com extração de relatórios completos de cobertura de linhas, ramificações e funções (`coverage/lcov.info`).
2. **Análise Estática de Segurança (SAST) e Qualidade:** Varredura completa da base de código via SonarCloud para travar commits que introduzam débito técnico, bugs ou falhas de segurança (*Security Hotspots*).
3. **Análise de Vulnerabilidade de Dependências (SCA):** Auditoria em tempo de execução via Snyk, escaneando a árvore do arquivo `package.json` contra bancos de dados globais de vulnerabilidades conhecidas (CVEs).

---

## Tecnologias e Ferramentas Utilizadas

O ecossistema do projeto foi selecionado para refletir as ferramentas mais consolidadas na indústria de engenharia de software e segurança:

* **Runtime:** Node.js (v18+)
* **Framework Web:** Express.js
* **Engine de Testes:** Jest (Configurado para asserções lógicas e geração de relatório LCOV)
* **Orquestrador de CI/CD:** GitHub Actions (Uso de ambientes isolados em containers `ubuntu-latest`)
* **Análise de Código:** SonarCloud Scan
* **Segurança de Cadeia de Suprimentos (SCA):** Snyk Security Application

---

## Estrutura Organizacional do Projeto

A arquitetura do diretório segue rigidamente o princípio de separação de responsabilidades (Separation of Concerns), dividindo artefatos públicos, regras de pipeline e chaves privadas locais:

```text
meu-projeto-devsecops/
├── .github/
│   └── workflows/
│       └── ci.yml           # Configuração da esteira automatizada do GitHub Actions
├── src/
│   ├── app.js               # Lógica de rotas, middlewares e mitigações da API
│   └── server.js            # Inicialização e escuta da porta do servidor HTTP
├── tests/
│   └── app.test.js          # Conjunto de testes unitários para asserção de comportamento
├── .env                     # ARQUIVO PRIVADO: Chaves de API locais (Bloqueado no Git)
├── .env.example             # ARQUIVO PÚBLICO: Modelo de configuração para novos ambientes
├── .gitignore               # Instruções de exclusão de artefatos locais pesados ou sensíveis
├── package.json             # Manifesto de dependências e scripts de execução
├── package-lock.json        # Árvore de resolução exata dos módulos instalados
└── sonar-project.properties # Parâmetros estáticos para o motor do SonarCloud
```

---

## Configuração e Instalação de Tokens (Passo a Passo)

Para manter o repositório em total conformidade com as regras de segurança e evitar o vazamento de credenciais rígidas (*hardcoded secrets*), as chaves de acesso são gerenciadas de forma híbrida:

### 1. Configuração no Ambiente Local (Sua Máquina)
O arquivo `.env` armazena suas chaves localmente para que você possa rodar auditorias direto no seu terminal sem expor nada ao enviar para a nuvem.

1. Na raiz do projeto, localize o arquivo `.env.example`.
2. Crie uma cópia exata deste arquivo e nomeie a cópia apenas como `.env`.
3. Abra o arquivo `.env` e insira seus tokens válidos gerados nas plataformas:

```text
# Chaves de Autenticação da Pipeline DevSecOps
SONAR_TOKEN=seu_token_real_do_sonar_cloud_aqui
SNYK_TOKEN=seu_token_real_do_snyk_aqui

# Configurações do Servidor Local
PORT=3000
```
*Nota: O arquivo `.gitignore` já está configurado para garantir que o seu `.env` nunca saia do seu computador.*

### 2. Configuração no Repositório Remoto (GitHub Secrets)
Para que a esteira automatizada (`ci.yml`) consiga autenticar-se no Snyk e no SonarCloud de forma segura durante a execução na nuvem, as chaves precisam estar cadastradas nos **Encrypted Secrets** do GitHub:

1. Acesse o seu repositório no site do **GitHub**.
2. No menu superior do repositório, clique na aba ⚙️ **Settings** (Configurações).
3. Na barra lateral esquerda, navegue até a seção **Security** e clique em **Secrets and variables** -> **Actions**.
4. Clique no botão verde superior: **New repository secret**.
5. Cadastre o primeiro segredo:
   * **Name:** `SONAR_TOKEN`
   * **Value:** *Cole o token gerado no painel do SonarCloud (o código que começa com `squ_`).*
6. Clique em **Add secret**.
7. Clique novamente em **New repository secret** e cadastre o segundo segredo:
   * **Name:** `SNYK_TOKEN`
   * **Value:** *Cole o token gerado na área de Account Settings do painel do Snyk.*
8. Clique em **Add secret**.

---

## Como Executar o Projeto Localmente

### Pré-requisitos
* Node.js instalado (versão 18 LTS recomendada).
* NPM (gerenciador de pacotes nativo do Node).

### Passo 1: Sincronização de Dependências
Instale todos os módulos necessários declarados no ecossistema (incluindo Express e a suíte Jest):
```bash
npm install
```

### Passo 2: Execução de Testes e Cobertura
Rode a suíte de testes unitários localmente e gere o relatório LCOV estruturado na pasta `/coverage`:
```bash
npx jest --coverage
```

### Passo 3: Inicialização da API
Inicie o servidor HTTP localmente para realizar requisições manuais ou testes de integração:
```bash
npm start
```
A API estará acessível em `http://localhost:3000`.

---

## Fluxo de Integração Contínua (CI)

Toda vez que um comando `git push` ou um *Pull Request* for direcionado para as ramificações principais (`main` ou `master`), a esteira configurada no arquivo `ci.yml` efetuará as seguintes validações automáticas em paralelo:

```text
[Push / PR] ──► Job 1: Build & Test ──┬──► Job 2: Snyk SCA Scan (Dependências)
                                      └──► Job 3: SonarCloud SAST (Qualidade do Código)
```

Se qualquer um dos Jobs falhar (um teste quebrar, o Snyk achar uma vulnerabilidade crítica, ou o SonarCloud falhar no *Quality Gate*), a esteira bloqueará a integração, impedindo que o código defeituoso chegue ao ambiente final. Isso garante a governança completa e a segurança ponta a ponta do ciclo de vida do software.
