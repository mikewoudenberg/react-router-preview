import { matchSorter } from "match-sorter";
import { sortBy } from "sort-by-typescript";
import { ContactType } from "../server/models/Contact";

export async function getContacts(query?: string): Promise<Array<ContactType>> {
  let contacts = await fetch("/api/contacts").then((res) => res.json());
  if (query) {
    contacts = matchSorter(contacts, query, { keys: ["first", "last"] });
  }
  return contacts.sort(sortBy("last", "createdAt"));
}

export async function createContact(): Promise<ContactType> {
  let id = Math.random().toString(36).substring(2, 9);
  let contact: ContactType = { id, createdAt: Date.now() };
  const createdContact = await fetch("/api/contacts", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(contact),
  }).then((res) => res.json());
  return createdContact;
}

export async function getContact(id: string): Promise<ContactType | null> {
  let contact = await fetch(`/api/contacts/${id}`).then((res) => res.json());
  return contact ?? null;
}

export async function updateContact(
  id: string,
  updates: Partial<ContactType>
): Promise<ContactType> {
  const contact = await getContact(id);
  if (!contact) {
    throw new Error(`No contact found for ${id}`);
  }

  const updatedContact = { ...contact, ...updates };

  await fetch(`/api/contacts/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(updatedContact),
  });

  return updatedContact;
}

export async function deleteContact(id: string) {
  await fetch(`/api/contacts/${id}`, {
    method: "DELETE",
  });

  return true;
}
