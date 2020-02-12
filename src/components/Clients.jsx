import React from "react";
import { GET_CLIENTS } from "../apollo/constants";
import { useQuery } from "@apollo/react-hooks";
import Client from "./Client";
import { Button } from "../styles";
import { ClientContainer } from "../styles/Clients";

export default function Clients() {
  const { loading, error, data } = useQuery(GET_CLIENTS);
  if (loading) return <p>loading....</p>;
  if (error) return <p>Had some trouble making this request</p>;
  if (data && data.getMe) {
    const { clients } = data.getMe;
    return (
      <ClientContainer>
        <Button align="center">Add New Client</Button>
        {clients.map(client => {
          return (
            <div key={client.id}>
              <Client client={client} />
            </div>
          );
        })}
      </ClientContainer>
    );
  }
  return <p>Loading...</p>;
}
