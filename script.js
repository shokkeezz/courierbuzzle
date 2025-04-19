const queue1 = document.getElementById("cardsQueue1");
const queue2 = document.getElementById("cardsQueue2");
const createBtn = document.getElementById("createCardBtn");
const cardNameInput = document.getElementById("cardNameInput");
const cardMenu = document.getElementById("cardMenu");
const swapQueueBtn = document.getElementById("swapQueue");
const moveToTopBtn = document.getElementById("moveToTop");

let currentCard = null;

createBtn.addEventListener("click", () => {
  const name = cardNameInput.value.trim();
  if (name === "") {
    alert("Введите имя карточки!");
    return;
  }

  const card = document.createElement("div");
  card.className = "card";
  card.textContent = name;
  card.style.backgroundColor = getRandomColor();

  card.addEventListener("click", (e) => showCardMenu(e, card));
  queue1.appendChild(card);

  cardNameInput.value = "";
});

// Показ контекстного меню
function showCardMenu(event, card) {
  event.preventDefault();
  currentCard = card;

  // Позиционирование меню
  cardMenu.style.left = `${event.pageX}px`;
  cardMenu.style.top = `${event.pageY}px`;
  cardMenu.style.display = "block";

  // Управление пунктом "Поднять"
  const isInQueue1 = queue1.contains(card);
  moveToTopBtn.style.display = isInQueue1 ? "block" : "none";
}

// Переместить карточку
swapQueueBtn.addEventListener("click", () => {
  if (!currentCard) return;
  if (queue1.contains(currentCard)) {
    queue2.appendChild(currentCard);
  } else {
    queue1.appendChild(currentCard);
  }
  hideMenu();
});

// Поднять карточку
moveToTopBtn.addEventListener("click", () => {
  if (!currentCard) return;
  if (queue1.contains(currentCard)) {
    queue1.insertBefore(currentCard, queue1.firstChild);
  }
  hideMenu();
});

function hideMenu() {
  cardMenu.style.display = "none";
  currentCard = null;
}

// Закрытие меню при клике вне карточки
document.addEventListener("click", (e) => {
  if (!cardMenu.contains(e.target) && !e.target.classList.contains("card")) {
    hideMenu();
  }
});

function getRandomColor() {
    // Цвета без зелёного и жёлтого, добавлены мягкие оттенки
    const availableColors = [
      "#ff6b6b", // коралловый
      "#6bc1ff", // небесно-голубой
      "#ffa26b", // лососевый
      "#b06bff", // фиолетовый
  
      "#8ea6b4", // серо-голубой
      "#bfa0dc", // сиреневый
      "#a0c1b8", // светло-бирюзовый
      "#d3a588", // пудрово-бежевый
      "#b0bec5", // стальной серый
      "#a3a3d1"  // нежно-фиолетовый
    ];
  
    // Убираем дубли — карта цвета → его использования
    if (!getRandomColor.usedColors) getRandomColor.usedColors = new Set();
  
    // Если все цвета использованы — сбрасываем
    if (getRandomColor.usedColors.size >= availableColors.length) {
      getRandomColor.usedColors.clear();
    }
  
    // Выбираем рандомный неиспользованный цвет
    let color;
    do {
      color = availableColors[Math.floor(Math.random() * availableColors.length)];
    } while (getRandomColor.usedColors.has(color));
  
    getRandomColor.usedColors.add(color);
    return color;
  }
  
