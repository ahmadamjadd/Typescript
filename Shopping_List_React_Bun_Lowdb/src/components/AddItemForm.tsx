import React, { useState } from "react";
import { ValidationService } from "../utils/validation";


type Props = {
  onAdd: (name: string) => void;
};

export function AddItemForm({ onAdd }: Props) {
  const [name, setName] = useState("");
  const [error, setError] = useState(""); // use string

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const result = ValidationService.validateItemName(name);
    if (result.isErr()) {
      setError(result.error.message); // show error message
      return;
    }
    setError("");
    onAdd(name.trim());
    setName("");
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 mb-4">
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Add item"
        className="border p-2 flex-grow rounded"
      />
      <button type="submit" className="bg-blue-600 text-white px-4 rounded">
        Add
      </button>
      {error && <p className="text-red-500">{error}</p>}
    </form>
  );
}
