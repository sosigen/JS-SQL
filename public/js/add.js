class DBAddManager {
  constructor(table) {
    this.headers;
    this.selTable;
  }
  getHeaders = function (table) {
    this.selTable = table;
    let url = `http://localhost:5000/selectTable/${table}`;
    return fetch(url)
      .then((response) => response.json())
      .then((json) => {
        console.log(Object.keys(json[0]));
        this.headers = Array.from(Object.keys(json[0]));
      });
  };
  generateForm = function () {
    if (document.querySelector(".box")) document.querySelector(".box").remove();
    if (document.querySelector(".submit"))
      document.querySelector(".submit").remove();
    let box = document.createElement("div");
    box.classList += "box";
    for (let i of this.headers) {
      let input = document.createElement("input");
      input.type = "text";
      input.classList += "input";
      let label = document.createElement("label");
      label.classList += "desc";
      label.innerText = i;
      let miniBox = document.createElement("div");
      miniBox.classList += "miniBox";
      miniBox.append(label);
      miniBox.append(input);
      box.append(miniBox);
    }
    document.body.append(box);
    let button = document.createElement("button");
    button.classList += "rect submit";
    button.innerText = "zatwierdź";
    button.addEventListener("click", () => {
      this.sendData(this.prepareData());
    });
    document.body.append(button);
  };
  prepareData = function () {
    let inputs = Array.from(document.querySelectorAll(".input"));
    console.log(inputs)
    let data = {};
    for (let i in inputs) {
        console.log(this.headers[i], inputs[i].value)
      data[this.headers[i]] = inputs[i].value;
    }
    console.log(data)
    return data;
  };
  sendData = function (data) {
    fetch(`http://localhost:5000/addRow/${this.selTable}`, {
      method: "POST",
      body: JSON.stringify(data),
      headers: { "Content-Type": "application/json" },
    }).then(
      (res) => {
        console.log(res);
        alert("rekord dodany");
      },
      (err) => console.error(err)
    );
  };
}

const manager = new DBAddManager();
for (link of document.querySelectorAll(".rect")) {
  link.addEventListener("click", function () {
    let headers = manager.getHeaders(this.innerText);
    headers.then((res) => manager.generateForm(headers));
  });
}
