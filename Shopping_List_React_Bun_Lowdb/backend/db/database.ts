// backend/db/database.ts
import { Low } from "lowdb";
import { JSONFile } from 'lowdb/node'
import type { Item } from "../models/item";

type Data = { items: Item[] };
const adapter = new JSONFile<Data>("db.json");
export const db = new Low<Data>(adapter, { items: [] });

export async function initDB() {
  await db.read();
  db.data ||= { items: [] };
  await db.write();
}
