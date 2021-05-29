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
  activateFolder,
  currentFolder,
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
  renderFolderStyling,
} from './modules/renderToDos';
import '@fortawesome/fontawesome-free/js/all.js';
