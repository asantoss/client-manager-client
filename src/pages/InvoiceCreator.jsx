import React, { useState, useEffect, Component } from "react";
import Modal from "../Modal";
import ClientInformation from "../components/Forms/ClientInformation";
import { Typography, IconButton } from "@material-ui/core";
import ProductPanel from "../components/Forms/ProductPanel";
import { useSelector, useDispatch } from "react-redux";
import { AddCircle } from "@material-ui/icons";
import { useLocation } from "react-router-dom";
import { useTransition } from "react-spring";
import { MyDocument } from "../components/createPdf";
import { Button, InvoiceCreatorContainer, ProductItem } from "../styles/index";

export default function InvoiceCreator() {
  const [isProductOpen, setProductOpen] = useState(false);
  const [isViewer, setisViewerOpen] = useState(false);
  const productTransition = useTransition(isProductOpen, null, {
    from: { opacity: 0, marginTop: 200 },
    enter: { opacity: 1, marginTop: 0 },
    leave: { opacity: 0, marginTop: 200 },
    config: { duration: 500 }
  });
  const viewerTransition = useTransition(isViewer, null, {
    from: { opacity: 0, marginTop: 200 },
    enter: { opacity: 1, marginTop: 0 },
    leave: { opacity: 0, marginTop: 200 },
    config: { duration: 500 }
  });
  const [isClientOpen, setClientOpen] = useState(false);
  const invoiceData = useSelector(state => state.invoice);
  const { state } = useLocation();
  const dispatch = useDispatch();
  const handleShowViewer = () => {
    if (!isProductOpen) {
      setisViewerOpen(!isViewer);
    }
  };
  useEffect(() => {
    if (state) {
      dispatch({ type: "SET_CLIENT", payload: { ...state } });
    }
  }, [state]);

  const totalCost = invoiceData.products.reduce((prev, acc) => {
    if (acc.quantity) {
      return prev + acc.price * acc.quantity;
    }
    return prev + acc.price;
  }, 0);
  const tax = totalCost * 0.07;

  return (
    <InvoiceCreatorContainer>
      <div className="invoice-panel">
        <Typography>CUSTOMER</Typography>
        <hr />
        {isClientOpen && (
          <ClientInformation
            setClientOpen={setClientOpen}
            isClientOpen={isClientOpen}
          />
        )}
        {!invoiceData.client.firstName && !invoiceData.client.email ? (
          <IconButton
            className="panel-actions"
            onClick={() => {
              setClientOpen(!isClientOpen);
            }}
          >
            <AddCircle /> <p>Add Customer Information</p>
          </IconButton>
        ) : (
          <>
            <Typography>
              {invoiceData.client.firstName} {invoiceData.client.lastName}
            </Typography>
            <Typography>{invoiceData.client.email}</Typography>
          </>
        )}
      </div>
      <div className="invoice-panel-products">
        <hr />
        <Typography>Products</Typography>
        <hr style={{ margin: 0 }} />
        {invoiceData.products &&
          invoiceData.products.map((product, index) => {
            return (
              <ProductItem
                onClick={() => {
                  dispatch({
                    type: "REMOVE_PRODUCT",
                    payload: { index }
                  });
                }}
              >
                <p>
                  <span>Name: </span>
                  {product.productName}
                </p>
                {product.quantity > 0 && (
                  <p>
                    <span>Qty.</span>
                    {product.quantity}
                  </p>
                )}
                <p>
                  <span>Price</span>
                  {product.price}
                </p>{" "}
              </ProductItem>
            );
          })}

        {productTransition.map(({ item, key, props }) => {
          if (item) {
            return (
              <Modal key={key}>
                <ProductPanel style={props} setProductOpen={setProductOpen} />
              </Modal>
            );
          }
        })}

        {viewerTransition.map(({ item, key, props }) => {
          return (
            item &&
            !isProductOpen && (
              <Modal key={key}>
                <MyDocument
                  style={props}
                  setIsViewerOpen={setisViewerOpen}
                  invoiceData={invoiceData}
                />
              </Modal>
            )
          );
        })}
        <IconButton
          className="panel-actions"
          onClick={() => {
            setProductOpen(!isProductOpen);
          }}
        >
          <AddCircle />
          <p>Add Product</p>
        </IconButton>
      </div>
      <div className="invoice-panel">
        <hr />
        <Typography>Details</Typography>
        <hr />
        <Typography>
          Tax: {tax.toLocaleString("en-us", "currency")} $
        </Typography>
        <Typography variant="h6">
          Total: {(totalCost + tax).toLocaleString("en-us", "currency")} $
        </Typography>
        <div className="invoice-actions">
          <Button variant="success">Save</Button>
          <Button variant="success" onClick={handleShowViewer}>
            Save PDF
          </Button>
          <Button variant="success" onClick={handleShowViewer}>
            Send
          </Button>
        </div>
      </div>
    </InvoiceCreatorContainer>
  );
}
