const themeBtn = document.getElementById("themeBtn");
const visitCount = document.getElementById("visitCount");
const greetingText = document.getElementById("greetingText");
let typingTimer = null;

function updateVisitCount() {
  const key = "kobayashi-visit-count";
  const current = Number(localStorage.getItem(key) || 0) + 1;
  localStorage.setItem(key, String(current));
  visitCount.textContent = String(current);
}

function getGreetingMessage() {
  const hour = new Date().getHours();

  if (hour >= 5 && hour < 12) {
    return "おはようございます。今日もゆるくいきましょう。";
  }

  if (hour >= 12 && hour < 18) {
    return "こんにちは。午後も一歩ずつ進めばOK。";
  }

  if (hour >= 18 && hour < 23) {
    return "こんばんは。今日の締めに少しだけ前進。";
  }

  return "夜更かし中？ 無理しすぎず休憩も大事です。";
}

function typeWriter(element, message, speed = 45) {
  if (!element) {
    return;
  }

  if (typingTimer) {
    clearInterval(typingTimer);
  }

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduceMotion) {
    element.textContent = message;
    element.classList.remove("typing");
    return;
  }

  element.textContent = "";
  element.classList.add("typing");

  let i = 0;
  typingTimer = setInterval(() => {
    i += 1;
    element.textContent = message.slice(0, i);

    if (i >= message.length) {
      clearInterval(typingTimer);
      element.classList.remove("typing");
    }
  }, speed);
}

function showTimeGreeting() {
  typeWriter(greetingText, getGreetingMessage());
}

function applySavedTheme() {
  const saved = localStorage.getItem("kobayashi-theme");
  if (saved === "sunset") {
    document.body.dataset.theme = "sunset";
  }
}

function toggleTheme() {
  const nextTheme = document.body.dataset.theme === "sunset" ? "" : "sunset";
  if (nextTheme) {
    document.body.dataset.theme = nextTheme;
    localStorage.setItem("kobayashi-theme", nextTheme);
    return;
  }

  delete document.body.dataset.theme;
  localStorage.removeItem("kobayashi-theme");
}

applySavedTheme();
updateVisitCount();
showTimeGreeting();

setInterval(() => {
  if (!greetingText) {
    return;
  }
  greetingText.textContent = getGreetingMessage();
}, 60000);

if (themeBtn) {
  themeBtn.addEventListener("click", toggleTheme);
}
