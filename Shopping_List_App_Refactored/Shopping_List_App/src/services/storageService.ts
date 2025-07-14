// src/services/storageService.ts
import { Result } from "../utils/result";
import type { Item } from "./shoppingList";

export class StorageService {
  save(key: string, data: Item[]): Result<void, Error> {
    try {
      localStorage.setItem(key, JSON.stringify(data));
      return Result.Ok(undefined);
    } catch (e) {
      return Result.Err(new Error(`Failed to save data: ${e}`));
    }
  }

  load(key: string): Result<Item[], Error> {
    try {
      const data = localStorage.getItem(key);
      if (!data) {
        return Result.Err(new Error("No data found."));
      }

      // Check if data is valid JSON
      if (!this.isValidJson(data)) {
        return Result.Err(new Error("Stored data is not valid JSON."));
      }

      const parsed = JSON.parse(data) as Item[];
      return Result.Ok(parsed);
    } catch (e) {
      return Result.Err(new Error(`Failed to load data: ${e}`));
    }
  }

  private isValidJson(data: string): boolean {
    try {
      JSON.parse(data);
      return true;
    } catch {
      return false;
    }
  }
}
