import { useRouteLoaderData } from "react-router-dom";
import { ContactType } from "../../server/models/Contact";

export function Contacts() {
  // TODO typing breaks down here
  const { contacts } = useRouteLoaderData("root") as {
    contacts: Array<ContactType>;
  };

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>First</th>
            <th>Last</th>
            <th>Notes</th>
          </tr>
        </thead>
        <tbody>
          {contacts.map((contact) => (
            <tr key={contact.id}>
              <td>{contact.first}</td>
              <td>{contact.last}</td>
              <td>{contact.notes}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
