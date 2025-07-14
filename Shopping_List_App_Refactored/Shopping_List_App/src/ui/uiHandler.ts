// src/ui/uiHandler.ts
import { ShoppingList } from "../services/shoppingList";
import type { Item } from "../services/shoppingList";

import { StorageService } from "../services/storageService";
import { ValidationService } from "../services/validationService";
import { getElementByIdOrThrow } from "../utils/utils";
import { Result } from "../utils/result";

export class UIHandler {
  private shoppingList!: ShoppingList;
  private storageService!: StorageService;
  private validationService!: ValidationService;
  private nextId!: number;

  private itemNameInput!: HTMLInputElement;
  private addItemBtn!: HTMLButtonElement;
  private shoppingListContainer!: HTMLUListElement;
  private errorMessage!: HTMLDivElement;

  constructor(
    shoppingList: ShoppingList,
    storageService: StorageService,
    validationService: ValidationService
  ) {
    this.init(shoppingList, storageService, validationService);
  }

  private init(
    shoppingList: ShoppingList,
    storageService: StorageService,
    validationService: ValidationService
  ) {
    // Initialize services
    this.shoppingList = shoppingList;
    this.storageService = storageService;
    this.validationService = validationService;
    this.nextId = 1;

    // Initialize DOM elements
    this.itemNameInput = getElementByIdOrThrow<HTMLInputElement>("itemName");
    this.addItemBtn = getElementByIdOrThrow<HTMLButtonElement>("addItemBtn");
    this.shoppingListContainer = getElementByIdOrThrow<HTMLUListElement>("shoppingList");
    this.errorMessage = getElementByIdOrThrow<HTMLDivElement>("errorMessage");

    // Load existing items from storage
    this.storageService.load("shoppingList")
      .map(savedItems => {
        this.shoppingList = new ShoppingList(savedItems);
        if (savedItems.length > 0) {
          this.nextId = Math.max(...savedItems.map(item => item.id)) + 1;
        }
      })
      .map(() => this.renderList())
      .mapErr(err => {
        console.error("Load error:", err);
      });

    // Set up event listeners
    this.addItemBtn.addEventListener("click", () => this.handleAddItem());
  }

  private handleAddItem() {
    const inputName = this.itemNameInput.value;

    this.validationService.validateInput(inputName)
      .map(validInput => {
        const newItem: Item = {
          id: this.nextId++,
          name: validInput,
          Bought: false,
        };

        this.shoppingList.addItem(newItem);
        return this.shoppingList.getItems();
      })
      .map(updatedItems =>
        this.storageService.save("shoppingList", updatedItems)
      )
      .map(() => {
        this.itemNameInput.value = "";
        this.errorMessage.textContent = "";
        this.renderList();
      })
      .mapErr(err => {
        this.errorMessage.textContent = err;
      });
  }

  private renderList() {
    this.shoppingListContainer.innerHTML = "";

    this.shoppingList.getItems().forEach(item => {
      const li = document.createElement("li");

      const checkbox = document.createElement("input");
      checkbox.type = "checkbox";
      checkbox.checked = item.Bought;
      checkbox.addEventListener("change", () => {
        this.shoppingList.toggleBought(item.id);
        this.storageService.save("shoppingList", this.shoppingList.getItems())
          .map(() => this.renderList())
          .mapErr(err => {
            console.error("Save error:", err);
          });
      });

      const span = document.createElement("span");
      span.textContent = item.name;

      const removeBtn = document.createElement("button");
      removeBtn.textContent = "Remove";
      removeBtn.addEventListener("click", () => {
        this.shoppingList.removeItem(item.id);
        this.storageService.save("shoppingList", this.shoppingList.getItems())
          .map(() => this.renderList())
          .mapErr(err => {
            console.error("Save error:", err);
          });
      });

      li.appendChild(checkbox);
      li.appendChild(span);
      li.appendChild(removeBtn);

      this.shoppingListContainer.appendChild(li);
    });
  }
}
