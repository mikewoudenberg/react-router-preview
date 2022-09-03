import { ActionFunctionArgs, redirect } from "react-router-dom";
import { deleteContact } from "../contacts";

export async function action({ params }: ActionFunctionArgs) {
  // TODO typing breask down here
  await deleteContact(params.contactId || "");
  return redirect("/");
}
