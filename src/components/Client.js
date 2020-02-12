import React from "react";
import {
  Grid,
  ExpansionPanel,
  ExpansionPanelSummary,
  Typography,
  ExpansionPanelDetails
} from "@material-ui/core";
import { ExpandMore } from "@material-ui/icons";
import { Link } from "react-router-dom";
import { Button, ClientStyled } from "../styles/index";
export default function Client({ client, className }) {
  return (
    <ClientStyled item className={className}>
      <ExpansionPanel className="client-panel">
        <ExpansionPanelSummary expandIcon={<ExpandMore />}>
          <Typography variant="h5">
            {client.firstName} {client.lastName}
          </Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <Grid container className="client-information">
            <Typography>Phone Number:</Typography>
            <a href={`tel:${client.phoneNumber}`}>{client.phoneNumber}</a>{" "}
            <br />
            <Typography>Email Address:</Typography>
            <span>{client.email}</span> <br />
            <Typography>Address: </Typography>
            <span>
              {client.address} <br /> {client.city} <br /> {client.zipCode}
            </span>{" "}
            <Grid item className="client-actions">
              <Link
                to={{
                  pathname: `/invoice/creator`,
                  state: { ...client }
                }}
              >
                <Button>Quote</Button>
              </Link>
              <Button variant="danger">Delete</Button>
            </Grid>
          </Grid>
        </ExpansionPanelDetails>
      </ExpansionPanel>
    </ClientStyled>
  );
}
