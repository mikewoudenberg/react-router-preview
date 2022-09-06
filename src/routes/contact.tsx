import { Suspense } from "react";
import {
  ActionFunctionArgs,
  Await,
  defer,
  Form,
  LoaderFunctionArgs,
  useAsyncValue,
  useFetcher,
  useLoaderData,
} from "react-router-dom";
import { ContactType } from "../../server/models/Contact";
import { getContact, updateContact } from "../contacts";

// TODO type refinement possible here?
export async function loader({ params }: LoaderFunctionArgs) {
  const contactPromise = getContact(params.contactId || "");

  return defer({ contactPromise });
}

export async function action({ params, request }: ActionFunctionArgs) {
  let formData = await request.formData();
  // TODO types break down here
  return updateContact(params.contactId || "", {
    favorite: formData.get("favorite") === "true" ? true : false,
  });
}

export default function Contact() {
  // TODO types break down here
  const { contactPromise } = useLoaderData() as {
    contactPromise: Promise<ContactType>;
  };

  return (
    <Suspense fallback={<h1>Fancy loading skeleton</h1>}>
      <Await
        resolve={contactPromise}
        errorElement={<div>Contact failed to load</div>}
      >
        <ContactDetails />
      </Await>
    </Suspense>
  );
}

function ContactDetails() {
  const contact = useAsyncValue() as ContactType;

  return (
    <div id="contact">
      <div>
        <img key={contact.avatar} src={contact.avatar} />
      </div>

      <div>
        <h1>
          {contact.first || contact.last ? (
            <>
              {contact.first} {contact.last}
            </>
          ) : (
            <i>No Name</i>
          )}{" "}
          <Favorite contact={contact} />
        </h1>

        {contact.twitter && (
          <p>
            <a target="_blank" href={`https://twitter.com/${contact.twitter}`}>
              {contact.twitter}
            </a>
          </p>
        )}

        {contact.notes && <p>{contact.notes}</p>}

        <div>
          <Form action="edit">
            <button type="submit">Edit</button>
          </Form>
          <Form
            method="post"
            action="destroy"
            onSubmit={(event) => {
              if (!confirm("Please confirm you want to delete this record.")) {
                event.preventDefault();
              }
            }}
          >
            <button type="submit">Delete</button>
          </Form>
        </div>
      </div>
    </div>
  );
}

function Favorite({ contact }: { contact: ContactType }) {
  const fetcher = useFetcher();
  // yes, this is a `let` for later
  let favorite = contact.favorite;
  if (fetcher.formData) {
    favorite = fetcher.formData.get("favorite") === "true";
  }

  return (
    <fetcher.Form method="post">
      <button
        name="favorite"
        value={favorite ? "false" : "true"}
        aria-label={favorite ? "Remove from favorites" : "Add to favorites"}
      >
        {favorite ? "★" : "☆"}
      </button>
    </fetcher.Form>
  );
}
