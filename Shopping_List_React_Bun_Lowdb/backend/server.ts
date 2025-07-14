import { db } from "./db/database";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
};

const server = Bun.serve({
  port: 3001,
  fetch: async (req) => {
    const url = new URL(req.url);

    // ✅ Handle preflight OPTIONS requests
    if (req.method === "OPTIONS") {
      return new Response(null, {
        status: 204,
        headers: corsHeaders,
      });
    }

    // ✅ Handle GET /items
    if (url.pathname === "/items" && req.method === "GET") {
      await db.read();
      return new Response(JSON.stringify(db.data.items), {
        status: 200,
        headers: {
          ...corsHeaders,
          "Content-Type": "application/json",
        },
      });
    }

    // ✅ Handle POST /items
    if (url.pathname === "/items" && req.method === "POST") {
      const body = await req.json();

      await db.read();

      // Get next ID (max existing ID + 1, or 1 if empty)
      const nextId =
        db.data.items.length > 0
          ? Math.max(...db.data.items.map((item) => item.id)) + 1
          : 1;

      const newItem = {
        id: nextId,
        name: body.name,
        bought: false,
      };

      db.data.items.push(newItem);
      await db.write();

      return new Response(JSON.stringify({ message: "Item added", item: newItem }), {
        status: 201,
        headers: {
          ...corsHeaders,
          "Content-Type": "application/json",
        },
      });
    }

    // ✅ Handle DELETE /items/:id
    if (url.pathname.startsWith("/items/") && req.method === "DELETE") {
      const idStr = url.pathname.split("/").pop();
      const id = Number(idStr);

      if (Number.isNaN(id)) {
        return new Response(JSON.stringify({ error: "Invalid ID" }), {
          status: 400,
          headers: corsHeaders,
        });
      }

      await db.read();
      const originalLength = db.data.items.length;

      db.data.items = db.data.items.filter((item) => item.id !== id);

      if (db.data.items.length === originalLength) {
        return new Response(JSON.stringify({ error: `Item with ID ${id} not found` }), {
          status: 404,
          headers: corsHeaders,
        });
      }

      await db.write();

      return new Response(JSON.stringify({ message: `Item ${id} deleted` }), {
        status: 200,
        headers: corsHeaders,
      });
    }

    // ❌ Fallback: Unknown route
    return new Response(JSON.stringify({ error: "Not Found" }), {
      status: 404,
      headers: corsHeaders,
    });
  },
});

console.log(`🚀 Bun server running on http://localhost:${server.port}`);
