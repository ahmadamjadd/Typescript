import { Result } from "../utils/result";

const BASE_URL = "http://localhost:3001";

export type Item = {
  id: number;
  name: string;
  bought: boolean;
};

export const shoppingListApi = {
  async getItems(): Promise<Result<Item[], Error>> {
    try {
      const res = await fetch(`${BASE_URL}/items`);
      if (!res.ok) {
        return Result.Err(new Error("Failed to fetch items"));
      }
      const data: Item[] = await res.json();
      return Result.Ok(data);
    } catch {
      return Result.Err(new Error("Network error while fetching items"));
    }
  },

  async addItem(name: string): Promise<Result<void, Error>> {
    try {
      const res = await fetch(`${BASE_URL}/items`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name }),
      });
      if (!res.ok) {
        const error = await res.json();
        return Result.Err(new Error(error.error || "Failed to add item"));
      }
      return Result.Ok(undefined);
    } catch {
      return Result.Err(new Error("Network error while adding item"));
    }
  },

  async deleteItem(id: number): Promise<Result<void, Error>> {
    try {
      const res = await fetch(`${BASE_URL}/items/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) {
        const error = await res.json();
        return Result.Err(new Error(error.error || "Failed to delete item"));
      }
      return Result.Ok(undefined);
    } catch {
      return Result.Err(new Error("Network error while deleting item"));
    }
  },
};
