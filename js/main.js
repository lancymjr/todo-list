// enable JavaScript "strict mode"
"use strict";

// variables
const hamburgerBtn = document.querySelector("#hamburgerBtn");
const listNames = document.querySelector("#listNames");

const listsContainer = document.querySelector("#lists");
const newListForm = document.querySelector("#NewListForm");
const newListInput = document.querySelector("#NewListInput");
const deleteListBtn = document.querySelector("#deleteListBtn");

const listDisplayContainer = document.querySelector("#listDisplayContainer");
const listTitleElement = document.querySelector("#listTitle");
const tasksContainer = document.querySelector("#taskContainer");
const newTaskForm = document.querySelector("#newTaskForm");
const newTaskInput = document.querySelector("#newTaskInput");

const paragraphContainer = document.querySelector("#paragraphContainer");

const LOCAL_STORAGE_LIST_KEY = "task.lists";
const LOCAL_STORAGE_SELECTED_LIST_ID_KEY = "task.selectedListId";

// JSON variable
let lists = JSON.parse(localStorage.getItem(LOCAL_STORAGE_LIST_KEY)) || [];
let selectedListId = localStorage.getItem(LOCAL_STORAGE_SELECTED_LIST_ID_KEY);

// hides/shows create list page
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

// deletes selected list
deleteListBtn.addEventListener("click", function (e) {
  lists = lists.filter(function (list) {
    return list.id !== selectedListId;
  });
  selectedListId = null;
  saveAndRender();
});

// creates a new list
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

// creates a new task
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

// list object structure
function createList(name) {
  return {
    id: Date.now().toString(),
    name: name,
    tasks: [],
  };
}

// task object structure
function createTask(name) {
  return {
    name: name,
  };
}

function saveAndRender() {
  save();
  render();
}

// saves data to local storage.
function save() {
  localStorage.setItem(LOCAL_STORAGE_LIST_KEY, JSON.stringify(lists));
  localStorage.setItem(LOCAL_STORAGE_SELECTED_LIST_ID_KEY, selectedListId);
}

// clears listsContainer, renders listsContainer, and allows user to select specific list or shows message if none is selected
function render() {
  clearElement(listsContainer);
  renderLists();

  const selectedList = lists.find(function (list) {
    return list.id === selectedListId;
  });
  if (selectedListId === "null" || selectedListId === null) {
    listDisplayContainer.style.display = "none";
    paragraphContainer.style.display = "flex";
  } else {
    paragraphContainer.style.display = "none";
    listDisplayContainer.style.display = "block";
    listTitleElement.innerText = selectedList.name;
    clearElement(tasksContainer);
    renderTasks(selectedList);
  }
}

// functionality and look for each task (list item) in a list
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
    editBtn.classList.add("edit-btn");
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
    deleteBtn.classList.add("delete-btn");
    deleteBtn.innerText = "Delete";
    // function of delete button. Plays animation, waits 2 seconds, then deletes the grandparent element on click
    deleteBtn.addEventListener("click", function () {
      li.classList.add("delete-btn-Animation");
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

// creates list item, styles it, then appends it to the listsContainer
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

// clears list container. Removes all children from element
function clearElement(element) {
  while (element.firstChild) {
    element.removeChild(element.firstChild);
  }
}

// removes spaces from beginning & end of strings. Also it there is more than 1 space between strings then it will replace it with one space.
function formatString(string) {
  const regex = / {2,}/g;
  const formatedString = string.replaceAll(regex, " ").trim();
  return formatedString;
}

render();
