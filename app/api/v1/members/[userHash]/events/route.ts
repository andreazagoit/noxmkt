import connectDB from "@/lib/db";
import ActionModel from "@/models/Action";
import { getContactByHash } from "@/utils/contact";
import { saveEvent } from "@/utils/event";

export async function POST(request, { params }) {
  const { userHash } = await params;
  const { action: actionId, event, data } = await request.json();

  await connectDB();

  const action = await ActionModel.findById(actionId);
  const contact = await getContactByHash(userHash);

  const newEvent = await saveEvent(action._id, contact._id, event, {});

  return new Response(JSON.stringify(newEvent), { status: 200 });
}

export async function GET(request, { params: _params }) {
  const { userHash } = await _params;
  const searchParams = request.nextUrl.searchParams;
  const actionId = searchParams.get("action");
  const event = searchParams.get("event");

  await connectDB();

  const action = await ActionModel.findById(actionId);
  const contact = await getContactByHash(userHash);

  const newEvent = await saveEvent(action._id, contact._id, event, {});

  return new Response(JSON.stringify(newEvent), { status: 200 });
}
