export interface Item {
    id: number;
    name: string;
    Bought: boolean;
  }
  
  export class ShoppingList {
    private items: Item[] = [];
  
    addItem(item: Item) {
      this.items.push(item);
      this.saveToLocalStorage();

    }
  
    removeItem(id: number) {
      this.items = this.items.filter(item => item.id !== id);
      this.saveToLocalStorage();
    }
  
    toggleBought(id: number) {
      const item = this.items.find(item => item.id === id);
      if (item) {
        item.Bought = !item.Bought;
      }
      this.saveToLocalStorage();
    }
  
    getItems() {
      return this.items;

    }

    private saveToLocalStorage() {
      localStorage.setItem("shoppingList", JSON.stringify(this.items));
    }

    loadFromLocalStorage() {
        const data = localStorage.getItem("shoppingList");
        if (data) {
          try {
            this.items = JSON.parse(data);
          } catch (e) {
            console.error("Invalid data in localStorage, resetting...");
            this.items = [];
          }
        }
      }
      
  }