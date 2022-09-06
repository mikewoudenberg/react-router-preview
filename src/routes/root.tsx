import { useEffect, useRef } from "react";
import {
  Form,
  LoaderFunctionArgs,
  NavLink,
  Outlet,
  useLoaderData,
  useNavigation,
  useSubmit,
} from "react-router-dom";
import { ContactType } from "../../server/models/Contact";
import { createContact, getContacts } from "../contacts";

export async function loader({ request }: LoaderFunctionArgs) {
  const url = new URL(request.url);
  const query = url.searchParams.get("q");
  const contacts = await getContacts(query || "");
  return { contacts, query };
}

export async function action() {
  await createContact();
}

export default function Root() {
  // TODO types break down here
  const { contacts, query } = useLoaderData() as {
    contacts: Array<ContactType>;
    query: string | null;
  };
  const submit = useSubmit();
  const navigation = useNavigation();
  const searching =
    navigation.location &&
    new URLSearchParams(navigation.location.search).has("q");

  const ref = useRef<HTMLInputElement>(null);
  // TODO seems to be an opportunity to create a "Query Synced field" hook
  useEffect(() => {
    if (ref.current && query !== null) {
      ref.current.value = query;
    }
  }, [query]);

  return (
    <>
      <div id="sidebar">
        <h1>React Router Contacts</h1>
        <div>
          <Form id="search-form" role="search">
            <input
              ref={ref}
              id="q"
              aria-label="Search contacts"
              className={searching ? "loading" : ""}
              placeholder="Search"
              type="search"
              name="q"
              defaultValue={query || ""}
              onChange={(event) => {
                const isFirstSearch = query === null;
                submit(event.currentTarget.form, {
                  replace: !isFirstSearch,
                });
              }}
            />
            <div id="search-spinner" aria-hidden hidden={!searching} />
            <div className="sr-only" aria-live="polite"></div>
          </Form>
          <Form method="post">
            <button type="submit">New</button>
          </Form>
        </div>
        <nav>
          {contacts.length ? (
            <ul>
              {contacts.map((contact) => (
                <li key={contact.id}>
                  <NavLink
                    to={`contacts/${contact.id}`}
                    className={({ isActive, isPending }) =>
                      isActive ? "active" : isPending ? "pending" : ""
                    }
                  >
                    {contact.first || contact.last ? (
                      <>
                        {contact.first} {contact.last}
                      </>
                    ) : (
                      <i>No Name</i>
                    )}{" "}
                    {contact.favorite && <span>★</span>}
                  </NavLink>
                </li>
              ))}
              <li>
                <NavLink to="all-contacts">All</NavLink>
              </li>
            </ul>
          ) : (
            <p>
              <i>No contacts</i>
            </p>
          )}
        </nav>
      </div>
      <div
        id="detail"
        className={navigation.state === "loading" ? "loading" : ""}
      >
        <Outlet />
      </div>
    </>
  );
}
