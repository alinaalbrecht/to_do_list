/* eslint-disable import/prefer-default-export */
import {
  renderToDoList,
  clearInputs,
  totalToDos,
  renderCompletedList,
} from './renderToDos';

class ToDoItem {
  constructor(name /* uniqueId */) {
    this.name = name;
    this.finished = false;
    /*   this.uniqueId = uniqueId; */
    /*     this.amount = amount;
      this.dueDate = dueDate;
      this.priority = priority;
      this.delete = "&#10007; remove"; */
  }
}
const toDoListArray = [];
const completedArray = [];
let toDoInput = document.querySelector('.main-content__add-todo');
toDoInput.addEventListener('keypress', createToDo);
function createToDo(e) {
  let toDoName = toDoInput.value;
  if (e.key === 'Enter' && toDoName !== '') {
    /*     console.log(e.key); */
    let newToDo = new ToDoItem();
    newToDo.name = toDoName;
    /*  newToDo.uniqueId = toDoListArray.length; */
    addToList(newToDo);
    clearInputs(toDoInput);
    /*     console.log(toDoName); */
  }
}

function addToList(item) {
  toDoListArray.push(item);
  /*  console.log(toDoListArray); */
  renderToDoList(toDoListArray);
  totalToDos(toDoListArray);
}
let activeCheckboxes = [...document.querySelectorAll('.todo-item__checkbox')];
activeCheckboxes.forEach((box) =>
  box.addEventListener('change', (/* completeToDo */) => console.log('check'))
);

let eventTest = document.querySelector('.main-content__to-do-list');
eventTest.addEventListener('click', completeToDo);

function completeToDo(e) {
  console.log(e);
  if (e.target.type !== 'checkbox') return;
  // eslint-disable-next-line radix
  let index = parseInt(e.target.dataset.index);
  let completedToDo = toDoListArray.splice(index, 1);
  completedArray.push(completedToDo[0]);
  renderToDoList(toDoListArray);
  renderCompletedList(completedArray);
  return toDoListArray;
}
export { toDoListArray, createToDo, addToList, completeToDo, activeCheckboxes };
