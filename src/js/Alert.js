export default async function Alert() {
  //read alert.json file
  const response = await fetch("../json/alerts.json");
  if (response.ok) {
    let data = await response.json();
    displayResults(data);
  } else {
    throw new Error("Bad Response");
  }
}

function displayResults(alertItem) {
  const main = document.querySelector("main");
  const section = document.createElement("section");
  const closeBtn = document.createElement("button");
  const list = [];

  section.classList.add("alert-list");
  closeBtn.classList.add("close-btn");
  closeBtn.innerHTML = "x";

  //iterate though alerts.json
  alertItem.forEach((item) => {
    const message = document.createElement("p");
    message.innerHTML = item.message;
    message.style.color = item.color;
    message.style.backgroundColor = item.background;
    list.push(message);
  });

  let randomp = list[Math.floor(Math.random() * list.length)];
  section.appendChild(closeBtn);
  section.appendChild(randomp);
  setTimeout(() => {
    main.appendChild(section);
  }, 4000);

  closeBtn.addEventListener("click", () => {
    section.style.display = "none";
  });
}
