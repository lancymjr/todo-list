"use strict";

const form = document.querySelector("#form");
const input = document.querySelector("#input");
const ul = document.querySelector("#list");

form.addEventListener("submit", function (e) {
  e.preventDefault();
  if (input.value.length > 0) {
    task(input.value);
  }
  input.value = "";
});

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
    setTimeout(function () {
      deleteBtn.parentElement.parentElement.remove();
    }, 1500);
  });

  // appends edit and delete button to btnContainer, appends li-input & btnContainer to list-item, then appends list-item to unordered list
  btnContainer.append(editBtn);
  btnContainer.append(deleteBtn);
  li.append(li_Input);
  li.append(btnContainer);
  ul.append(li);
}
