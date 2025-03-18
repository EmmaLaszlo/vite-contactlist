import React, { useState, useEffect } from "react";
import ContactRow from "./ContactRow";

export default function ContactList() {
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    async function fetchContacts() {
      try {
        const response = await fetch(
          "https://fsa-jsonplaceholder-69b5c48f1259.herokuapp.com/users"
        );
        const result = await response.json();
        console.log("Fetched Contacts:", result); // Debugging step

        // Ensure correct data structure before setting state
        const formattedContacts = result.map(user => ({
          id: user.id,
          name: user.name,
          email: user.email,
          phone: user.phone
        }));

        setContacts(formattedContacts);
      } catch (error) {
        console.error("Error fetching contacts:", error);
      }
    }

    fetchContacts();
  }, []);

  return (
    <table border="1">
      <thead>
        <tr>
          <th colSpan="3">Contact List</th>
        </tr>
        <tr>
          <td>Name</td>
          <td>Email</td>
          <td>Phone</td>
        </tr>
      </thead>
      <tbody>
        {contacts.map((contact) => (
          <ContactRow key={contact.id} contact={contact} />
        ))}
      </tbody>
    </table>
  );
}
