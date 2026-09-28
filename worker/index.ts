interface Env {
  AI?: any;
  DB?: any;
}

export default {
  async fetch(request, env: Env) {
    const url = new URL(request.url);

    // Endpoint para generar consejo con IA
    if (url.pathname === "/api/ai") {
      try {
        if (env.AI) {
          const aiResponse = await env.AI.run("@cf/meta/llama-3-8b-instruct", {
            prompt: "Escribe un consejo o tip breve sobre desarrollo de software o devops en español (máximo 2 oraciones).",
            max_tokens: 80,
          });
          return Response.json({
            message: aiResponse.response || "¡La automatización continua es la clave del éxito!",
            source: "Cloudflare Workers AI (Llama 3)",
          });
        }
      } catch (err) {
        console.error("Error con Workers AI:", err);
      }

      // Consejos de respaldo para pruebas locales o si AI no está disponible
      const consejos = [
        "Automatizar las pruebas y el despliegue reduce el error humano y acelera la entrega.",
        "La infraestructura como código permite versionar tus entornos igual que tu software.",
        "Monitorea tus servicios en el borde para resolver incidencias antes de que impacten al usuario.",
        "Haz commits atómicos con descripciones claras para facilitar la integración continua.",
        "Los Workers en el Edge ofrecen baja latencia al procesar solicitudes cerca del usuario."
      ];
      const consejoAleatorio = consejos[Math.floor(Math.random() * consejos.length)];

      return Response.json({
        message: consejoAleatorio,
        source: "Edge Worker Fallback",
      });
    }

    // Endpoint para consultar usuarios en D1
    if (url.pathname === "/api/users") {
      try {
        if (env.DB) {
          const { results } = await env.DB.prepare("SELECT * FROM users").all();
          return Response.json(results);
        }
        return Response.json({ error: "D1 database no configurada" }, { status: 500 });
      } catch (err: any) {
        return Response.json({ error: err.message }, { status: 500 });
      }
    }

    // Endpoint para consultar productos en D1
    if (url.pathname === "/api/products") {
      try {
        if (env.DB) {
          const { results } = await env.DB.prepare("SELECT * FROM products").all();
          return Response.json(results);
        }
        return Response.json({ error: "D1 database no configurada" }, { status: 500 });
      } catch (err: any) {
        return Response.json({ error: err.message }, { status: 500 });
      }
    }

    if (url.pathname.startsWith("/api/")) {
      return Response.json({
        name: "Cloudflare + IA + D1",
      });
    }

    return new Response(null, { status: 404 });
  },
} satisfies ExportedHandler<Env>;
