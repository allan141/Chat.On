// Importação da classe WebSocketServer da biblioteca "ws"
const { WebSocketServer } = require("ws");

// Importação da biblioteca dotenv para carregar variáveis de ambiente
const dotenv = require("dotenv");

// Carregamento das variáveis de ambiente do arquivo .env
dotenv.config();

// Criação de um novo servidor WebSocket na porta especificada pela variável de ambiente PORT ou 8080
const wss = new WebSocketServer({ 
  port: process.env.PORT || 8080 
});

// Definição do evento de conexão do servidor WebSocket
wss.on("connection", (ws) => {
  // Definição do evento de erro do cliente WebSocket
  ws.on("error", console.error);
  
  // Definição do evento de mensagem recebida do cliente WebSocket
  ws.on("message", (data) => {
    // Envio da mensagem recebida para todos os clientes conectados
    wss.clients.forEach((client) => client.send(data.toString()));
  });
  
  // Registro da conexão de um novo cliente
  console.log("Cliente conectado");
});
