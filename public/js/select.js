class Selector {
  constructor() {
    this.data;
  }
  getData(table) {
    let url = `http://localhost:5000/selectTable/${table}`;
    return fetch(url)
      .then((response) => response.json())
      .then((json) => {
        this.data = Array.from(json);
      });
  }
  writeData() {
    let box = document.querySelector('.box')
    box.innerHTML = '';
    let table = document.createElement("table");
    let headers = Object.keys(this.data[0]);
    let colNames = document.createElement("tr");
    for (let el of headers) {
      let th = document.createElement("th");
      th.innerText = el;
      colNames.append(th);
    }
    table.append(colNames);
    for (let i in this.data) {
      let row = document.createElement("tr");
      for (let el of headers) {
        let cell = document.createElement("td");
        cell.innerText = this.data[i][el];
        row.append(cell);
      }
      table.append(row);
    }
    box.append(table);
  }
}
const manager = new Selector();
for (let link of document.querySelectorAll(".rect")) {
  link.addEventListener("click", function () {
    let rows = manager.getData(this.innerText);
    rows.then((res) => manager.writeData());
  });
}
