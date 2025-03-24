const login = document.querySelector(".login")
const loginForm = login.querySelector(".login__form")
const loginInput = login.querySelector(".login__input")


const chat = document.querySelector(".chat")
const chatForm = chat.querySelector(".chat__form")
const chatInput = chat.querySelector(".chat__input")
const chatMessages = chat.querySelector(".chat__messages")

const colors = [
    "cadetblue",
    "darkgoldenrod",
    "cornflowerblue",
    "darkkhaki",
    "hotpink",
    "gold"
]

const user = { id: "", name: "", color: "" }

let websocket

const createMessageSelfElement = (content) => {
    const div = document.createElement("div")

    div.classList.add("message--self")
    div.innerHTML = content

    return div
}

const createMessageOtherElement = (content, sender, senderColor) => {
    const div = document.createElement("div")
    const span = document.createElement("span")

    div.classList.add("message--other")

    span.classList.add("message--sender")
    span.style.color = senderColor

    div.appendChild(span)

    span.innerHTML = sender
    div.innerHTML += content

    return div
}

const getRandomColor = () => {
    const randomIndex = Math.floor(Math.random() * colors.length)
    return colors[randomIndex]
}

const scrollScreen = () => {
    window.scrollTo({
        top: document.body.scrollHeight,
        behavior: "smooth"
    })
}

const processMessage = ({ data }) => {
    const { userId, userName, userColor, content } = JSON.parse(data)

    const message =
        userId == user.id
            ? createMessageSelfElement(content)
            : createMessageOtherElement(content, userName, userColor)

    chatMessages.appendChild(message)

    scrollScreen()
}

const handleLogin = (event) => {
    event.preventDefault()

    user.id = crypto.randomUUID()
    user.name = loginInput.value
    user.color = getRandomColor()

    login.style.display = "none"
    chat.style.display = "flex"

    websocket = new WebSocket("https://chat-on-frontend.onrender.com")
    websocket.onmessage = processMessage
}

const sendMessage = (event) => {
    event.preventDefault()

    const message = {
        userId: user.id,
        userName: user.name,
        userColor: user.color,
        content: chatInput.value
    }

    websocket.send(JSON.stringify(message))

    chatInput.value = ""
}

loginForm.addEventListener("submit", handleLogin)
chatForm.addEventListener("submit", sendMessage)

// Variáveis para armazenar o nome do usuário e as mensagens
let usuario;
let mensagens = [];

// Função para armazenar o nome do usuário no LocalStorage
function armazenarUsuario(nome) {
  usuario = nome;
  localStorage.setItem('usuario', nome);
}

// Função para armazenar as mensagens no LocalStorage
function armazenarMensagem(mensagem) {
  mensagens.push(mensagem);
  localStorage.setItem('mensagens', JSON.stringify(mensagens));
}

// Função para recuperar as mensagens do LocalStorage
function recuperarMensagens() {
  const mensagensArmazenadas = localStorage.getItem('mensagens');
  if (mensagensArmazenadas) {
    mensagens = JSON.parse(mensagensArmazenadas);
    return mensagens;
  } else {
    return [];
  }
}

// Função para renderizar as mensagens na tela
function renderizarMensagens() {
  const chatMessages = document.querySelector('.chat__messages');
  chatMessages.innerHTML = '';
  mensagens.forEach((mensagem) => {
    const messageElement = document.createElement('div');
    messageElement.textContent = mensagem;
    chatMessages.appendChild(messageElement);
  });
}

// Evento para o formulário de login
document.querySelector('.login__form').addEventListener('submit', (e) => {
  e.preventDefault();
  const nomeUsuario = document.querySelector('.login__input').value;
  armazenarUsuario(nomeUsuario);
});

// Evento para o formulário de envio de mensagem
document.querySelector('.chat__form').addEventListener('submit', (e) => {
  e.preventDefault();
  const mensagem = document.querySelector('.chat__input').value;
  armazenarMensagem(mensagem);
  renderizarMensagens();
});

// Recuperar mensagens armazenadas e renderizar na tela
mensagens = recuperarMensagens();
renderizarMensagens();
