// src/main.ts
import { ShoppingList } from "./services/shoppingList";
import { StorageService } from "./services/storageService";
import { ValidationService } from "./services/validationService";
import { UIHandler } from "./ui/uiHandler";

const storageService = new StorageService();
const validationService = new ValidationService();
const shoppingList = new ShoppingList();

new UIHandler(shoppingList, storageService, validationService);
