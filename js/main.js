"use strict";

const form = document.querySelector("#form");
const task = document.querySelector("#task");
const ul = document.querySelector("#list");

form.addEventListener("submit", function (e) {
  e.preventDefault();
  addTask(task.value);
  task.value = "";
});

function addTask(task) {
  const li = document.createElement("li");
  li.innerText = task;

  const editBtn = document.createElement("button");
  editBtn.setAttribute("id", "edit");
  editBtn.innerText = "Edit";

  const deleteBtn = document.createElement("button");
  deleteBtn.setAttribute("id", "delete");
  deleteBtn.innerText = "Delete";

  li.append(editBtn);
  li.append(deleteBtn);
  ul.append(li);
}
