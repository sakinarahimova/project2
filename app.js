let arr = [];
let inp = document.querySelector(".input-bar input");
let rectangle = document.querySelector(".rectangle");
let addIcon = document.querySelector(".add-icon");
let taskList = document.createElement("div");
rectangle.insertBefore(taskList, addIcon);
taskList.classList.add("task-list");
let addTextSign = document.querySelector(".add-text");
let arrowIcon = document.querySelector(".arrow-icon img");
let isDown = true;
arrowIcon.src = "./icons/arrow-icon-down.svg";

arrowIcon.addEventListener("mouseover", () => {
    isDown ? arrowIcon.src = "./icons/arrow-icon-down-black.svg" : arrowIcon.src = "./icons/arrow-icon-up-black.svg";
});
arrowIcon.addEventListener("mouseout", () => {
    isDown ? arrowIcon.src = "./icons/arrow-icon-down.svg" : arrowIcon.src = "./icons/arrow-icon-up.svg";
});

let removeIcon = document.querySelector(".remove-icon img");
removeIcon.addEventListener("mouseover", () => {
    isDown ? removeIcon.src = "./icons/delete-icon-purple.svg" : removeIcon.src = "./icons/delete-icon-grey.svg";
});
removeIcon.addEventListener("mouseout", () => {
    isDown ? removeIcon.src = "./icons/delete-icon-grey.svg" : removeIcon.src = "./icons/delete-icon-purple.svg";
});
removeIcon.addEventListener("click", () => {
    inp.value = "";
});

function createTaskList(item, index) {
    // inp.parentElement.classList.add("task-input-hidden");
    taskList.classList.add("task-list-hidden");
    rectangle.classList.add("task-rectangle");

    let taskItem = document.createElement('div');
    taskItem.classList.add("task-item");

    let taskText = document.createElement("p");
    taskText.textContent = `${index + 1}.${item}`;
    taskText.classList.add("task-text");

    let deleteIcon = document.createElement("div");
    let deleteIconImg = document.createElement("img");
    deleteIconImg.src = "./icons/delete-icon-grey.svg";
    deleteIconImg.classList.add("delete-icon-img");
    deleteIcon.appendChild(deleteIconImg);

    taskItem.appendChild(taskText);
    taskItem.appendChild(deleteIcon);
    taskList.appendChild(taskItem);

    deleteIcon.addEventListener('click', () => {
        taskList.removeChild(taskItem);
        arr = arr.filter(task => task !== item);
        if (taskList.children.length === 0) {
            inp.parentElement.classList.remove("task-input-hidden");
            taskList.classList.remove("task-list-hidden");
            rectangle.classList.remove("task-rectangle");
        }
    });

    deleteIcon.addEventListener("mouseover", () => {
        deleteIconImg.src = "./icons/delete-icon-purple.svg";
    });
    deleteIcon.addEventListener("mouseout", () => {
        deleteIconImg.src = "./icons/delete-icon-grey.svg";
    });
}

addTextSign.addEventListener("click", () => {
    if (inp.value !== "") {
        arr.push(inp.value);
        taskList.innerHTML = "";
        arr.forEach((item, index) => {
            createTaskList(item, index);
        });
        inp.value = "";
        inp.parentElement.classList.add("task-input-hidden");
    }
});

arrowIcon.addEventListener("click", () => {
    function sorting() {
        arr.forEach((item, index) => {
            createTaskList(item, index);
        });
    }

    isDown = !isDown;
    isDown ? arrowIcon.src = "./icons/arrow-icon-down-black.svg" : arrowIcon.src = "./icons/arrow-icon-up-black.svg";

    taskList.innerHTML = "";
    if (isDown) {
        arr.sort((a, b) => b.localeCompare(a));
    } else {
        arr.sort((a, b) => a.localeCompare(b));
    }
    sorting();
    // inp.parentElement.classList.remove("task-input-hidden");
});

let plusSign = document.querySelector(".plus");
plusSign.addEventListener("click", () => {
    inp.parentElement.classList.remove("task-input-hidden");
});
