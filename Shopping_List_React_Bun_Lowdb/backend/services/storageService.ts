// backend/services/storageService.ts
import { db } from "../db/database";
import { Result } from "../services/result";
import type { Item } from "../models/item";

export class ShoppingListService {
  async getAllItems(): Promise<Result<Item[], string>> {
    await db.read();
    return Result.Ok(db.data.items);
  }

  async addItem(item: Item): Promise<Result<void, string>> {
    await db.read();
    db.data.items.push(item);
    await db.write();
    return Result.Ok(undefined);
  }

  async removeItem(id: number): Promise<Result<void, string>> {
    await db.read();
    db.data!.items = db.data.items.filter(i => i.id !== id);
    await db.write();
    return Result.Ok(undefined);
  }
}
