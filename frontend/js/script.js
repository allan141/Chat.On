
// Seleção de elementos HTML
const login = document.querySelector(".login"); 
const loginForm = login.querySelector(".login__form");
const loginInput = login.querySelector(".login__input");

const chat = document.querySelector(".chat");
const chatForm = chat.querySelector(".chat__form");
const chatInput = chat.querySelector(".chat__input");
const chatMessages = chat.querySelector(".chat__messages");

// Array de cores para atribuir aleatoriamente aos usuários
const colors = [
  "cadetblue",
  "darkgoldenrod",
  "cornflowerblue",
  "darkkhaki",
  "hotpink",
  "gold"
];

// Objeto que armazena informações do usuário
const user = {
  id: "",
  name: "",
  color: ""
};

// Variável que armazena a conexão WebSocket
let websocket;

// Função para criar elemento de mensagem do próprio usuário
const createMessageSelfElement = (content) => {
  const div = document.createElement("div");
  div.classList.add("message--self");
  div.innerHTML = content;
  return div;
};

// Função para criar elemento de mensagem de outro usuário
const createMessageOtherElement = (content, sender, senderColor) => {
  const div = document.createElement("div");
  const span = document.createElement("span");
  div.classList.add("message--other");
  span.classList.add("message--sender");
  span.style.color = senderColor;
  div.appendChild(span);
  span.innerHTML = sender;
  div.innerHTML += content;
  return div;
};

// Função para retornar uma cor aleatória do array colors
const getRandomColor = () => {
  const randomIndex = Math.floor(Math.random() * colors.length);
  return colors[randomIndex];
};

// Função para rolar a tela até o final
const scrollScreen = () => {
  window.scrollTo({
    top: document.body.scrollHeight,
    behavior: "smooth"
  });
};

// Função para processar mensagens recebidas pelo WebSocket
const processMessage = ({ data }) => {
  const { userId, userName, userColor, content } = JSON.parse(data);
  const message = userId == (link unavailable) ? 
    createMessageSelfElement(content) : 
    createMessageOtherElement(content, userName, userColor);
  chatMessages.appendChild(message);
  scrollScreen();
};

// Função para lidar com o evento de login
const handleLogin = (event) => {
  event.preventDefault();
  (link unavailable) = crypto.randomUUID();
  user.name = loginInput.value;
  user.color = getRandomColor();
  login.style.display = "none";
  chat.style.display = "flex";
  websocket = new WebSocket("wss://chat-on-backend-8vwj.onrender.com");
  websocket.onmessage = processMessage;
};

// Função para lidar com o evento de envio de mensagem
const sendMessage = (event) => {
  event.preventDefault();
  const message = {
    userId: (link unavailable),
    userName: user.name,
    userColor: user.color,
    content: chatInput.value
  };
  websocket.send(JSON.stringify(message));
  chatInput.value = "";
};

// Adiciona listeners para os eventos de submit dos formulários
loginForm.addEventListener("submit", handleLogin);
chatForm.addEventListener("submit", sendMessage);
