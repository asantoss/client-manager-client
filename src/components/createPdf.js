import pdf from "pdfjs";
import React from "react";
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  PDFViewer,
  PDFDownloadLink
} from "@react-pdf/renderer";

import { DocStyled, MainActions } from "../styles";
import styled from "styled-components";

function getFormattedDate(date) {
  let year = date.getFullYear();
  let month = (1 + date.getMonth()).toString().padStart(2, "0");
  let day = date
    .getDate()
    .toString()
    .padStart(2, "0");

  return month + "/" + day + "/" + year;
}

const styles = StyleSheet.create({
  page: {
    flexDirection: "column",
    backgroundColor: "#E4E4E4",
    justifyContent: "space-evenly",
    padding: 20
  },
  section: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
    flexGrow: 1
  },
  innerSection: {
    flexDirection: "column"
  },
  h2: {
    fontSize: 24,
    fontWeight: "bold",
    margin: 0
  },
  span: {
    color: "#666",
    fontSize: 11
  },
  table: {
    display: "table",
    width: "auto",
    margin: 20,
    borderWidth: 1,
    borderRightWidth: 1,
    borderBottomWidth: 1,
    borderStyle: "dotted",
    borderColor: "grey",
    flexDirection: "column",
    flexShrink: 1
  },

  tableRow: {
    width: "100%",
    border: 3,
    // alignItems: 'justify',
    margin: "auto",
    flexDirection: "row"
    // flexGrow: 1,
    // flexAlign: 'strech'
  },
  tableColHeader: {
    borderBottomColor: "#000",
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0,
    width: "17%"
  },
  tableCellHeader: {
    margin: 5,
    fontSize: 12,
    fontWeight: 500,
    textAlign: "center"
  },
  tableCol: {
    flexGrow: 1,
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0
  },
  tableCell: {
    margin: 5,
    fontSize: 10
  }
});

export const MyDocument = ({ invoiceData, setIsViewerOpen, style }) => {
  const { company, products, client } = invoiceData;
  const createDoc = (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.section}>
          <View style={styles.innerSection}>
            <Text style={styles.h2}>
              {company.companyName || "Company Name"}
            </Text>
            <Text style={styles.span}>{company.email || "Company Email"}</Text>
            <Text style={styles.span}>
              {company.phoneNumber || "555-555-5555"}
            </Text>
          </View>
          <View style={styles.innerSection}>
            <Text style={styles.h2}>Quote</Text>
            <Text style={styles.span}>{getFormattedDate(new Date())}</Text>
          </View>
        </View>
        <View style={styles.section}>
          <View style={styles.innerSection}>
            <Text style={styles.h2}>
              {client.firstName + " " + client.lastName || "Client Name"}
            </Text>
            <Text style={styles.span}>
              {client.phoneNumber || "555-555-5555"}
            </Text>
          </View>
        </View>
        <View style={styles.section}>
          <View style={styles.innerSection}>
            <View style={styles.table} wrap>
              <View style={styles.tableRow}>
                <View style={styles.tableColHeader}>
                  <Text style={styles.tableCell}>Name</Text>
                </View>
                <View style={styles.tableColHeader}>
                  <Text style={styles.tableCell}>Qty.</Text>
                </View>
                <View style={styles.tableColHeader}>
                  <Text style={styles.tableCell}>Price</Text>
                </View>
                {/* <View style={styles.tableColHeader}>
                  <Text style={styles.tableCell}>Sub-Total</Text>
                </View> */}
              </View>
            </View>
          </View>
        </View>
      </Page>
    </Document>
  );

  return (
    <DocStyled style={style}>
      <MainActions
        pageName="Document Viewer"
        closeFunction={() => setIsViewerOpen(false)}
      />{" "}
      <PDFViewer className="viewer">{createDoc}</PDFViewer>
      <PDFDownloadLink document={createDoc} fileName="somename.pdf">
        {({ blob, url, loading, error }) =>
          loading ? "Loading document..." : "Download now!"
        }
      </PDFDownloadLink>
    </DocStyled>
  );
};

function createRawHtml(data) {
  const { client, products, company } = data;
  return `
  <!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <style>
  @import url(https://fonts.googleapis.com/css?family=Roboto:100,300,400,900,700,500,300,100);
  body{
    max-width: 600px;
    font-family: 'Roboto', sans-serif;
  }
  [id*='invoice-']{
        display: flex;
        margin: 0 auto;
        width: 600px;
        justify-content: space-between;
    align-items: center;
        div{
      display: flex;
      flex-direction: column;
    }
   
  }
   h2{
      margin: 0;
    }
  h3{
    font-size: 0.9em;
  }
    span{
      color: #666;
      font-size: 0.7em;
      line-heigth: 1.2em;
    }
  
  
  [id*='invoice-']{ /* Targets all id with 'col-' */
    border-bottom: 1px solid #EEE;
    padding: 30px;
  }
  
  #invoice-top{min-height: 120px;}
  #invoice-mid{min-height: 120px;}
  #invoice-bot{ min-height: 250px;}
  table{
    width: 100%;
  }
  
  td{
    padding: 5px 0 5px 15px;
    border: 1px solid #EEE
  }
  .tabletitle{
    padding: 5px;
    background: #EEE;
  }
  
  .service{border: 1px solid #EEE;}
  .item{width: 50%;}
  .itemtext{font-size: .9em;}
  </style>
</head>
<body>
  <div class="invoice-container">
    <div id="invoice-top">
    <div>
    <h2>Alexander Santos</h2>
      <span>alexsantosantana@live.com</span>
      <span>+1-770-369-5370</span>
      </div>
    <div>
      <h2>Quote</h2>
      <span>Issued: May 27, 2015</span>
      <span>Payment Due: May 27, 2015</span>
    </div>
      </div>
    <div id="invoice-mid">
      <div class="client-info"><h2>Client Name</h2>
        <span>Client@gmail.com</span>
        <span>555-555-5555</span>
      </div>
    </div>
    <div id="invoice-bottom">
      <table>
  
      <tbody>
        <tr class="tabletitle">
          <td class="item"><h3>Item Description</h3></td>
          <td class="quantity"><h3>Qty.</h3></td>
          <td class="price"><h3>Price</h3></td>
          <td class="sub-total"><h3>Sub-Total</h3></td>
        </tr>
        <tr class="service">
          <td class="tableitem"><p class="itemtext">Communication</p></td>
           
        </tr>
                  <tr class="tabletitle">
            <td></td>
            <td></td>
            <td><h2>Total</h2></td>
            <td class="payment"><h2>0</h2></td>
          </tr>
           </tbody>
        </table>
    </div>
  </div>
</body>
</html>
  `;
}
