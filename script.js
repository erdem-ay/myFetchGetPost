// const { table } = require("console");

let fName = document.querySelector(".fname");
let lName = document.querySelector(".lname");
let age = document.querySelector(".age");
let emailInp = document.querySelector(".email");
let addBtn = document.querySelector(".button");
let updateBtn = document.querySelector(".buttonUpdate");
let tab = document.querySelector(".tab");
let elm="";
let allTodos = [];

async function getFetch() {
  const response = await fetch("http://localhost:3000/posts");
  let res = await response.json();
  allTodos = res;
  showPost(res);
}

getFetch();

async function postFetch() {
  let data = {
    firstname: fName.value,
    lastname: lName.value,
    age: age.value,
    email: emailInp.value,
  };
  const response = await fetch("http://localhost:3000/posts", {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
  });
  let res = await response.json();
  showPost(res);
}

addBtn.addEventListener("click", (event) => {
  event.preventDefault();
  postFetch();
});

const showPost = (posts) => {
  posts.forEach((element) => {
    let ekleme = "<tr>";
    ekleme +=
      "<td>" +
      element.firstname +
      "</td>" +
      "<td>" +
      element.lastname +
      "</td>" +
      "<td>" +
      element.age +
      "</td>" +
      "<td>" +
      element.email +
      "<td>" +
      "<button class='editBtn' onclick='editButton(" +
      element.id +
      ");'>" +
      "Edit" +
      "</button>" +
      "<button class='delBtn' onclick='delButton(" +
      element.id +
      ");'>" +
      "Delete" +
      "</button>";
    ekleme += "</tr>";
    tab.innerHTML += ekleme;
  });

  console.log(posts);
};

async function delButton(id) {
  const response = await fetch(`http://localhost:3000/posts/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
  });
  let res = await response.json();
}

async function editButton(id) {
  elm = allTodos.find((element) => element.id == id);
  console.log(elm);
  fName.value = elm.firstname;
  lName.value = elm.lastname;
  age.value = elm.age;
  emailInp.value = elm.email;
  addBtn.style.display = "none";
  updateBtn.style.display = "block";
}

updateBtn.onclick = async (event) => {
  event.preventDefault();
  let data = {
    firstname: fName.value,
    lastname: lName.value,
    age: age.value,
    email: emailInp.value,
  };
  console.log(data);
  const response = await fetch(`http://localhost:3000/posts/${elm.id}`, {
    method: "PUT",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
  });
  console.log(response);
  addBtn.style.display = "block";
  updateBtn.style.display = "none";
};
