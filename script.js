const tabButtons = document.querySelectorAll(".tab-btn");
const tabPanels = {
  game: document.getElementById("panel-game"),
  dev: document.getElementById("panel-dev"),
};

function selectTab(name) {
  tabButtons.forEach((btn) => {
    btn.setAttribute("aria-selected", String(btn.id === `tab-${name}`));
  });

  Object.entries(tabPanels).forEach(([key, panel]) => {
    if (panel) {
      panel.hidden = key !== name;
    }
  });
}

tabButtons.forEach((btn) => {
  btn.addEventListener("click", () => selectTab(btn.id.replace("tab-", "")));
});
