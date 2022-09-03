import { Static, Type } from "@sinclair/typebox";

export const Contact = Type.Object({
  id: Type.String(),
  createdAt: Type.Number(),
  favorite: Type.Optional(Type.Boolean()),
  first: Type.Optional(Type.String()),
  last: Type.Optional(Type.String()),
  avatar: Type.Optional(Type.String()),
  twitter: Type.Optional(Type.String()),
  notes: Type.Optional(Type.String()),
});

export type ContactType = Static<typeof Contact>;
