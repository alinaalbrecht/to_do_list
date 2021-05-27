/* eslint-disable import/prefer-default-export */
import {
  renderToDoList,
  clearInputs,
  totalToDos,
  renderCompletedList,
  renderFolderList,
  showFolderInput,
} from './renderToDos';

class ToDoItem {
  constructor(name, dueDate) {
    this.name = name;

    /*   this.uniqueId = uniqueId; */
    /* this.amount = amount; */
    this.dueDate = dueDate;
    /* this.priority = priority; */
    /* this.delete = "&#10007; remove"; */
  }
}

const folderArray = JSON.parse(
  localStorage.getItem('folderArray') || '["inbox"]'
);

const toDoListArray = JSON.parse(localStorage.getItem('toDoListArray') || '[]');

const completedArray = JSON.parse(
  localStorage.getItem('completedArray') || '[]'
);

(function () {
  renderToDoList(toDoListArray);
  totalToDos(toDoListArray);
  renderCompletedList(completedArray);
  checkDueDate();
  renderFolderList(folderArray);
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
  checkDueDate();
  totalToDos(toDoListArray);
  renderToDoList(toDoListArray);
  saveToDoList();
}

function updateCompleteList(item) {
  completedArray.push(item);
  renderToDoList(toDoListArray);
  totalToDos(toDoListArray);
  renderCompletedList(completedArray);
  saveToDoList();
  saveCompletedList();
}

let activeCheckboxes = document.querySelector('.main-content__to-do-list');
activeCheckboxes.addEventListener('click', completeToDo);

function completeToDo(e) {
  if (!e.target.classList.contains('todo-item__checkbox')) return;
  // eslint-disable-next-line radix
  let index = parseInt(e.target.dataset.index);
  let completedToDo = toDoListArray.splice(index, 1);
  completedToDo = completedToDo[0];

  updateCompleteList(completedToDo);
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
  renderToDoList(toDoListArray);
}

const newDueDate = document.querySelectorAll('.main-content__to-do-list');
newDueDate.forEach((picker) =>
  picker.addEventListener('change', changeDueDate)
);

function changeDueDate(e) {
  if (e.target.classList.contains('todo-item__due-date--picker')) {
    const index = e.target.dataset.index;
    const value = e.target.value;
    toDoListArray[index].dueDate = value;
  }
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
};
