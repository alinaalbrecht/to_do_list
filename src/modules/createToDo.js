/* eslint-disable import/prefer-default-export */
import {
  renderToDoList,
  clearInputs,
  totalToDos,
  renderCompletedList,
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

const toDoListArray = JSON.parse(localStorage.getItem('toDoListArray') || '[]');

const completedArray = JSON.parse(
  localStorage.getItem('completedArray') || '[]'
);

(function () {
  renderToDoList(toDoListArray);
  totalToDos(toDoListArray);
  renderCompletedList(completedArray);
})();

let taskName = document.querySelector('.add-todo__task-name');
taskName.addEventListener('keypress', createToDo);

let toDoInput = document.querySelector('.main-content__add-todo');
toDoInput.addEventListener('keypress', createToDo);

function createToDo(e) {
  let toDoName = taskName.value;
  let dueDate = document.querySelector('.add-todo__due-date');

  if (e.key === 'Enter' && toDoName !== '') {
    console.log('createToDo');
    let newToDo = new ToDoItem();
    newToDo.name = toDoName;
    newToDo.dueDate = dueDate.value;
    addToList(newToDo, toDoListArray);
    checkDueDate();
    clearInputs(taskName);
    clearInputs(dueDate);
  }
}

function saveToDoList() {
  localStorage.setItem('toDoListArray', JSON.stringify(toDoListArray));
}

function saveCompletedList() {
  localStorage.setItem('completedArray', JSON.stringify(completedArray));
}

function addToList(item, listArray) {
  listArray.push(item);
  renderToDoList(listArray);
  renderCompletedList(listArray);
  totalToDos(listArray);
  saveToDoList();
  saveCompletedList();
}

let activeCheckboxes = document.querySelector('.main-content__to-do-list');
activeCheckboxes.addEventListener('click', completeToDo);

function completeToDo(e) {
  if (e.target.type !== 'checkbox') return;
  // eslint-disable-next-line radix
  let index = parseInt(e.target.dataset.index);
  let completedToDo = toDoListArray.splice(index, 1);
  completedToDo = completedToDo[0];
  console.log(completedToDo);
  addToList(completedToDo, completedArray);
}

function checkDueDate() {
  const date = new Date();

  const today = `${date.getFullYear()}${date.getMonth()}${date.getDate()}`;

  for (let i = 0; i < toDoListArray.length; i++) {
    const dueDate = new Date(toDoListArray[i].dueDate);
    if (
      `${dueDate.getFullYear()}${dueDate.getMonth()}${dueDate.getDate()}` <
      today
    ) {
      toDoListArray[i].overdue = true;
    } else {
      toDoListArray[i].overdue = false;
    }
  }
  renderToDoList(toDoListArray);
}
export {
  toDoListArray,
  createToDo,
  addToList,
  completeToDo,
  checkDueDate,
  saveToDoList,
  saveCompletedList,
};
