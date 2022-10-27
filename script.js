// const { table } = require("console");

let fName = document.querySelector(".fname");
let lName = document.querySelector(".lname");
let age = document.querySelector(".age");
let emailInp = document.querySelector(".email");
let addBtn = document.querySelector(".button");
let tab = document.querySelector(".tab");

async function getFetch() {
  const response = await fetch("http://localhost:3000/posts");
  let res = await response.json();
  console.log(res);
}

getFetch();

async function postFetch() {
  let data = {
    firstname: fName.value,
    lastnme: lName.value,
    age: age.value,
    email: emailInp.value
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
  console.log(data, res);
}

addBtn.addEventListener("click", (event) => {
  event.preventDefault();
  postFetch();
});

const showPost = (posts) => {
  let ekleme = "<tr>";
  posts.forEach((element) => {
    ekleme +=
      "<td>" +
      firstname +
      "</td>" +
      "<td>" +
      lastname +
      "</td>" +
      "<td>" +
      age +
      "</td>" +
      "<td>" +
      email +
      "</td>";
  });
  console.log(posts);
  ekleme += "</tr>";
//   tab.appendChild(tr);
  tab.innerHTML = ekleme;
};
