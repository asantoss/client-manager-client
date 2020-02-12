import React, { useState } from "react";
import { useFormik } from "formik";
import { useMutation } from "@apollo/react-hooks";
import * as Yup from "yup";
import {
  TextField,
  Button,
  CircularProgress,
  Typography
} from "@material-ui/core";
import { css } from "@emotion/core";
import { useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
const ClientSchema = Yup.object().shape({
  firstName: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too long!")
    .required("Required"),
  lastName: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too long!")
    .required("Required"),
  email: Yup.string()
    .email("Invalid Email")
    .required("Required")
});

export default function ClientInformation({ setClientOpen, isClientOpen }) {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      phoneNumber: "",
      address: "",
      city: "",
      zipCode: ""
    },
    validationSchema: ClientSchema,
    onSubmit: values => {
      handleNext(values);
    }
  });
  const handleNext = values => {
    setLoading(!loading);
    dispatch({ type: "SET_CLIENT", payload: values });
    setTimeout(() => setClientOpen(!isClientOpen), 5000);
  };
  if (loading)
    return (
      <div
        css={css`
          display: flex;
          flex-direction: column;
          align-items: center;
        `}
      >
        <Typography>Setting all of the client information...</Typography>
        <br />
        <CircularProgress color="secondary" />
      </div>
    );
  return (
    <form
      onSubmit={formik.handleSubmit}
      css={css`
        display: flex;
        flex-direction: column;
        justify-content: center;
        overflow-x: scroll;
        label {
          text-transform: capitalize;
        }
        & > .client_input {
          margin-bottom: 0.5em;
        }
      `}
    >
      {Object.keys(formik.values).map(value => {
        return (
          <TextField
            className="client_input"
            key={value + ""}
            name={value}
            label={value}
            variant="outlined"
            onChange={formik.handleChange}
            value={formik.values[value]}
            helperText={formik.errors[value] && formik.errors[value]}
            error={!!formik.errors[value]}
          />
        );
      })}
      <Button
        style={{ color: "white", width: "50px", alignSelf: "center" }}
        variant="contained"
        color="primary"
        type="submit"
      >
        Save
      </Button>
    </form>
  );
}
