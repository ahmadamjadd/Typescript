import { ShoppingList } from "./shoppingList";
import type { Item } from "./shoppingList";

const itemNameInput = document.getElementById("itemName") as HTMLInputElement;
const addItemBtn = document.getElementById("addItemBtn") as HTMLButtonElement;
const shoppingListContainer = document.getElementById("shoppingList") as HTMLUListElement;

const shoppingList = new ShoppingList();
let nextId = 1; 

shoppingList.loadFromLocalStorage();
renderList();

const savedItems = shoppingList.getItems();
if (savedItems.length > 0) {
  nextId = Math.max(...savedItems.map(item => item.id)) + 1;
}

addItemBtn.addEventListener("click", () => {
  const itemName = itemNameInput.value.trim();
  if (itemName === "") return; 

  const newItem: Item = {
    id: nextId++,
    name: itemName,
    Bought: false
  };

  shoppingList.addItem(newItem);
  itemNameInput.value = "";
  renderList();
});

function renderList() {

  shoppingListContainer.innerHTML = "";

  const items = shoppingList.getItems();
  items.forEach(item => {
    const li = document.createElement("li");


    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = item.Bought;
    checkbox.addEventListener("change", () => {
      shoppingList.toggleBought(item.id);
      renderList(); 

    });


    const span = document.createElement("span");
    span.textContent = item.name;


    const removeBtn = document.createElement("button");
    removeBtn.textContent = "Remove";
    removeBtn.addEventListener("click", () => {
      shoppingList.removeItem(item.id);
      renderList();
    });


    li.appendChild(checkbox);
    li.appendChild(span);
    li.appendChild(removeBtn);

    shoppingListContainer.appendChild(li);
  });
}

