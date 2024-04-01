const inputItem = document.querySelector("input");
const btnAdd = document.querySelector("#addItem");
const btnRemove = document.getElementById("deleteItem");
const btnRetrieve = document.querySelector("#getItem");
const errorMessage = document.querySelector("#errorMessage");
const displayContainer = document.querySelector("#displayContainer");

document.addEventListener("click", async (event) => {
    if (event.target && event.target.id === "addItem") {
        addItem();
    }

    if (event.target && event.target.id === "getItem") {
        await getItem();
    }

    if (event.target && event.target.id === "deleteItem") {
        await removeItem();
    }
});

let items = [];

async function addItem() {
    const newItem = inputItem.value.trim();

    if (newItem === "") {
        errorMessage.textContent = "Please enter a valid item";
        return;
    }

    if (items.includes(newItem)) {
        errorMessage.textContent = "Item already in the list";
        return;
    }

    let li = createListItem(newItem);
    displayContainer.appendChild(li);
    items.push(newItem);
    inputItem.value = "";

    showSuccess("Item added successfully.");

    await storeData();
}

async function getItem() {
    const storedItems = localStorage.getItem("ShoppingList");
    const storedItemsArray = JSON.parse(storedItems);

    if (storedItemsArray) {
        let alreadyRetrievedItems = true;
        storedItemsArray.forEach(item => {
            if (!items.includes(item)) {
                alreadyRetrievedItems = false;
                const li = createListItem(item);
                displayContainer.appendChild(li);
                items.push(item);
            }
        });

        if (alreadyRetrievedItems) {
            showSuccess("Items already retrieved.");
        } else {
            showSuccess("Items retrieved successfully.");
        }
    }

    if (!storedItemsArray) {
        showError("There are no items to retrieve");
    }
}

async function removeItem() {
    const storedItems = localStorage.getItem("ShoppingList");
    const storedItemsArray = JSON.parse(storedItems);

    if (storedItemsArray) {
        localStorage.removeItem("ShoppingList");
        errorMessage.textContent = "Items deleted successfully."
    } else {
        showError("There are no items to delete.")
    }
}

function createListItem(item) {
    const li = document.createElement("li");
    li.classList.add("d-flex", "border", "justify-content-between", "align-items-center", "p-2", "my-2");
    li.innerHTML = 
        `<div class="d-flex">
            <input type="checkbox" class="mx-2 cursor-pointer">
            <span class="fs-13">${item}</span>
        </div>`;
    return li; 
}

function showSuccess(message) {
    errorMessage.textContent = message;
}

function showError(message) {
    errorMessage.textContent = message;
}

async function storeData() {
    await localStorage.setItem("ShoppingList", JSON.stringify(items));
}
