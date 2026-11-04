// Health check for Docker HEALTHCHECK and uptime monitoring.
export const dynamic = "force-dynamic";

export function GET() {
  return Response.json({ status: "ok" });
}
