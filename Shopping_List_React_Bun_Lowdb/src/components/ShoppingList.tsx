import React from "react";
import type { Item } from "../api/shoppingListApi";

type Props = {
  items: Item[];
  onDelete: (id: number) => void;
};

export const ShoppingList: React.FC<Props> = ({ items, onDelete }) => (
  <ul className="space-y-2">
    {items.map((item) => (
      <li
        key={item.id}
        className="flex justify-between items-center border p-2 rounded"
      >
        <span>{item.name}</span>
        <button
          onClick={() => onDelete(item.id)}
          className="bg-red-500 text-white px-2 py-1 rounded"
        >
          Delete
        </button>
      </li>
    ))}
  </ul>
);
