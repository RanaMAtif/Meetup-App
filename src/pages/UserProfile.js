import { Box, Container } from "@mui/system";
import React, { useState, useEffect, useRef } from "react";
import { TextField } from "@mui/material";
import { Button, Grid } from "@mui/material";
import { FormControl, InputLabel, Select } from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import { db } from "../Firebase/firbaseConfig";
import { Formik, Form, ErrorMessage, Field } from "formik";
import * as Yup from "yup";
import "yup-phone";
import { doc, setDoc, getDoc } from "firebase/firestore";

import { useAuth } from "../contexts/AuthContext";

const initialValues = {
  fName: "",
  lName: "",
  email: "",
  phoneNo: "",
  address: "",
  dob: "",
  gender: "",
  image: "",
};
var userData = {
  fName: "",
  lName: "",
  email: "",
  phoneNo: "",
  address: "",
  dob: "",
  gender: "",
  image: "",
};

const validation = Yup.object({
  fName: Yup.string()
    .max(15, "Must be 15 characters or less")
    .required("Required"),
  lName: Yup.string()
    .max(20, "Must be 20 characters or less")
    .required("Required"),
  email: Yup.string().email("Invalid email address"),
  address: Yup.string(),
  phoneNo: Yup.string().required("Phone Number is required"),
  dob: Yup.date().required("Date of birth is required"),
  gender: Yup.string()
    .required("Gender is required")
    .oneOf(["Male", "Female"], "Invalid gender value"),
});

const UserProfile = () => {
  const [gender, setGender] = useState("");
  const [profiledata, setprofile] = useState(false);

  const dobRef = useRef("");
  const [emailError, setEmailError] = useState(false);

  const { getUser } = useAuth();

  const handleChangeGender = (e) => {
    setGender(e.target.value);
  };

  const FetchUserData = async () => {
    const ref = await doc(db, "users", getUser().uid);
    const userdata = await getDoc(ref);

    userData = {
      fName: userdata.data().fName,
      lName: userdata.data().lName,
      email: userdata.data().email,
      phoneNo: userdata.data().phoneNo,
      address: userdata.data().address,
      dob: userdata.data().dob,
      gender: userdata.data().gender,
    };
  };

  const addSignUpData = async (values) => {
    const { fName, lName, email, address, phoneNo, dob, gender } = values;
    let useremail = getUser().email;
    const ref = await doc(db, "users", getUser().uid);
    await setDoc(ref, {
      fName,
      lName,
      phoneNo,
      gender,
      dob,
      useremail,
      address,
    });

    setprofile(true);
    window.location.reload();
  };

  useEffect(() => {
    console.log("Useri ID" + getUser().uid);
    FetchUserData();
  }, [gender, emailError]);

  const genders = ["Male", "Female", "None"];
  return (
    <Container maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Box sx={{ mt: "8px", flexGrow: 1 }}>
          <Formik
            initialValues={initialValues}
            validationSchema={validation}
            onSubmit={(e) => addSignUpData(e)}
          >
            <Form>
              <Grid container columnSpacing={2}>
                <Grid item xs={12} sm={6}>
                  <Field
                    as={TextField}
                    label={"First Name"}
                    name="fName"
                    fullWidth
                    sx={{ mt: 2 }}
                  />
                  <ErrorMessage name="fName" component={"span"} />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Field
                    as={TextField}
                    label={"Last Name"}
                    name="lName"
                    fullWidth
                    margin="normal"
                  />
                  <ErrorMessage name="lName" component={"span"} />
                </Grid>
                <Grid item xs={12}>
                  <Field
                    as={TextField}
                    label={"Email Address"}
                    type={"email"}
                    name="email"
                    value={getUser().email}
                    disabled
                    fullWidth
                    margin="normal"
                  />
                  <ErrorMessage name="email" component={"span"} />
                  {!emailError ? "" : <p>Email Already Exists</p>}
                </Grid>
                <Grid item xs={12}>
                  <Field
                    as={TextField}
                    label={"Address"}
                    name="address"
                    margin="normal"
                    type={"address"}
                    fullWidth
                  />

                  <ErrorMessage name="password" component={"span"} />
                </Grid>
                <Grid item xs={12}>
                  <Field
                    as={TextField}
                    label={"Phone"}
                    name="phoneNo"
                    fullWidth
                    margin="normal"
                    type={"number"}
                  />
                  <ErrorMessage name="phoneNo" component={"span"} />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <Field
                    as={TextField}
                    type={"date"}
                    placeholder="Date of Birth"
                    name="dob"
                    fullWidth
                    refer={dobRef}
                    margin="normal"
                  />
                  <ErrorMessage name="dob" component={"span"} />
                </Grid>
                <Grid item xs={12} sm={6} md={6}>
                  <FormControl
                    sx={{
                      mt: 2,
                      width: {
                        sm: 190,
                        xs: 300,
                      },
                    }}
                  >
                    <InputLabel>Gender</InputLabel>
                    <Field
                      as={Select}
                      value={gender}
                      inputProps={{
                        label: "Gender",
                        name: "gender",
                        onChange: (e) => {
                          handleChangeGender(e);
                        },
                      }}
                    >
                      {genders.map((e, i) => (
                        <MenuItem value={e} key={i}>
                          {e}
                        </MenuItem>
                      ))}
                    </Field>
                  </FormControl>
                  <ErrorMessage name="gender" component={"span"} />
                </Grid>
                <Grid item xs={12}></Grid>
                <Grid item xs={12}>
                  <Button variant="contained" fullWidth type="submit">
                    UPDATE
                  </Button>
                </Grid>
              </Grid>
            </Form>
          </Formik>
        </Box>
      </Box>
    </Container>
  );
};

export default UserProfile;
