"use strict";

const hamburgerBtn = document.querySelector("#hamburgerBtn");
const listNames = document.querySelector("#list-names");

const listsContainer = document.querySelector("#lists");
const newListForm = document.querySelector("#NewListForm");
const newListInput = document.querySelector("#NewListInput");
const deleteListBtn = document.querySelector("#delete-list-btn");

const listDisplayContainer = document.querySelector("#list-display-container");
const listTitleElement = document.querySelector("#list-title");
const tasksContainer = document.querySelector("#task-container");
const newTaskForm = document.querySelector("#new-task-form");
const newTaskInput = document.querySelector("#new-task-input");

const LOCAL_STORAGE_LIST_KEY = "task.lists";
const LOCAL_STORAGE_SELECTED_LIST_ID_KEY = "task.selectedListId";

let lists = JSON.parse(localStorage.getItem(LOCAL_STORAGE_LIST_KEY)) || [];
let selectedListId = localStorage.getItem(LOCAL_STORAGE_SELECTED_LIST_ID_KEY);

hamburgerBtn.addEventListener("click", function () {
  hamburgerBtn.classList.toggle("change");
  if (hamburgerBtn.classList.contains("change")) {
    listNames.style.visibility = "visible";
    deleteListBtn.style.visibility = "hidden";
  } else {
    listNames.style.visibility = "hidden";
    deleteListBtn.style.visibility = "visible";
  }
});

listsContainer.addEventListener("click", function (e) {
  if (e.target.tagName.toLowerCase() === "li") {
    selectedListId = e.target.dataset.listId;
    saveAndRender();
  }
});

deleteListBtn.addEventListener("click", function (e) {
  lists = lists.filter(function (list) {
    return list.id !== selectedListId;
  });
  selectedListId = null;
  saveAndRender();
});

newListForm.addEventListener("submit", function (e) {
  e.preventDefault();
  const listName = formatString(newListInput.value);
  if (listName.length === 0) {
    alert("Please enter your new list name.");
  } else {
    const list = createList(listName);
    newListInput.value = "";
    lists.push(list);
    saveAndRender();
  }
});

newTaskForm.addEventListener("submit", function (e) {
  e.preventDefault();
  const taskName = formatString(newTaskInput.value);
  if (taskName.length === 0) {
    alert("Please enter a task.");
  } else {
    const task = createTask(taskName);
    newTaskInput.value = "";
    const selectedList = lists.find(function (list) {
      return list.id === selectedListId;
    });
    selectedList.tasks.push(task);
    saveAndRender();
  }
});

function createList(name) {
  return {
    id: Date.now().toString(),
    name: name,
    tasks: [],
  };
}

function createTask(name) {
  return {
    name: name,
  };
}

function saveAndRender() {
  save();
  render();
}

function save() {
  localStorage.setItem(LOCAL_STORAGE_LIST_KEY, JSON.stringify(lists));
  localStorage.setItem(LOCAL_STORAGE_SELECTED_LIST_ID_KEY, selectedListId);
}

function render() {
  clearElement(listsContainer);
  renderLists();

  const selectedList = lists.find(function (list) {
    return list.id === selectedListId;
  });
  if (selectedListId === null) {
    listDisplayContainer.style.display = "none";
  } else {
    listDisplayContainer.style.display = "block";
    listTitleElement.innerText = selectedList.name;
    clearElement(tasksContainer);
    renderTasks(selectedList);
  }
}

function renderTasks(selectedList) {
  selectedList.tasks.forEach(function (task) {
    // create new list-item
    const li = document.createElement("li");
    li.classList.add("list-item");

    // create a new input for list item
    const li_Input = document.createElement("input");
    li_Input.classList.add("li-Input");
    li_Input.type = "text";
    li_Input.value = task.name;
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
      for (let i = 0; i < selectedList.tasks.length; i++) {
        if (selectedList.tasks[i].name === task.name) {
          selectedList.tasks.splice(i, 1);
        }
      }
      setTimeout(function () {
        deleteBtn.parentElement.parentElement.remove();
        saveAndRender();
      }, 1000);
    });

    // appends edit, complete, & delete button to btnContainer, appends li-input & btnContainer to list-item, then appends list-item to unordered list
    btnContainer.append(editBtn);
    btnContainer.append(deleteBtn);
    li.append(li_Input);
    li.append(btnContainer);
    tasksContainer.append(li);
  });
}

function renderLists() {
  lists.forEach((list) => {
    const listElement = document.createElement("li");
    listElement.dataset.listId = list.id;
    listElement.classList.add("listTitle", "center", "ul-list-name");
    listElement.innerText = list.name;
    if (list.id === selectedListId) {
      listElement.classList.add("active-list");
    }
    listsContainer.append(listElement);
  });
}

function clearElement(element) {
  while (element.firstChild) {
    element.removeChild(element.firstChild);
  }
}

function formatString(string) {
  const regex = / {2,}/g;
  const formatedString = string.replaceAll(regex, " ").trim();
  return formatedString;
}

render();
