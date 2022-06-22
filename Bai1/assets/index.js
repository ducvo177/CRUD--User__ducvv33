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

const inputToObject = () => {
  let user = {
    username: userInput.value,
    fullname: fullnameInput.value,
    email: emailInput.value,
    birthday: birthdayInput.value,
  };
  return user;
};
const tableToObject = (td) => {
  let user = {
    username: td[0].innerHTML,
    fullname: td[1].innerHTML,
    email: td[2].innerHTML,
    birthday: td[3].innerHTML,
  };
  return user;
};
const postUser = () => {
  axios.post(urlApi, inputToObject());
  
};

const clearInput = () => {
  allInput.forEach((element) => {
    element.value = "";
  });
};
const validateEmpty=()=> {
  let check=0;
  allInput.forEach((element) => {
    if(element.value === ""){
      element.classList.toggle("is-invalid")
     check+=1;
    }
  })
  return check;
}
const validateEmail=(email)=> {
  let check=0;
  if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email))
  {
    console.log("good email")
  }else{
    check+=1;
  }
   
   return check;
  
}
const validateForm=()=> {
  if(validateEmpty()==0 && validateEmail(emailInput.value)==0){
    postUser()
    console.log("dcm")
  }


}
const App = () => {
  //Render Table
  axios.get(urlApi).then((resp) => {
    tableContent.innerHTML = "";
    resp.data.forEach((element) => {
      html = `
      <tr id="user--tr">
        <th scope="row">${element.id}</th>
        <td index="1">${element.username}</td>
        <td index="2">${element.fullname}</td>
        <td index="3">${element.email}</td>
        <td index="4">${element.birthday}</td>
        <td ><button class="btn btn-primary m-1 btn--edit"  index="${element.id}">Edit</button></td>    
        <td ><button class="btn btn-danger m-1 btn--delete"  index="${element.id}">Delete</button> </td>
      </tr>
      `;
      tableContent.innerHTML += html;
    });
    //Handle edit and delete buttons
    let editBtns = $$(".btn--edit"),
      deleteBtns = $$(".btn--delete");
    tr = $("#user--tr");
    td = tr.getElementsByTagName("td");
    for (let i = 0; i < td.length; i++) {
      td[i].setAttribute("contenteditable", "true");
    }
    for (const btn of editBtns) {
      btn.onclick = function () {
        axios.patch(
          urlApi + `/${btn.getAttribute("index")}`,
          tableToObject(td)
        );  
      };
    }
    for (const btn of deleteBtns) {
      btn.onclick = function () {
        axios.delete(urlApi + `/${btn.getAttribute("index")}`);
      };
    }
  });
};
save.addEventListener("click", validateForm);
reset.addEventListener("click", clearInput);
App();
