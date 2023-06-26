import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";
import { useState, useContext } from "react";
import { AllMeetupConext } from "../contexts/AllMeetupConext";
import { auth } from "../Firebase/firbaseConfig";
import { createUserWithEmailAndPassword } from "@firebase/auth";
import Alert from "@mui/material/Alert";
import { Stack } from "@mui/system";
import { Divider } from "@mui/material";
import GIcon from "@mui/icons-material/Google";
import FbIcon from "@mui/icons-material/Facebook";

import { object, string, ref } from "yup";

const initialValues = {
  email: "",
  password: "",
  emailverification: "",
  passwordverification: "",
};

let validation = object({
  email: string().email("Invalid email address").required("Required"),

  password: string()
    .oneOf([ref("password"), null], "Passwords must match")
    .required("Password is required")
    .min(8, "Password must be at least 8 characters long"),

  emailverification: string()
    .email("Invalid email address")

    .oneOf([ref("email"), null], "Email must match")
    .required("Required"),

  passwordverification: string()
    .oneOf([ref("password"), null], "Passwords must match")
    .required("Password is required")
    .min(8, "Password must be at least 8 characters long"),
});

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        Lets Meet
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

function Login() {
  let navigate = useNavigate();

  const { value1, value2 } = useContext(AllMeetupConext);
  const [isSignup, setSignup] = value2;
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  const [veremailError, setVerEmailError] = useState(false);
  const [verpasswordError, setVerPasswordError] = useState(false);

  const onLoginClick = () => {
    setSignup(false);
  };

  const onPasswordField = (e) => {
    if (e.key.code === 8) {
      setPasswordError(false);
      setVerPasswordError(false);
    }
    setPasswordError(false);
    setVerPasswordError(false);
  };

  const onEmailField = (e) => {
    setEmailError(false);
    setVerEmailError(false);

    if (e.key.code === 8) {
      setEmailError(false);
      setVerEmailError(false);
    }
  };

  const handleSubmit = async (values) => {
    const { email, password, emailverification, passwordverification } = values;
    const emailaddress = "";

    console.log({
      email: email,
      password: password,
      veremail: emailverification,
      verpassword: passwordverification,
    });

    if (email === emailverification && password === passwordverification) {
      createUserWithEmailAndPassword(auth, email, password, emailaddress)
        .then((userCredential) => {
          const user = userCredential.user;
          setEmailError(false);

          navigate("/AllMeetupsPage");
          window.location.reload();
        })
        .catch((error) => {
          if (error.code === "auth/email-already-in-use") {
            console.log("Email address already exists");
            setEmailError(true);
          } else {
            console.error("Error creating user account:", error);
          }
        });
    } else {
      if (email !== emailverification) setVerEmailError(true);

      if (password !== passwordverification) setVerPasswordError(true);
    }
  };

  return (
    <Box
      sx={{
        my: 8,
        mx: 4,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
        <LockOutlinedIcon />
      </Avatar>
      <Typography component="h1" variant="h3" marginBottom={6}>
        Sign Up
      </Typography>

      <Stack direction="row" spacing={1}>
        <Typography component="h7" variant="h7">
          Already have an account?
        </Typography>
        <Link variant="body2" Link href="#" onClick={() => onLoginClick()}>
          {"Login"}
        </Link>
      </Stack>

      <Formik
        initialValues={initialValues}
        validationSchema={validation}
        onSubmit={(e) => handleSubmit(e)}
      >
        <Form>
          <Box sx={{ mt: 1 }} onSubmit={handleSubmit}>
            <Field
              as={TextField}
              label={"Email"}
              margin="normal"
              name={"email"}
              type="email"
              fullWidth
              onKeyDown={(e) => onEmailField(e)}
              required
            />
            <ErrorMessage name="email" component={"span"} />

            {!emailError ? (
              ""
            ) : (
              <Alert variant="outlined" severity="error">
                Email address already exists!
              </Alert>
            )}

            <Field
              as={TextField}
              label={"Type your email again"}
              margin="normal"
              name={"emailverification"}
              type="email"
              fullWidth
              onKeyDown={(e) => onEmailField(e)}
              required
            />
            <ErrorMessage name="emailverification" component={"span"} />

            {!emailError ? (
              ""
            ) : (
              <Alert variant="outlined" severity="error">
                Email address already exists!
              </Alert>
            )}

            {!veremailError ? (
              ""
            ) : (
              <Alert variant="outlined" severity="error">
                Email must match!
              </Alert>
            )}

            <Field
              as={TextField}
              label={"Password"}
              margin="normal"
              type="password"
              name={"password"}
              fullWidth
              required
              onKeyDown={(e) => onPasswordField(e)}
            />

            {!passwordError ? (
              ""
            ) : (
              <Alert variant="outlined" severity="error">
                Wrong password
              </Alert>
            )}

            <ErrorMessage name="password" component={"span"} />

            <Field
              as={TextField}
              label={"Type your password again"}
              margin="normal"
              type="password"
              name={"passwordverification"}
              fullWidth
              required
              onKeyDown={(e) => onPasswordField(e)}
            />

            {!passwordError ? (
              ""
            ) : (
              <Alert variant="outlined" severity="error">
                Wrong password
              </Alert>
            )}
            {!verpasswordError ? (
              ""
            ) : (
              <Alert variant="outlined" severity="error">
                Passwords must match
              </Alert>
            )}

            <ErrorMessage name="passwordverification" component={"span"} />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>

            <Divider sx={{ mt: 1 }}>OR</Divider>

            <Stack direction="column" spacing={2} sx={{ mt: 2 }}>
              <Button variant="outlined" size="small" startIcon={<GIcon />}>
                Continue with Google
              </Button>

              <Button variant="outlined" size="small" startIcon={<FbIcon />}>
                Continue with Facebook
              </Button>
            </Stack>

            <Copyright sx={{ mt: 5 }} />
          </Box>
        </Form>
      </Formik>
    </Box>
  );
}

export default Login;
