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

  // create a new input for list item
  const li_Input = document.createElement("input");
  li_Input.type = "text";
  li_Input.value = input;
  li_Input.setAttribute("readonly", "readonly");

  // create edit button
  const editBtn = document.createElement("button");
  editBtn.setAttribute("id", "edit");
  editBtn.innerText = "Edit";
  // function of edit button.
  editBtn.addEventListener("click", function () {
    if (editBtn.innerText === "Edit") {
      li_Input.removeAttribute("readonly");
      li_Input.focus();
      editBtn.innerText = "Save";
    } else {
      li_Input.setAttribute("readonly", "readonly");
      editBtn.innerText = "Edit";
    }
  });

  // create delete button
  const deleteBtn = document.createElement("button");
  deleteBtn.setAttribute("id", "delete");
  deleteBtn.innerText = "Delete";
  // function of delete button. Deletes the parent element on click
  deleteBtn.addEventListener("click", function () {
    deleteBtn.parentElement.remove();
  });

  // appends edit and delete button to list-item then appends list-item to unordered list
  li.append(li_Input);
  li.append(editBtn);
  li.append(deleteBtn);
  ul.append(li);
}
