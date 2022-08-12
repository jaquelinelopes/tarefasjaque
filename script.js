const inputElement = document.querySelector(".new-task-input");
const addTaskButton = document.querySelector(".new-task-button");



const tasksContainer = document.querySelector('.tasks-container');


const validateInput = () => inputElement.value.trim().length > 0;

const handleAddTask = () => {
    const inputIsValid = validateInput();

    console.log(inputIsValid);

    if (!inputIsValid) {
        return inputElement.classList.add("error");
    }

/* filhos */
const taskItemContainer = document.createElement('div');
taskItemContainer.classList.add('task-item');

const taskContent = document.createElement('p');
taskContent.innerText = inputElement.value; 

taskContent.addEventListener('click', () => handleClick (taskContent))


/* ICONES, TEM QUE COLAR ANTES */
const deleteItem = document.createElement('i');
deleteItem.classList.add("fa");
deleteItem.classList.add("fa-trash-can");

deleteItem.addEventListener('click', () => handleDeleteClick (taskItemContainer, taskContent))

taskItemContainer.appendChild(taskContent);
taskItemContainer.appendChild(deleteItem);

tasksContainer.appendChild(taskItemContainer);

inputElement.value = "";

updateLocalStorage() /* localstore */


};


const handleClick = (taskContent) => {
    const tasks = tasksContainer.childNodes;

    for(const task  of tasks) {
        const currentTaskIsBeingClicked = task.firstChild.isSameNode(taskContent)
        if (currentTaskIsBeingClicked) {
            task.firstChild.classList.toggle("completed"); /* riscado */
        }
    }

    updateLocalStorage()
};



const handleDeleteClick = (taskItemContainer,taskContent ) => {
    const tasks = tasksContainer.childNodes;

    for (const task of tasks) {
        const currentTaskIsBeingClicked = task.firstChild.isSameNode(taskContent);
        
        if (currentTaskIsBeingClicked) {
            taskItemContainer.remove();
        }
    }
    updateLocalStorage()
};

/* fim dos filhos */
const handleInputChange = () => {
    const inputIsValid = validateInput ();

    if (inputIsValid){
        return inputElement.classList.remove("error");
    }
};

/* localstore */
const updateLocalStorage = () => {
    const tasks = tasksContainer.childNodes;
    
    const localstoreTasks = [...tasks].map((task) => {
        const content = task.firstChild;
        const isCompleted = content.classList.contains('completed');

        return { description: content.innerText, isCompleted };
    });

    localStorage.setItem("tasks", JSON.stringify(localstoreTasks));

};
    const refreshTasksUsingLocalStorage = () => {
        const tasksFromLocalStorage = JSON.parse(localStorage.getItem('tasks'))
        if (!tasksFromLocalStorage) return;

        for (const task of tasksFromLocalStorage) {
            const taskItemContainer = document.createElement('div');
            taskItemContainer.classList.add('task-item');
            
            const taskContent = document.createElement('p');
            taskContent.innerText = task.description; 
            
            if (task.isCompleted) {
              taskContent.classList.add("completed");
            }
            
            taskContent.addEventListener('click', () => handleClick (taskContent))
            
            
            /* ICONES, TEM QUE COLAR ANTES */
            const deleteItem = document.createElement('i');
            deleteItem.classList.add("fa");
            deleteItem.classList.add("fa-trash-can");
            
            deleteItem.addEventListener('click', () => handleDeleteClick (taskItemContainer, taskContent))
            
            taskItemContainer.appendChild(taskContent);
            taskItemContainer.appendChild(deleteItem);
            
            tasksContainer.appendChild(taskItemContainer);
            
        }
};

/* localstore */
refreshTasksUsingLocalStorage();

addTaskButton.addEventListener("click", () => handleAddTask());

inputElement.addEventListener("change", () => handleInputChange ()); 
