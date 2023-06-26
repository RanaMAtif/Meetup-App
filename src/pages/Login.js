import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import { AllMeetupConext } from "../contexts/AllMeetupConext";
import { useAuth } from "../contexts/AuthContext";
import Alert from "@mui/material/Alert";
import { object, string } from "yup";

const initialValues = {
  email: "",
  password: "",
};

let validation = object({
  email: string().email("Invalid email address").required("Required"),
  password: string()
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

  const { verifyemail, login, getUser } = useAuth();

  const onSignUpClick = () => {
    setSignup(true);
  };

  const onPasswordField = (e) => {
    if (e.key.code === 8) {
      setPasswordError(false);
    }
    setPasswordError(false);
  };

  const onEmailField = (e) => {
    setEmailError(false);

    // {emailError?  setEmailError(false): "as"  }

    if (e.key.code === 8) {
      // 👇️ your logic here
      setEmailError(false);
    }
  };

  const handleSubmit = async (values) => {
    const { email, password } = values;

    console.log("user infor getUser()" + (await getUser()));

    if (await verifyemail(email)) {
      console.log("Email is registered in Login module");

      if (await login(email, password)) {
        setEmailError(false);
        setPasswordError(false);
        await getUser();

        navigate("/AllMeetupsPage");
        window.location.reload();
        // localStorage.setItem("userinfo", values);
      } else {
        setPasswordError(true);
      }
    } else {
      console.log("Email is not registered in Login module");

      setEmailError(true);
    }

    // fetchSignInMethodsForEmail(auth, email)
    // // await chekEmail(email)
    // .then((signInMethods) => {
    //   console.log(signInMethods);
    //   if (signInMethods.length === 0) {
    //     console.log("Email address is not registered sss");

    //     setEmailError(true);
    //   } else {
    //     signInWithEmailAndPassword(auth, email, password)
    //       .then((userCredential) => {
    //         // Sign-in successful
    //         setEmailError(false);
    //         setPasswordError(false);
    //         console.log("Sign-in successful");
    //         console.log("User ID: " + userCredential.user.uid);
    //           navigate("/AllMeetupsPage");
    //  window.location.reload();
    //  localStorage.setItem("userinfo",values)
    //       })
    //       .catch((error) => {
    //         // Sign-in failed
    //         if (error.code === "auth/wrong-password") {
    //           setPasswordError(true);
    //         }
    //         console.error(" signInWithEmailAndPassword :", error);
    //       });
    //   }
    // })
    // .catch(function (error) {
    //   console.error("fetchSignInMethodsForEmail :", error);
    // });

    // console.log("handleSubmit Clicked");
    //  console.log(values);

    //  navigate("/AllMeetupsPage");
    //  window.location.reload();
    //  localStorage.setItem("userinfo",values)
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
      <Typography component="h1" variant="h5">
        Log in
      </Typography>

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
            <ErrorMessage name="email" component={"p"} />
            {!emailError ? (
              ""
            ) : (
              <Alert variant="outlined" severity="error">
                Email address is not registered!
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
                Wrong password!
              </Alert>
            )}

            <ErrorMessage name="password" component={"p"} />

            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link
                  variant="body2"
                  Link
                  href="#"
                  onClick={() => onSignUpClick()}
                >
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
            <Copyright sx={{ mt: 5 }} />
          </Box>
        </Form>
      </Formik>
    </Box>
  );
}

export default Login;
