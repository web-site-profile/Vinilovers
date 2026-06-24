export const prerender = false;

export async function POST({ request }) {
  const secret = import.meta.env.REBUILD_SECRET;
  const body = await request.text();
  const authHeader = request.headers.get("Authorization");

  if (secret && authHeader !== `Bearer ${secret}`) {
    return new Response("Unauthorized", { status: 401 });
  }

  const buildHookUrl = import.meta.env.NETLIFY_BUILD_HOOK;

  if (!buildHookUrl) {
    return new Response("Build hook no configurado", { status: 500 });
  }

  const response = await fetch(buildHookUrl, { method: "POST" });

  if (!response.ok) {
    return new Response("Error al disparar el build", { status: 500 });
  }

  return new Response("Build disparado correctamente", { status: 200 });
}
