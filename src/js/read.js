import { http } from "./getdata.js";
import render from "./render.js";

var select = document.getElementById("ddlViewBy");
var back = document.querySelector(".back");
var b = document.querySelector(".b");
var next = document.querySelector(".next");
var n = document.querySelector(".n");
var pageNav = document.getElementById("pagination");

const api = new http("http://localhost:3000/Blog");

let currentpage = 1;
pageNav.innerHTML = currentpage;

api.get(render,1,10);

select.onchange = () => {
  let postperpage = select.options[select.selectedIndex].value;
  api.get(render, currentpage, postperpage);
};

back.onclick = () => {
  currentpage = 1;
  let postperpage = select.options[select.selectedIndex].value;

  api.get(render, currentpage, postperpage);

  pageNav.innerHTML = currentpage;
};
next.onclick = () => {
  let postperpage = select.options[select.selectedIndex].value;

  api.get((item) => {
    currentpage = Math.ceil(item.length / postperpage);
    api.get(render, currentpage, postperpage);
    pageNav.innerHTML = currentpage;
  });
};

n.onclick = () => {
  let postperpage = select.options[select.selectedIndex].value;

  api.get((item) => {
    if (currentpage >= Math.ceil(item.length / postperpage)) {
      currentpage = Math.ceil(item.length / postperpage);
    } else {
      currentpage++;
      api.get(render, currentpage, postperpage);
      pageNav.innerHTML = currentpage;
    }
  });
};

b.onclick = () => {
  if (currentpage <= 1) {
    currentpage = 1;
  } else {
    currentpage--;
  }
  let postperpage = select.options[select.selectedIndex].value;

  api.get(render, currentpage, postperpage);

  pageNav.innerHTML = currentpage;
};
