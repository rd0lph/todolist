window.addEventListener("beforeunload", () => {
  sessionStorage.setItem("scrollPosition", window.scrollY.toString());
});

window.addEventListener("load", () => {
  const scrollPosition = sessionStorage.getItem("scrollPosition");
  if (scrollPosition !== null) {
    window.scrollTo(0, parseInt(scrollPosition, 10));
    sessionStorage.removeItem("scrollPosition");
  }
});

console.log("start");

var check = localStorage.getItem("times");
if (check === null) {
  localStorage.setItem("times", 0);
}
document.getElementById("forms").addEventListener("submit", function () {
  const title = document.getElementById("title").value,
    desc = document.getElementById("desc").value,
    date = document.getElementById("date").value;

  var times = localStorage.getItem("times");

  var time = parseInt(times, 10);
  time += 1;
  localStorage.setItem("times", time);
  var msg = "This is your " + time + "x time using this app";
  console.log(msg);

  var formsData = [title, desc, date];
  var dataJSON = JSON.stringify(formsData);
  keyname = "taskManager_" + title;
  localStorage.setItem(keyname, dataJSON);

  console.log("end");
});

const tasksList = document.getElementById("tasks");
var tasks = Object.keys(localStorage);
const keyword = "taskManager_";
const filter = tasks.filter((tasks) => tasks.includes(keyword));

function findId(element) {
  while (element) {
    if (element.id) {
      return element.id;
    }
    element = element.parentElement;
  }
  return null;
}

filter.forEach((key) => {
  const storedTasks = localStorage.getItem(key);
  const taskArrays = JSON.parse(storedTasks);
  const div = document.createElement("div");
  const div1 = document.createElement("div");
  const div2 = document.createElement("div");
  const div3 = document.createElement("div");
  const editButton = document.createElement("button");
  const editIco =
    '<svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"><path d="M160-400v-80h280v80H160Zm0-160v-80h440v80H160Zm0-160v-80h440v80H160Zm360 560v-123l221-220q9-9 20-13t22-4q12 0 23 4.5t20 13.5l37 37q8 9 12.5 20t4.5 22q0 11-4 22.5T863-380L643-160H520Zm300-263-37-37 37 37ZM580-220h38l121-122-18-19-19-18-122 121v38Zm141-141-19-18 37 37-18-19Z"/></svg>';
  const deleteButton = document.createElement("button");
  const deleteIco =
    '<svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"><path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z"/></svg>';

  div.classList.add(
    "p-2",
    "border-2",
    "border-solid",
    "border-slate-950/55",
    "shadow-[rgba(0,_0,_0,_0.24)_0_1rem_1rem]",
    "rounded-md",
    "my-5",
    "flex",
    "flex-col",
    "text-xl"
  );
  div.innerHTML = taskArrays[0];
  div.id = key;

  div1.classList.add(
    "p-2",
    "border-2",
    "border-solid",
    "border-slate-950/55",
    "rounded-md",
    "my-1",
    "flex",
    "flex-col",
    "text-base"
  );
  div1.innerHTML = taskArrays[1];

  div2.classList.add(
    "p-2",
    "border-2",
    "border-solid",
    "border-slate-950/55",
    "rounded-md",
    "my-1",
    "flex",
    "flex-col",
    "text-base"
  );
  div2.innerHTML = taskArrays[2];

  div3.classList.add("flex", "flex-row", "w-[100%]", "my-2");

  editButton.classList.add(
    "mx-1",
    "p-2",
    "border-2",
    "border-solid",
    "bg-green-400",
    "items-center",
    "justify-center",
    "rounded-md",
    "editButton"
  );
  editButton.innerHTML = editIco;

  deleteButton.classList.add(
    "mx-1",
    "p-2",
    "border-2",
    "border-solid",
    "bg-red-400",
    "items-center",
    "justify-center",
    "rounded-md",
    "deleteButton"
  );
  deleteButton.innerHTML = deleteIco;

  tasksList.appendChild(div);
  div.appendChild(div1);
  div.appendChild(div2);
  div.appendChild(div3);
  div3.appendChild(editButton);
  div3.appendChild(deleteButton);
});

document.querySelectorAll(".editButton").forEach((button) => {
  button.addEventListener("click", function () {
    const getKey = findId(button);
    const getTaskArray = localStorage.getItem(getKey);
    let getTaskArrayData = JSON.parse(getTaskArray);

    function editButton() {
      const parentDiv = document.createElement("div");
      parentDiv.id = "overlayParent";
      parentDiv.classList.add(
        "w-full",
        "h-full",
        "bg-black",
        "bg-opacity-50",
        "fixed",
        "items-center",
        "justify-center",
        "top-0"
      );

      const childDiv = document.createElement("div");
      childDiv.id = "overlayChild";
      childDiv.classList.add(
        "w-full",
        "h-full",
        "flex",
        "items-center",
        "justify-center"
      );

      const form = document.createElement("form");
      form.classList.add(
        "flex",
        "flex-col",
        "bg-white",
        "p-3",
        "w-[90vw]",
        "rounded-xl",
        "shadow-[rgba(0,_0,_0,_0.24)_0_1rem_1rem]",
        "forms"
      );

      const titleDiv = document.createElement("div");
      titleDiv.classList.add("flex", "flex-col");

      const overlayTitle = document.createElement("p");
      overlayTitle.classList.add("font-semibold", "text-3xl");
      overlayTitle.innerHTML = "Editing Task";

      const underline = document.createElement("section");
      underline.classList.add(
        "w-full",
        "border-solid",
        "border-black",
        "border-2",
        "mt-1"
      );

      function editingTitle() {
        const editTitle = document.createElement("input");
        editTitle.setAttribute("type", "text");
        editTitle.id = "editTitle";
        editTitle.name = "title";
        editTitle.required = true;
        editTitle.placeholder = "Enter Your Task Here . . .";
        editTitle.classList.add(
          "p-2",
          "border-b-2",
          "border-gray-500",
          "focus:outline-none",
          "w-[90%]",
          "shadow-[rgba(0,_0,_0,_0.24)_0_1rem_1rem]"
        );

        editTitle.value = getTaskArrayData[0];

        return editTitle;
      }

      function editingDesc() {
        const editDesc = document.createElement("textarea");
        editDesc.id = "editDesc";
        editDesc.name = "desc";
        editDesc.setAttribute("rows", "5");
        editDesc.setAttribute("cols", "40");
        editDesc.required = true;
        editDesc.placeholder = "Enter Your Description Here . . .";
        editDesc.classList.add(
          "p-2",
          "border-b-2",
          "border-gray-500",
          "focus:outline-none",
          "w-[90%]",
          "resize-none",
          "rounded-md",
          "shadow-[rgba(0,_0,_0,_0.24)_0_1rem_1rem]"
        );

        editDesc.value = getTaskArrayData[1];

        return editDesc;
      }

      function editingDate() {
        const editDate = document.createElement("input");
        editDate.setAttribute("type", "date");
        editDate.id = "editDate";
        editDate.name = "date";
        editDate.required = true;
        editDate.classList.add(
          "p-2",
          "border-b-2",
          "border-gray-500",
          "focus:outline-none",
          "w-[90%]",
          "shadow-[rgba(0,_0,_0,_0.24)_0_1rem_1rem]"
        );

        editDate.value = getTaskArrayData[2];

        return editDate;
      }

      function cancel() {
        parentDiv.style.display = "none";
      }

      const buttonDiv = document.createElement("div");
      buttonDiv.classList.add("flex", "flex-row", "w-full", "justify-between");

      const editDone = document.createElement("button");
      editDone.id = "doneEditing";
      editDone.innerText = "Save";
      editDone.type = "button";
      editDone.classList.add(
        "bg-gradient-to-r",
        "from-blue-600",
        "to-green-400",
        "text-white",
        "font-bold",
        "rounded-md",
        "w-[48%]"
      );

      const editCancel = document.createElement("button");
      editCancel.id = "cancelEditing";
      editCancel.innerText = "cancel";
      editCancel.type = "button";
      editCancel.classList.add(
        "bg-gradient-to-r",
        "from-red-600",
        "to-orange-400",
        "text-white",
        "font-bold",
        "rounded-md",
        "w-[48%]"
      );

      document.body.appendChild(parentDiv);
      parentDiv.appendChild(childDiv);
      childDiv.appendChild(form);
      form.appendChild(titleDiv);
      titleDiv.appendChild(overlayTitle);
      titleDiv.appendChild(underline);

      for (let i = 0; i < 3; i++) {
        const divs = document.createElement("div");
        divs.classList.add("flex", "flex-col", "p-2", "items-start");

        const labels = document.createElement("label");
        labels.classList.add("font-semibold");
        const titles = ["Task Title", "Task Description", "Task Date"];
        labels.innerText = titles[i];

        const inputsElm = [editingTitle, editingDesc, editingDate];
        const elms = inputsElm[i]();

        const divider = document.createElement("section");
        divider.classList.add(
          "border-b-4",
          "border-[#e7e7e7]",
          "w-full",
          "my-6",
          "rounded-md"
        );

        form.appendChild(divs);
        divs.appendChild(labels);
        labels.appendChild(elms);
        form.appendChild(divider);
      }

      form.appendChild(buttonDiv);
      buttonDiv.appendChild(editCancel);
      buttonDiv.appendChild(editDone);

      document.querySelectorAll("#overlayChild").forEach((div) => {
        div.addEventListener("click", function (event) {
          if (event.target === this) {
            cancel();
          }
        });
      });

      document.querySelectorAll("#cancelEditing").forEach((button) => {
        button.addEventListener("click", function () {
          cancel();
        });
      });

      document.querySelectorAll("#doneEditing").forEach((button) => {
        button.addEventListener("click", function () {
          const title = document.getElementById("editTitle").value;
          const desc = document.getElementById("editDesc").value;
          const date = document.getElementById("editDate").value;

          const editted = [title, desc, date];
          const dataJSON = JSON.stringify(editted);
          localStorage.setItem(getKey, dataJSON);
          cancel();
          location.reload();
        });
      });
    }

    editButton();
    
  });
});

document.querySelectorAll(".deleteButton").forEach((button) =>  {
  button.addEventListener("click", function(){
    const getKey = findId(button);
    
    function deleteButton(){
      localStorage.removeItem(getKey);
      location.reload();
    }

    deleteButton();
  })
})
