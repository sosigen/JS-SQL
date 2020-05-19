class DBDelManager {
  constructor() {
    
  }
  generateForm = function (table) {
    if (document.querySelector(".box")) document.querySelector(".box").remove();
    if (document.querySelector(".submit"))
      document.querySelector(".submit").remove();
    let box = document.createElement("div");
    box.classList += "box";
    let input = document.createElement("input");
    input.type = "text";
    input.classList += "input";
    let label = document.createElement("label");
    label.classList += "desc";
    label.innerText = "id";
    let miniBox = document.createElement("div");
    miniBox.classList += "miniBox";
    miniBox.append(label);
    miniBox.append(input);
    box.append(miniBox);
    document.body.append(box);
    let button = document.createElement("button");
    button.classList += "rect submit";
    button.innerText = "zatwierdź";
    button.addEventListener("click", () => {
      this.sendData(table, document.querySelector(".input").value);
    });
    document.body.append(button);
  };
  sendData = function (table, id) {
    fetch(`http://localhost:5000/deleteRow/${table}/${id}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    }).then(
      (res) => {
        console.log(res);
        alert(`rekord ${id} usunięty`);
      },
      (err) => console.error(err)
    );
  };
}
const manager = new DBDelManager();
for (link of document.querySelectorAll('.rect')) {
  link.addEventListener("click", function () {
    manager.generateForm(this.innerText);
  });
}
