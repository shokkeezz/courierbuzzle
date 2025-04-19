const queue1 = document.getElementById("queue1");
const queue2 = document.getElementById("queue2");
const cardMenu = document.getElementById("cardMenu");
const confirmDelete = document.getElementById("confirmDelete");
const swapQueueBtn = document.getElementById("swapQueue");
const moveToTopBtn = document.getElementById("moveToTop");
const closeShiftBtn = document.getElementById("closeShift");
const confirmYes = document.getElementById("confirmYes");
const confirmNo = document.getElementById("confirmNo");

let currentCard = null;
let menuX = 0;
let menuY = 0;

function getRandomColor() {
  const colors = [
    "#ff6b6b", "#6bc1ff", "#ffa26b", "#b06bff",
    "#8ea6b4", "#bfa0dc", "#a0c1b8",
    "#d3a588", "#b0bec5", "#a3a3d1"
  ];
  if (!getRandomColor.used) getRandomColor.used = new Set();

  if (getRandomColor.used.size >= colors.length) {
    getRandomColor.used.clear();
  }

  let color;
  do {
    color = colors[Math.floor(Math.random() * colors.length)];
  } while (getRandomColor.used.has(color));

  getRandomColor.used.add(color);
  return color;
}

function createCard() {
  const name = document.getElementById("cardName").value.trim();
  if (!name) return;

  const card = document.createElement("div");
  card.className = "card";
  card.style.backgroundColor = getRandomColor();
  card.textContent = name;

  card.addEventListener("click", (e) => {
    showCardMenu(e, card);
  });

  queue1.appendChild(card);
  document.getElementById("cardName").value = "";
}

function showCardMenu(event, card) {
  event.preventDefault();
  currentCard = card;
  menuX = event.pageX;
  menuY = event.pageY;

  cardMenu.style.left = `${menuX}px`;
  cardMenu.style.top = `${menuY}px`;
  cardMenu.style.display = "block";

  moveToTopBtn.style.display = queue1.contains(card) ? "block" : "none";
}

swapQueueBtn.addEventListener("click", () => {
  if (!currentCard) return;
  const parent = currentCard.parentElement;
  const targetQueue = parent.id === "queue1" ? queue2 : queue1;
  targetQueue.appendChild(currentCard);
  hideMenus();
});

moveToTopBtn.addEventListener("click", () => {
  if (!currentCard || !queue1.contains(currentCard)) return;
  queue1.insertBefore(currentCard, queue1.children[1]); // после заголовка
  hideMenus();
});

closeShiftBtn.addEventListener("click", () => {
  cardMenu.style.display = "none";
  confirmDelete.style.left = `${menuX}px`;
  confirmDelete.style.top = `${menuY}px`;
  confirmDelete.style.display = "block";
});

confirmYes.addEventListener("click", () => {
  if (currentCard) {
    currentCard.remove();
  }
  hideMenus();
});

confirmNo.addEventListener("click", () => {
  hideMenus();
});

function hideMenus() {
  cardMenu.style.display = "none";
  confirmDelete.style.display = "none";
  currentCard = null;
}

document.addEventListener("click", (e) => {
  if (
    !cardMenu.contains(e.target) &&
    !confirmDelete.contains(e.target) &&
    !e.target.classList.contains("card")
  ) {
    hideMenus();
  }
});
