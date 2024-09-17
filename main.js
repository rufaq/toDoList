
const date = new Date();
let taskList = []
if(localStorage.length != 0)
{
for(let i=0; i < localStorage.length; i++) {
    taskList.push(JSON.parse(localStorage.getItem(i)))
}
localStorage.clear()
generateTaskList()
}
function createTask(task){
    if(task) {
    let data = date.getDate() + ".0" + (date.getMonth() + 1) + " | " + date.getHours() + ":" + date.getMinutes()
    const taska = {date: data, task: task}
    taskList.push(taska)
    localStorageReload()
    generateTaskList()
    }
}
function deleteTask(index) {
    if(taskList[index]) {
        let sex = taskList[index].task
        taskList.splice(index, 1);
        let temp = []
        for(let i = 0; (i-1) < taskList.length; i++) {
            if(taskList[i] !== undefined) temp.push(taskList[i])
            }
            taskList = temp
            localStorageReload()
            console.log(`Элемент [${index}] ${sex} был удалён`)
        }
    else console.log("Ты ебобо? Введи индекс правильно!")
    generateTaskList()
}
function generateTaskList() {
    if(taskList.length !== 0)
    {
    for(taska of taskList) {
        console.log("Время создания: " + taska.date + ". Задача: " + taska.task)
    }
    localStorageReload()
}
    generateTaskHTML()
}
function replaceTask(index, newTask) {
    if(taskList[index]) {
    let data = date.getDate() + ".0" + (date.getMonth() + 1) + " | " + date.getHours() + ":" + date.getMinutes()
    const taska = {date: data, task: newTask}
    taskList[index] = taska
    localStorageReload()
    }
    else console.log("Ты ебобо? Введи индекс правильно!")
    generateTaskList()
}
function localStorageReload() {
    localStorage.clear()
    for(e of taskList) {
        localStorage.setItem(taskList.indexOf(e), JSON.stringify(e))
    }
}

function generateTaskHTML() {
    const tasksDivPointer = document.querySelector('.tasks')
    tasksDivPointer.innerHTML = '';
        if(taskList.length !== 0) {
            taskList.forEach(e => {
                const taskDiv = document.createElement('div')
                taskDiv.classList.add('task')
                tasksDivPointer.append(taskDiv)

                const dateP = document.createElement('p')
                dateP.classList.add('date')
                dateP.textContent = e.date
                taskDiv.append(dateP)

                const taskP = document.createElement('p')
                taskP.classList.add('tasktext')
                taskP.textContent = e.task
                taskDiv.append(taskP)
                taskP.addEventListener('click', () => editTaskHTML(e, redButton, taskP))

                const tempButtonsP = document.createElement('p')
                tempButtonsP.classList.add('tempbtn')
                taskDiv.append(tempButtonsP)
                
                const delButton = document.createElement('input')
                delButton.classList.add('btn', 'delbtn')
                delButton.setAttribute('value', 'Удалить')
                delButton.setAttribute('type', 'button')
                tempButtonsP.append(delButton)
                delButton.addEventListener('click', () => deleteTask(taskList.indexOf(e)))

                const redButton = document.createElement('input')
                redButton.classList.add('btn', 'redbtn')
                redButton.setAttribute('value', 'Редактировать')
                redButton.setAttribute('type', 'button')
                tempButtonsP.append(redButton)
                redButton.addEventListener('click', () => editTaskHTML(e, redButton, taskP))
            });
    }
    else tasksDivPointer.innerHTML = '';
}
function editTaskHTML(e, redButton, taskP) {    
    const saveButton = document.createElement('input')
    saveButton.classList.add('btn', 'savebtn')
    saveButton.setAttribute('value', 'Сохранить')
    saveButton.setAttribute('type', 'button')

    const editField = document.createElement('textarea')
    const taska = redButton.closest('.task')
    const taskContent = taska.querySelector('.tasktext')
    const fieldSizeH = taskContent.offsetHeight
    const fieldSizeW = taskContent.offsetWidth
    editField.style.cssText += `
        background-color: red;
        font-size: 18px;
        font-weight: 600;
        height: ${fieldSizeH}px;
        width: ${fieldSizeW}px;
        word-wrap: break-word;
        padding: 2px 6px;
    `;
    editField.value = taskP.textContent
    redButton.replaceWith(saveButton)
    taskP.replaceWith(editField)
    saveButton.addEventListener('click', () => save(e, redButton, taskP, saveButton, editField))
    editField.addEventListener('keypress', (event) => { if(event.keyCode == 13) save(e, redButton, taskP, saveButton, editField)})
    function save(e, redButton, taskP, saveButton, editField){
        saveButton.replaceWith(redButton)
        taskP.textContent = editField.value
        replaceTask(taskList.indexOf(e), taskP.textContent)
        editField.replaceWith(taskP)
    }
}

const addTaskButton = document.querySelector('.addbtn')
const taskInputText = document.querySelector('.debil')
addTaskButton.addEventListener('click', () => createTask(taskInputText.value))
taskInputText.addEventListener('keypress', (e) => { if(e.keyCode == 13) createTask(taskInputText.value)})