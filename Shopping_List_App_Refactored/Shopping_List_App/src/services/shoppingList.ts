// src/services/shoppingList.ts
export interface Item {
  id: number;
  name: string;
  Bought: boolean;
}

export class ShoppingList {
  private items: Item[] = [];

  constructor(initialItems: Item[] = []) {
    this.items = [...initialItems]; 
  }

  getItems(): Item[] {
    return [...this.items]; 
  }

  addItem(newItem: Item): void {
    this.items = [...this.items, newItem];
  }

  removeItem(id: number): void {
    this.items = this.items.filter(item => item.id !== id);
  }

  toggleBought(id: number): void{
    this.items = this.items.map(item =>
      item.id === id ? { ...item, Bought: !item.Bought } : item
    );

  }
}
