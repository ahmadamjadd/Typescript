import React, { useEffect, useState } from "react";
import { shoppingListApi, type Item } from "./api/shoppingListApi";
import { AddItemForm } from "./components/AddItemForm";
import { ShoppingList } from "./components/ShoppingList";

export const App: React.FC = () => {
  const [items, setItems] = useState<Item[]>([]);
  const [error, setError] = useState("");

  const fetchItems = () => {
    shoppingListApi.getItems().then((result) =>
      result.isOk()
        ? setItems(result.unwrap())
        : setError(result.error.message)
    );
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const handleAddItem = (name: string) => {
    shoppingListApi.addItem(name).then((result) =>
      result.isOk()
        ? fetchItems()
        : setError(result.error.message)
    );
  };

  const handleDeleteItem = (id: number) => {
    shoppingListApi.deleteItem(id).then((result) =>
      result.isOk()
        ? fetchItems()
        : setError(result.error.message)
    );
  };

  return (
    <div className="max-w-lg mx-auto mt-10">
      <h1 className="text-2xl font-bold mb-4">🛒 Shopping List</h1>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <AddItemForm onAdd={handleAddItem} />
      <ShoppingList items={items} onDelete={handleDeleteItem} />
    </div>
  );
};
