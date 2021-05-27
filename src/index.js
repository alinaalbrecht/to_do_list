import {
  toDoListArray,
  createToDo,
  updateToDoList,
  updateCompleteList,
  completeToDo,
  activeCheckboxes,
  checkDueDate,
  saveToDoList,
  saveCompletedList,
  changeDueDate,
  folderArray,
  addFolder,
} from './modules/createToDo';
import {
  renderToDoList,
  clearInputs,
  renderCompletedList,
  renderSavedToDoList,
  toggleDatePicker,
  getNewDateValue,
  removeDatePicker,
  renderFolderList,
  showFolderInput,
} from './modules/renderToDos';
import '@fortawesome/fontawesome-free/js/all.js';
