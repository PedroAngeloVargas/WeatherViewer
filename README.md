# WeatherViewer App 🌦️

Aplicativo móvel de previsão do tempo desenvolvido como Trabalho Prático da disciplina de Programação III.

## Identificação do Aluno

* **Nome:** Pedro Ângelo Tellaroli Vargas
* **Curso:** Sistemas de Informação
* **Período:** 6º Período
* **Disciplina:** Programação III
* **Instituição:** UEMG - Unidade Passos

---

## 📱 Descrição da Aplicação

O **WeatherViewer** é uma aplicação cliente que consome um Web Service REST para exibir a previsão do tempo de 7 dias para uma cidade específica.

O projeto foi desenvolvido em **React Native (Expo)** utilizando **TypeScript**, tomando como referência a arquitetura e os requisitos funcionais propostos no **Capítulo 7** do livro *Android for Programmers*, porém adaptado para consumir uma API personalizada hospedada na AWS.

**Principais Funcionalidades:**
* Entrada de nome de cidade (ex: `Passos, MG, BR`).
* Consumo de API REST via requisições HTTP GET.
* Tratamento de erros de rede, parâmetros inválidos e chaves de acesso.
* Exibição de lista de previsão contendo:
    * Data formatada.
    * Ícone da condição climática.
    * Descrição do clima.
    * Temperaturas Mínima e Máxima (em Celsius).
    * Umidade relativa do ar.

---

## ⏯️ Demonstração

https://github.com/user-attachments/assets/a8029589-d55f-457c-88f3-57a98fd731e7

---

## 🚀 Instruções para Execução

### Pré-requisitos
* Node.js instalado.
* Aplicativo **Expo Go** instalado no celular (Android) ou Emulador configurado.

### Passo a Passo

1.  **Clone o repositório:**
    ```bash
    git clone https://github.com/PedroAngeloVargas/WeatherViewer.git
    cd WeatherViewer
    ```

2.  **Instale as dependências:**
    ```bash
    npm install
    ```

3.  **Configuração de Variáveis de Ambiente:**
    Crie um arquivo chamado `.env` na raiz do projeto e adicione as chaves abaixo (necessário para segurança da API Key):

    ```env
    EXPO_PUBLIC_KEY=CHAVE_DISPONIBILIZADA
    EXPO_PUBLIC_URL=http://agent-weathermap-env-env.eba-6pzgqekp.us-east-2.elasticbeanstalk.com/api/weather
    ```

4.  **Execute o projeto:**
    ```bash
    npx expo start 
    ```

5.  **No celular:**
    Escaneie o QR Code gerado no terminal utilizando o aplicativo **Expo Go**.

---

## 🌐 Exemplo da URL Utilizada

A aplicação realiza a consulta à API utilizando o método **GET** com a seguinte estrutura de URL e parâmetros:

```http
[http://agent-weathermap-env-env.eba-6pzgqekp.us-east-2.elasticbeanstalk.com/api/weather?city=Passos,MG,BR&days=7&APPID=CHAVE_DISPONIBILIZADA]
