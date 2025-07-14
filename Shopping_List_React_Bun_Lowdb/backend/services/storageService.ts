import { db } from "../db/database";
import { Result } from "./result";
import type { Item } from "../models/item";

export class ShoppingListService {
  async getAllItems(): Promise<Result<Item[], Error>> {
    return db.read()
      .then(() => Result.Ok(db.data!.items))
      .catch(() => Result.Err(new Error("Failed to load items from DB")));
  }

  async addItem(item: Item): Promise<Result<void, Error>> {
    return db.read()
      .then(() => {
        db.data!.items.push(item);
        return db.write()
          .then(() => Result.Ok(undefined))
          .catch(() => Result.Err(new Error("Failed to save item to DB")));
      })
      .catch(() => Result.Err(new Error("Failed to load DB before saving item")));
  }

  async removeItem(id: number): Promise<Result<void, Error>> {
    return db.read()
      .then(() => {
        const originalLength = db.data!.items.length;
        db.data!.items = db.data!.items.filter(item => item.id !== id);

        if (db.data!.items.length === originalLength) {
          return Result.Err(new Error(`No item found with id ${id}.`));
        }

        return db.write()
          .then(() => Result.Ok(undefined))
          .catch(() => Result.Err(new Error("Failed to save changes to DB")));
      })
      .catch(() => Result.Err(new Error("Failed to load DB before deleting item")));
  }
}
