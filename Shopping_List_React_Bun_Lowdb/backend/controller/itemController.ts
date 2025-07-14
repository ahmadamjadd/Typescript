// backend/controllers/itemController.ts
import { ShoppingListService } from "../services/storageService";
import { ValidationService } from "../services/validationService";
import { Result } from "../services/result";
import type { Item } from "../models/item";

const storage = new ShoppingListService();

export const itemController = {
  async getAllItems(): Promise<Response> {
    const result = await storage.getAllItems();
    return result.isOk()
      ? new Response(JSON.stringify(result.unwrap()), { status: 200 })
      : new Response(JSON.stringify({ error: result.error }), { status: 500 });
  },

  async addItem(data: any): Promise<Response> {
    const validation = ValidationService.validateItemName(data.name);
    if (validation.isErr()) {
      return new Response(JSON.stringify({ error: validation.error }), { status: 400 });
    }

    const newItem: Item = {
      id: Date.now(),
      name: validation.unwrap(),
      Bought: false,
    };

    const result = await storage.addItem(newItem);
    return result.isOk()
      ? new Response(JSON.stringify({ message: "Item added." }), { status: 201 })
      : new Response(JSON.stringify({ error: result.error }), { status: 500 });
  },

  async deleteItem(id: number): Promise<Response> {
    const result = await storage.removeItem(id);
    return result.isOk()
      ? new Response(JSON.stringify({ message: "Item removed." }), { status: 200 })
      : new Response(JSON.stringify({ error: result.error }), { status: 404 });
  },
};
