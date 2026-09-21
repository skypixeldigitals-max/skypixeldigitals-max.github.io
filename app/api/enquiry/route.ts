/**
 * Enquiry intake.
 *
 * NOT YET WIRED TO A DESTINATION — right now this validates the payload and
 * logs it to the server console so the form works end to end. Before launch,
 * replace the `console.info` with one of:
 *   - an email send (Resend / SendGrid)
 *   - a row insert (Supabase — already in the toolchain)
 *   - a webhook into whatever CRM you settle on
 */
export async function POST(request: Request) {
  let payload: Record<string, unknown>;
  try {
    payload = await request.json();
  } catch {
    return Response.json({ ok: false, error: "Invalid JSON" }, { status: 400 });
  }

  const name = String(payload.name ?? "").trim();
  const contact = String(payload.contact ?? "").trim();

  if (!name || !contact) {
    return Response.json(
      { ok: false, error: "Name and contact are required" },
      { status: 422 },
    );
  }

  console.info("[enquiry]", {
    name,
    contact,
    location: payload.location ?? null,
    type: payload.type ?? null,
    bedrooms: payload.bedrooms ?? null,
    estimate: payload.estimate ?? null,
    message: payload.message ?? null,
    at: new Date().toISOString(),
  });

  return Response.json({ ok: true });
}
