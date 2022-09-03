import { Type } from "@sinclair/typebox";
import { FastifyInstance } from "fastify";
import { Contact, ContactType } from "../models/Contact";

// TODO Ieuw, in memory
let contacts: ContactType[] = [];

export async function routes(fastify: FastifyInstance, options) {
  fastify.get("/", async (request, reply) => {
    return contacts;
  });

  fastify.get("/:contactId", async (req, res) => {
    const result = contacts.find(
      // @ts-ignore
      (contact) => contact.id === req.params.contactId
    );

    if (!result) {
      res.status(404);
    }
    return result;
  });

  fastify.post<{
    Response: ContactType;
    Body: ContactType;
    Params: { contactId: string };
  }>(
    "/",
    {
      schema: {
        body: Contact,
        response: {
          200: Contact,
        },
      },
    },
    async (req, res) => {
      contacts.push(req.body);
      return req.body;
    }
  );

  fastify.delete<{ Params: { contactId: string } }>(
    "/:contactId",
    async (req, res) => {
      contacts = contacts.filter(
        (contact) => contact.id !== req.params.contactId
      );
      res.status(204);
    }
  );

  fastify.put<{
    Response: ContactType;
    Body: ContactType;
    Params: { contactId: string };
  }>(
    "/:contactId",
    {
      schema: {
        body: Contact,
        response: {
          200: Contact,
        },
      },
    },
    async (req, res) => {
      const index = contacts.findIndex(
        (contact) => contact.id === req.params.contactId
      );

      if (index < 0) {
        res.status(404);
        return;
      }

      contacts[index] = req.body;
      return req.body;
    }
  );
}
