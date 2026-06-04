const btn = document.querySelector("#toggleMode");
const btnAll = document.querySelector("#btnAll");
const btnActive = document.querySelector("#btnActive");
const btnInactive = document.querySelector("#btnInactive");
const extensionsList = document.querySelector(".extensionsList");

let tempData = [];

//Load data on loaded page
async function loadData() {
  const response = await fetch("./data.json");
  const data = await response.json();
  tempData = data;
  fillList(data);
  showAllExtensions(tempData);
}

loadData();

//toggle view mode
btn.addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");
});

//fill extension list with data
function fillList(data) {
  let html = "";

  for (let index = 0; index < data.length; index++) {
    html += `<div class="extCard">
      <div class="extDetails">
        <img src=${data[index].logo} class="extImg">
        <div class="extText">
          <h2 class="extName">${data[index].name}</h2>
          <p class="extDescription">${data[index].description}</p>
        </div>
      </div>
      <div class="extButtons">
        <button class="btnRemove" onclick={removeExtension("${data[index].name.split(" ")[0]}")}>Remove</button>
        <div class="checkbox-wrapper">
          <input type="checkbox" class="sc-gJwTLC ikxBAC" ${data[index].isActive === true ? "checked" : null} onclick={editData("${data[index].name.split(" ")[0]}")}>
        </div>
      </div>
    </div>`;
  }

  extensionsList.innerHTML = html;
}

//Remove extension from list
function removeExtension(extName) {
  const index = tempData.findIndex(
    (data) => data.name.split(" ")[0] == extName,
  );
  tempData.splice(index, 1);
  if (btnActive.classList.contains("activeBtn")) {
    showActiveExtensions(tempData);
  } else if (btnInactive.classList.contains("activeBtn")) {
    showInactiveExtensions(tempData);
  } else {
    showAllExtensions(tempData);
  }
}

//show all extensions on list
function showAllExtensions(tempData) {
  btnAll.classList.add("activeBtn");
  btnActive.classList.remove("activeBtn");
  btnInactive.classList.remove("activeBtn");
  fillList(tempData);
}

//show only active extensions on list
function showActiveExtensions(tempData) {
  btnAll.classList.remove("activeBtn");
  btnActive.classList.add("activeBtn");
  btnInactive.classList.remove("activeBtn");
  const activeExtensions = tempData.filter((data) => data.isActive === true);
  fillList(activeExtensions);
}

//show only inactive extensions on list
function showInactiveExtensions(tempData) {
  btnAll.classList.remove("activeBtn");
  btnActive.classList.remove("activeBtn");
  btnInactive.classList.add("activeBtn");
  const inactiveExtensions = tempData.filter((data) => data.isActive === false);
  fillList(inactiveExtensions);
}

//edit data if an extension is active or not
function editData(extName) {
  const extension = tempData.find((data) => data.name.split(" ")[0] == extName);
  extension.isActive = !extension.isActive;
  if (btnActive.classList.contains("activeBtn")) {
    showActiveExtensions(tempData);
  } else if (btnInactive.classList.contains("activeBtn")) {
    showInactiveExtensions(tempData);
  }
}
