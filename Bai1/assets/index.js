const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);
const emailInput = $("#emailInput"),
  userInput = $("#usernameInput"),
  fullnameInput = $("#fullnameInput"),
  birthdayInput = $("#birthdayInput"),
  allInput = $$("input"),
  save = $("#save"),
  reset = $("#reset"),
  tableContent = $("#table");
const urlApi = "http://localhost:3000/user";

const userToObject = () => {
  var user = {
    username: userInput.value,
    fullname: fullnameInput.value,
    email: emailInput.value,
    birthday: birthdayInput.value,
  };
  return user;
};

const postUser = () => {
  axios.post(urlApi, userToObject());
};

const clearInput = () => {
  allInput.forEach((element) => {
    element.value = "";
  });
};
const App = () => {
  //Render Table
  axios.get(urlApi).then((resp) => {
    tableContent.innerHTML = "";
    resp.data.forEach((element) => {
      html = `
      <tr>
        <th scope="row">${element.id}</th>
        <td>${element.username}</td>
        <td>${element.fullname}</td>
        <td>${element.email}</td>
        <td>${element.birthday}</td>
        <td ><button class="btn btn-primary m-1 btn--edit"  index="${element.id}">Edit</button></td>    
        <td ><button class="btn btn-danger m-1 btn--delete"  index="${element.id}">Delete</button> </td>
      </tr>
      `;
      tableContent.innerHTML += html;
    });
    //Handle edit and delete buttons
    let editBtns = $$(".btn--edit"),
      deleteBtns = $$(".btn--delete");
    for (const btn of editBtns) {
      btn.onclick = function () {
        axios.patch(urlApi + `/${btn.getAttribute("index")}`, userToObject());
      };
    }
    for (const btn of deleteBtns) {
      btn.onclick = function () {
        axios.delete(urlApi + `/${btn.getAttribute("index")}`);
      };
    }
  });
};
const handleSave = () => {
  postUser();
};
App();
save.addEventListener("click", handleSave);
reset.addEventListener("click", clearInput);
