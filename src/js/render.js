import format from "./format.js";
import { http } from "./getdata.js";


var container = document.querySelector(".container_table");
var title = document.querySelector('input[name="title"]');
var content = document.querySelector('textarea[name="content"]');
var update__btn = document.getElementById("update_btn");
var creat =document.getElementById("create_btn")


var date = new Date();
update__btn.style.display="none";


function render(arr) {
  var html = arr.map((i) => {
    return `  <tr>
        <td class="text__data__table"><h1 class="">${i.id}</h1></td>
        <td class="text__data__table"><h1 class=""> ${i.title}</h1></td>
        <td class="text__data__table"> ${i.content}</td>
        <td class="text__data__table"><p class="">${format(
          i.createdAt
        )}</p></td>
        <td class="text__data__table text-white cursor-pointer px-[20px] py-[20px]">
        <a id="${i.id}" title="${i.title}" content="${
      i.content
    }" class="btn__handle xoa">Xoá</a>
        <a id="${i.id}" title="${i.title}" content="${
      i.content
    }" class="btn__handle sua">Sửa</a></td>
        </tr>`;
  });

  container.innerHTML = html.join("");

  var handleCilck_delete = document.querySelectorAll(".xoa");
  var handleClick_update = document.querySelectorAll(".sua");




  // delete
  handleCilck_delete.forEach((i) => {

    i.onclick = (e) => {

      var obj = {
        title: e.target.title,
        content: e.target.content,
      };
      const api = new http(`http://localhost:3000/Blog/${e.target.id}?`, obj);

      api.delete(e.target.id);
    };
  });





  // update
  handleClick_update.forEach((i) => {
    i.onclick = (e) => {
      e.preventDefault();

      creat.style.display="none";
      update__btn.style.display="inline-block";
      var obj = {
        title: e.target.title,
        content: e.target.content,
      };

      const api = new http(`http://localhost:3000/Blog/${e.target.id}?`,obj);    
      api.get((item) => {
        title.value = item.title;
        content.value = item.content;

        update__btn.addEventListener("click", (event) => {
          event.preventDefault();
          var article = {
            title: title.value,
            createdAt: date.toLocaleString(),
            content: content.value,
          };
          api.update(e.target.id,article)
        });


      });
    };
  });
}

export default render;
