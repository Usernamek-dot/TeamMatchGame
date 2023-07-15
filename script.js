// Array de preguntas y respuestas
const questions = [
  { question: '🎨 ¿Qué artista prefieres?', options: ['Shakira', 'Karol G', 'Juan Gabriel', 'Jean Sebastian'], color: '' },
  { question: '🎵 ¿Qué canción prefieres?', options: ['Monotonía de Shakira', 'Acróstico de Shakira', 'Como tú decidas', 'Oiga de Joan Sebastian'], color: '' },
  { question: '✈️ ¿Qué destino prefieres para viajar?', options: ['Ciudad de Panamá', 'Bocas del Toro', 'Dubai', 'Singapur'], color: '' },
  { question: '🍹 ¿Qué bebida prefieres?', options: ['Coca-Cola', 'Limonada de Coco', 'Matcha', 'Té de Jamaica'], color: '' },
  { question: '🎥 ¿Qué película prefieres?', options: ['Lo que el viento se llevó', 'Volver al futuro', 'Harry Potter', 'Matrix'], color: '' },
  { question: '🚗 ¿Qué carro prefieres?', options: ['BMW', 'Mercedes', 'Porsche', 'Ferrari'], color: '' },
  { question: '💐 ¿Qué flor prefieres?', options: ['Margarita', 'Rosas', 'Tulipanes', 'Orquídeas'], color: '' },
  { question: '🍦 ¿Qué sabores de helado prefieres?', options: ['Chocolate', 'Vainilla', 'Limón', 'Mandarina'], color: '' },
  { question: '📚 ¿Qué libro prefieres?', options: ['Crónicas de una muerte anunciada', '1984', 'La Biblia', 'La historia de Europa'], color: '' },
  { question: '🏈 ¿Qué deporte prefieres?', options: ['Fútbol', 'Ajedrez', 'Básquet', 'Tenis'], color: '' },
  { question: '🌈 ¿Qué color prefieres?', options: ['Rojo', 'Negro', 'Turquesa', 'Fucsia'], color: '' }
];

let currentQuestion = 0;
let teamColor = '';

// Obtener el nombre del almacenamiento del navegador (localStorage)
const getNameFromStorage = () => {
  const name = localStorage.getItem('teamMatchName');
  return name ? name : '';
}

// Guardar el nombre en el almacenamiento del navegador (localStorage)
const saveNameToStorage = (name) => {
  localStorage.setItem('teamMatchName', name);
}

// Función para calcular el equipo
const calculateTeam = () => {
  const name = document.getElementById('name').value.trim();

  if (name === '') {
    alert('Por favor, ingresa tu nombre.');
    return;
  }

  saveNameToStorage(name); // Guardar el nombre en el almacenamiento del navegador

  const answer = document.querySelector('input[name="answer"]:checked');

  if (!answer) {
    alert('Por favor, selecciona una respuesta.');
    return;
  }

  const optionIndex = parseInt(answer.value);
  questions[currentQuestion].color = questions[currentQuestion].options[optionIndex];

  if (currentQuestion < questions.length - 1) {
    currentQuestion++;
    showQuestion();
  } else {
    showResult();
  }
}

// Función para mostrar la pregunta actual
const showQuestion = () => {
  const questionElement = document.getElementById('questions');
  questionElement.innerHTML = `
    
    <input placeholder="💚 Tu Nombre 💜" type="text" id="name" value="${getNameFromStorage()}"><br><br>
    <h2 class='questionText'>${questions[currentQuestion].question}</h2>
    ${getOptionsHTML(questions[currentQuestion].options)}
    <br><br>
    
  `;
}

// Función para obtener el HTML de las opciones de respuesta
const getOptionsHTML = (options) => {
  let optionsHTML = '';
  for (let i = 0; i < options.length; i++) {
    optionsHTML += `
      <input onclick="calculateTeam()" type="radio" name="answer" value="${i}">${options[i]}<br>
    `;
  }
  return optionsHTML;
}

// Función para seleccionar una respuesta
const selectAnswer = (optionIndex) => {
  const radioButtons = document.getElementsByName('answer');
  radioButtons[optionIndex].checked = true;
}

// Función para mostrar el resultado con animación
const showResultWithAnimation = () => {
  const resultElement = document.getElementById('result');
  const colorCircle = document.getElementById('colorCircle');

  // Ocultar el resultado inicialmente
  resultElement.style.display = 'none';

  // Mostrar la animación
  colorCircle.style.display = 'block';

  // Esperar 3 segundos y mostrar el resultado final
  setTimeout(() => {
    resultElement.style.display = 'block';
    colorCircle.style.display = 'none';
    showResult();
  }, 3000);
}

// Función para mostrar el resultado
const showResult = () => {
  const resultElement = document.getElementById('result');
  resultElement.style.display = 'block';

  const teamColorElement = document.getElementById('teamColor');
  const cupcakeElement = document.getElementById('cupcake');

  const greenPoints = questions.filter(q => q.color === 'Equipo Verde').length;
  const purplePoints = questions.filter(q => q.color === 'Equipo Morado').length;

  if (greenPoints > purplePoints) {
    teamColor = 'Equipo Verde';
    teamColorElement.style.color = 'green';
    cupcakeElement.src = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRNqm7Qj7afcE3BPS6Lg4a0gF0hwtZx87xr2g&usqp=CAU?w=200';
  } else {
    teamColor = 'Equipo Morado';
    teamColorElement.style.color = 'purple';
    cupcakeElement.src = 'https://img.freepik.com/premium-vector/cupcake-blueberry-cream-sweet-cake-desert-vector-illustration_526280-678.jpg?w=200';
  }

  const name = getNameFromStorage(); // Obtener el nombre del almacenamiento del navegador
  teamColorElement.textContent = `${name}, quedaste en el ${teamColor}`;
}

// Función para compartir en redes sociales
const shareOnSocialMedia = () => {
  // Aquí puedes agregar la lógica para compartir en redes sociales
  alert(`Compartiendo en redes sociales: ¡Soy del ${teamColor}!`);
}

// Función para obtener un arreglo de preguntas en orden aleatorio
const getRandomQuestions = () => {
  const randomQuestions = [...questions];
  for (let i = randomQuestions.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [randomQuestions[i], randomQuestions[j]] = [randomQuestions[j], randomQuestions[i]];
  }
  return randomQuestions;
}

// Mostrar las preguntas en orden aleatorio
const randomQuestions = getRandomQuestions();
questions.splice(0, questions.length, ...randomQuestions);

// Mostrar la primera pregunta al cargar la página
showQuestion();
