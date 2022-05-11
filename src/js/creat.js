import { http } from "./getdata.js";
import render from "./render.js";


var creat_btn = document.getElementById("create_btn");
var title = document.querySelector('input[name="title"]');
var content = document.querySelector('textarea[name="content"]');

var date = new Date();

function handleClickAdd() {
  creat_btn.addEventListener("click", () => {
    var article = {
      title: title.value,
      createdAt: date.toLocaleString(),
      content: content.value,
    };

    const api = new http("http://localhost:3000/Blog",article);

    api.post();


  });
}





export default handleClickAdd;
