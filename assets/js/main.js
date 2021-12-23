const app = document.querySelector(".app");
const buttonClear = document.querySelector("#clear");
const fixedColor = document.querySelector("#color");
const gridSize = document.querySelector("#range");
const buttonsOptions = document.querySelectorAll("[type='button']");

const returnBoxes = () => {
  return app.querySelectorAll("div");
};

const setGrid = () => {
  const title = document.querySelector('.grid-title');
  title.innerHTML = `${gridSize.value}x${gridSize.value}`;

  for (let i = 0; i < gridSize.value ** 2; i++) {
    const div = document.createElement("div");
    app.appendChild(div);
  }

  const boxes = returnBoxes();

  boxes.forEach((div) => {
    div.classList.add("box");
  });

  app.style.setProperty("--app-grid-columns", `repeat(${gridSize.value}, 1fr)`);
  app.style.setProperty("--app-grid-rows", `repeat(${gridSize.value}, 1fr)`);
};

const clearPrevious = () => {
  const toDelete = returnBoxes();
  toDelete.forEach((element) => element.remove());
};

const clear = () => {
  const boxes = returnBoxes();
  boxes.forEach((box) => box.removeAttribute("style"));
};

const randomColor = () => {
  let color = `#${Math.floor(Math.random()*16777215).toString(16)}`;
  return color;
}

const getColor = () => {
  let color;
  const opcionActual = document.querySelector(".btn-active");

  switch (opcionActual.id){
    case "rgb":
      color = randomColor();
      break;
    case "eraser":
      color = "#fff";
      break;
    default:
      return fixedColor.value;
  }
  return color;
};

setGrid();

gridSize.addEventListener("input", () => {
  clearPrevious();
  setGrid();
});

buttonsOptions.forEach((button) => {
  button.addEventListener("click", () => {
    let actualButton = document.querySelector(".btn-active");
    console.log(actualButton);
    if (actualButton && actualButton !== button.target) {
      actualButton.classList.toggle("btn-active");
    }
    button.classList.toggle("btn-active");
  });
});

app.addEventListener("mouseover", (e) => {
  if (e.target && e.target.tagName == "DIV") {
    e.target.style.backgroundColor = getColor();
  }
});

buttonClear.addEventListener("click", clear);
