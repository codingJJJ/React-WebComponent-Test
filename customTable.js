export default class extends HTMLElement {
  attr;
  constructor() {
    super();
    const template = document.getElementById("temp");
    this.root = this.attachShadow({ mode: "open" });
    this.template = document.getElementById("tableTemplate").innerHTML;
  }
  getAttr() {
    const obj = {};
    Array.from(this.attributes).forEach((name, index, target) => {
      obj[target[index].name] = target[index].value;
    });
    return obj;
  }
  setDataSource() {}
  setColumns() {}
  render(dataSource, columns) {
    this.attr = this.getAttr();
    const head = columns
      .map((col) => {
        return `<th>${col.title}</th>`;
      })
      .join("");
    const body = dataSource
      .map((data) => {
        const trContent = columns
          .map((col, index) => {
            const dataIndex = col.dataIndex;
            if (col.render && typeof col.render === "function") {
              return col.render(data?.[dataIndex], index, dataSource);
            } else {
              return `<td>${data?.[dataIndex] ?? ""}</td>`;
            }
          })
          .join("");
        return `<tr>${trContent}</tr>`;
      })
      .join("");
    this.root.innerHTML = this.template
      .replace(
        "{{tableStyle}}",
        this.attr.width ? `width: ${this.attr.width}px` : ""
      )
      .replace(
        "{{tableStyle}}",
        this.attr.width ? `width: ${this.attr.width}px` : ""
      )
      .replace("<!-- head -->", head)
      .replace("<!-- body -->", body);
  }
}
