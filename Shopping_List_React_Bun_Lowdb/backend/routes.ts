// backend/routes.ts
import { itemController } from "./controller/itemController";

export async function handleRoutes(req: Request): Promise<Response> {
  const url = new URL(req.url);
  const pathname = url.pathname;
  const method = req.method.toUpperCase();

  if (pathname === "/items" && method === "GET") {
    return itemController.getAllItems();
  }

  if (pathname === "/items" && method === "POST") {
    const body = await req.json();
    return itemController.addItem(body);
  }

  const idMatch = pathname.match(/^\/items\/(\d+)$/);
  if (idMatch) {
    const id = parseInt(idMatch[1]);
    if (method === "DELETE") {
      return itemController.deleteItem(id);
    }
  }

  return new Response(JSON.stringify({ error: "Not Found" }), { status: 404 });
}
