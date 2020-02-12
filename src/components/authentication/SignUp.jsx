import React, { useState } from "react";
import { useFormik } from "formik";
import {
  TextField,
  InputLabel,
  Button,
  InputAdornment,
  IconButton
} from "@material-ui/core";
import { Visibility, VisibilityOff } from "@material-ui/icons";
import * as Yup from "yup";
import { css } from "emotion";
import { useMutation } from "@apollo/react-hooks";
import { REGISTER } from "../../apollo/constants";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

const SignUpSchema = Yup.object().shape({
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
    .required("Required"),
  password: Yup.string()
    .required("No password provided.")
    .min(8, "Password is too short - should be 8 chars minimum.")
    .matches(/[a-zA-Z]/, "Password can only contain Latin letters.")
});

export default function SignUp() {
  const [isPasswordShown, setPassShowed] = useState(false);
  const dispatch = useDispatch();
  const history = useHistory();
  const handleShowPassword = () => {
    setPassShowed(!isPasswordShown);
  };

  const handleMouseDownPassword = event => {
    event.preventDefault();
  };
  const [handleRegister, { loading }] = useMutation(REGISTER);
  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      phoneNumber: "",
      address: "",
      city: "",
      zipCode: "",
      companyName: ""
    },
    validationSchema: SignUpSchema,
    onSubmit: values => {
      handleRegister({
        variables: { ...values }
      }).then(() => {
        dispatch({ type: "LOGIN", payload: { ...values } });
        history.push("/");
      });
    }
  });
  if (loading) return <p>Loading....</p>;
  return (
    <form
      className={css`
        display: flex;
        padding: 1.5em;
        flex-direction: column;
        justify-content: space-evenly;
        & > button {
          align-self: flex-end;
          width: 100px;
        }
        label {
          text-transform: capitalize;
        }
        & > div {
          margin-bottom: 1em;
        }
      `}
      onSubmit={formik.handleSubmit}
    >
      <h1>Sign Up</h1>
      <InputLabel />
      {Object.keys(formik.values).map(value => {
        if (value !== "password") {
          return (
            <TextField
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
        }
        return;
      })}
      <TextField
        variant="outlined"
        type={isPasswordShown ? "text" : "password"}
        autoComplete="new-password"
        required
        name="password"
        label="Password"
        onChange={formik.handleChange}
        value={formik.values.password}
        error={!!formik.errors.password}
        helperText={formik.errors.password}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={handleShowPassword}
                onMouseDown={handleMouseDownPassword}
              >
                {isPasswordShown ? <Visibility /> : <VisibilityOff />}
              </IconButton>
            </InputAdornment>
          )
        }}
      />
      <Button variant="contained" color="primary" type="submit">
        Submit
      </Button>
    </form>
  );
}
