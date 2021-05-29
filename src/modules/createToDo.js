/* eslint-disable import/prefer-default-export */
import {
  renderToDoList,
  clearInputs,
  totalToDos,
  renderCompletedList,
  renderFolderList,
  showFolderInput,
  renderFolderStyling,
} from './renderToDos';

let currentFolder = 'inbox';

class ToDoItem {
  constructor(name, folder, id, dueDate) {
    this.name = name;
    this.folder = folder;
    this.id = id;
    this.dueDate = dueDate;
    /* this.priority = priority; */
    /* this.delete = "&#10007; remove"; */
  }
}

const folderArray = JSON.parse(
  localStorage.getItem('folderArray') || '["inbox"]'
);

let toDoListArray = JSON.parse(localStorage.getItem('toDoListArray') || '[]');

const completedArray = JSON.parse(
  localStorage.getItem('completedArray') || '[]'
);

(function () {
  renderToDoList(toDoListArray, currentFolder);
  renderCompletedList(completedArray, currentFolder);
  checkDueDate();
  renderFolderList(folderArray);
  renderFolderStyling(currentFolder, document.querySelector('.folder__name'));
  /* console.log(toDoListArray); */
})();

let taskName = document.querySelector('.add-todo__task-name');
taskName.addEventListener('keypress', createToDo);

let toDoInput = document.querySelector('.main-content__add-todo');
toDoInput.addEventListener('keypress', createToDo);

function createToDo(e) {
  let toDoName = taskName.value;
  let dueDate = document.querySelector('.add-todo__due-date');

  if (e.key === 'Enter' && toDoName !== '') {
    let newToDo = new ToDoItem();
    newToDo.name = toDoName;
    newToDo.folder = currentFolder;

    if (dueDate.value !== '') {
      newToDo.dueDate = dueDate.value;
    } else {
      newToDo.dueDate = 'no due date';
    }

    updateToDoList(newToDo);
    clearInputs(taskName);
    clearInputs(dueDate);
  }
}

let folderInput = document.querySelector('.folder-sidebar__folder-list');
folderInput.addEventListener('keypress', addFolder);
function addFolder(e) {
  if (!e.target.classList.contains('add-folder__input')) return;
  if (e.key === 'Enter' && e.target.value !== '') {
    let folderName = e.target.value;
    folderArray.push(folderName);
    saveFolderList();
    renderFolderList(folderArray);
  }
}

const folders = document.querySelector('.folder-sidebar__folder-list');
folders.addEventListener('click', activateFolder);

function activateFolder(e) {
  if (!e.target.classList.contains('folder__name')) return;
  let index = e.target.dataset.index;
  let target = e.target;
  currentFolder = folderArray[index];
  renderFolderStyling(currentFolder, target);
  renderToDoList(toDoListArray, currentFolder);
  renderCompletedList(completedArray, currentFolder);
}

function saveToDoList() {
  localStorage.setItem('toDoListArray', JSON.stringify(toDoListArray));
}

function saveCompletedList() {
  localStorage.setItem('completedArray', JSON.stringify(completedArray));
}

function saveFolderList() {
  localStorage.setItem('folderArray', JSON.stringify(folderArray));
}

function updateToDoList(item) {
  toDoListArray.push(item);
  updateIds();
  checkDueDate();

  renderToDoList(toDoListArray, currentFolder);
  saveToDoList();
}

function updateIds() {
  for (let i = 0; i < toDoListArray.length; i++) {
    toDoListArray[i].id = i;
  }
}

function updateCompleteList(item) {
  completedArray.push(item);
  renderToDoList(toDoListArray, currentFolder);

  renderCompletedList(completedArray, currentFolder);
  saveToDoList();
  saveCompletedList();
}

let activeCheckboxes = document.querySelector('.main-content__to-do-list');
activeCheckboxes.addEventListener('click', completeToDo);

function completeToDo(e) {
  if (!e.target.classList.contains('todo-item__checkbox')) return;
  let index = e.target.dataset.index;
  const folderToDoList = toDoListArray.filter(
    (item) => item.folder === currentFolder
  );
  let completedToDo = folderToDoList[index];

  let toDoId = completedToDo.id;

  let taskPosition = toDoListArray.map((item) => item.id).indexOf(toDoId);
  let objectFound = toDoListArray[taskPosition];
  toDoListArray.splice(taskPosition, 1);

  updateCompleteList(completedToDo);
  updateIds();
}

function checkDueDate() {
  const date = new Date();
  const today = date.getFullYear() + date.getMonth() * 100 + date.getDate();

  for (let i = 0; i < toDoListArray.length; i++) {
    const dueDate = new Date(toDoListArray[i].dueDate);

    const compareDueDate =
      dueDate.getFullYear() + dueDate.getMonth() * 100 + dueDate.getDate();

    if (compareDueDate < today) {
      toDoListArray[i].overdue = true;
    } else if (compareDueDate >= today || !compareDueDate) {
      toDoListArray[i].overdue = false;
    } else {
      console.log('none of the above');
    }
  }
  renderToDoList(toDoListArray, currentFolder);
}

const newDueDate = document.querySelectorAll('.main-content__to-do-list');
newDueDate.forEach((picker) =>
  picker.addEventListener('change', changeDueDate)
);

function changeDueDate(e) {
  if (!e.target.classList.contains('todo-item__due-date--picker')) return;
  const index = e.target.dataset.index;
  const value = e.target.value;
  const folderToDoList = toDoListArray.filter(
    (item) => item.folder === currentFolder
  );
  let changedDateTask = folderToDoList[index];
  let toDoId = changedDateTask.id;

  let taskPosition = toDoListArray.map((item) => item.id).indexOf(toDoId);
  toDoListArray[taskPosition].dueDate = value;
}

export {
  toDoListArray,
  folderArray,
  createToDo,
  updateToDoList,
  updateCompleteList,
  completeToDo,
  checkDueDate,
  saveToDoList,
  saveCompletedList,
  changeDueDate,
  addFolder,
  activateFolder,
  updateIds,
  currentFolder,
};
