"use strict";

const newListForm = document.querySelector("#newListForm");
const newListInput = document.querySelector("#newListInput");
const newListUl = document.querySelector("#newList");

const form = document.querySelector("#form");
const input = document.querySelector("#input");
const ul = document.querySelector("#list");

// || JSON LOCAL DATA

let listArray = [];
let taskArray = [];

if (localStorage.getItem("mylist") === null) {
  localStorage.setItem("mylist", JSON.stringify(taskArray));
} else {
  taskArray = JSON.parse(localStorage.getItem("mylist"));
  for (let i = 0; i < taskArray.length; i++) {
    task(taskArray[i]);
  }
}

// || ADDING A NEW LIST

newListForm.addEventListener("submit", function (e) {
  e.preventDefault();
  const regex = / {2,}/g;
  const value = newListInput.value.replaceAll(regex, " ").trim();
  if (value.length !== 0) {
    listArray.push(value);
    localStorage.setItem("mylist", JSON.stringify(listArray));
    newList(value);
  } else {
    alert("Please enter your new list name.");
  }
  newListInput.value = "";
});

// || ADDING TASKS
form.addEventListener("submit", function (e) {
  e.preventDefault();
  const regex = / {2,}/g;
  const value = input.value.replaceAll(regex, " ").trim();
  if (value.length !== 0) {
    taskArray.push(value);
    localStorage.setItem("mylist", JSON.stringify(taskArray));
    task(value);
  } else {
    alert("Please enter a task.");
  }
  input.value = "";
});

function newList(input) {
  // create new list-item
  const li = document.createElement("li");
  li.classList.add("listTitle", "center", "ul-list-name");
  li.innerText = input;
  newListUl.append(li);
}

function task(input) {
  // create new list-item
  const li = document.createElement("li");
  li.classList.add("list-item");

  // create a new input for list item
  const li_Input = document.createElement("input");
  li_Input.classList.add("li-Input");
  li_Input.type = "text";
  li_Input.value = input;
  li_Input.setAttribute("readonly", "readonly");

  // create container for buttons
  const btnContainer = document.createElement("div");
  btnContainer.classList.add("btnContainer");

  // create edit button
  const editBtn = document.createElement("button");
  editBtn.setAttribute("id", "edit");
  editBtn.classList.add("editBtn");
  editBtn.innerText = "Edit";
  // function of edit button.
  editBtn.addEventListener("click", function () {
    if (editBtn.innerText === "Edit") {
      li_Input.removeAttribute("readonly");
      li_Input.classList.add("edit-li-Input-Color");
      li_Input.focus();
      editBtn.innerText = "Save";
    } else {
      li_Input.setAttribute("readonly", "readonly");
      li_Input.classList.remove("edit-li-Input-Color");
      editBtn.innerText = "Edit";
    }
  });

  // create delete button
  const deleteBtn = document.createElement("button");
  deleteBtn.setAttribute("id", "delete");
  deleteBtn.classList.add("deleteBtn");
  deleteBtn.innerText = "Delete";
  // function of delete button. Plays animation, waits 2 seconds, then deletes the grandparent element on click
  deleteBtn.addEventListener("click", function () {
    li.classList.add("deleteBtn-Animation");
    for (let i = 0; i < taskArray.length; i++) {
      if (taskArray[i] === input) {
        taskArray.splice(i, 1);
      }
    }
    localStorage.setItem("mylist", JSON.stringify(taskArray));
    setTimeout(function () {
      deleteBtn.parentElement.parentElement.remove();
    }, 1000);
  });

  // appends edit, complete, & delete button to btnContainer, appends li-input & btnContainer to list-item, then appends list-item to unordered list
  btnContainer.append(editBtn);
  btnContainer.append(deleteBtn);
  li.append(li_Input);
  li.append(btnContainer);
  ul.append(li);
}

// hamburger buttn animation
const test = document.querySelector("#navBtn");
const listNames = document.querySelector("#list-names");

test.addEventListener("click", function () {
  test.classList.toggle("change");
  if (test.classList.contains("change")) {
    listNames.style.visibility = "visible";
  } else {
    listNames.style.visibility = "hidden";
  }
});
