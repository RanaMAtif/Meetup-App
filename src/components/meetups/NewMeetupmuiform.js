import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";

const initialValues = {
  meetUpTitle: "",
  imgUrl: "",
  address: "",
  description: "",
};

const validate = (values) => {
  const errors = {};
  const { meetUpTitle, imgUrl, address, description } = values;

  if (!meetUpTitle) {
    errors.meetUpTitle = "Please enter Meetup Title";
  }
  if (!imgUrl) {
    errors.imgUrl = "Please enter Img Url";
  }

  if (!address) {
    errors.address = "Please enter address";
  }

  if (!description) {
    errors.description = "Please enter description";
  }

  return errors;
};

const NewMeetupmuiform = (props) => {
  const onAdd = (values, { resetForm }) => {
    const meetupData = {
      title: values.meetUpTitle,
      image: values.imgUrl,
      address: values.address,
      description: values.description,
      like: false,
    };

    props.onAddMeetup(meetupData);
    // Reset the form fields
    resetForm();
  };

  return (
    <Box maxWidth={"md"} ml={"5rem"}>
      <Formik
        initialValues={initialValues}
        validate={validate}
        onSubmit={onAdd}
      >
        <Form>
          <Card sx={{ minWidth: 275 }}>
            <CardContent>
              <Typography sx={{ fontSize: 22, fontWeight: "bold" }}>
                Meetup Title
              </Typography>
              <Field
                as={TextField}
                id="meetuptitle"
                name="meetUpTitle"
                variant="outlined"
                fullWidth
              />
              <ErrorMessage name="meetUpTitle" component={"span"} />
              <Typography sx={{ fontSize: 22, fontWeight: "bold", mt: 2 }}>
                Meetup Image
              </Typography>
              <Field
                as={TextField}
                id="imgurl"
                name="imgUrl"
                variant="outlined"
                fullWidth
              />
              <ErrorMessage name="imgUrl" component={"span"} />

              <Typography sx={{ fontSize: 22, fontWeight: "bold", mt: 2 }}>
                Address
              </Typography>
              <Field
                as={TextField}
                id="address"
                name="address"
                variant="outlined"
                fullWidth
              />
              <ErrorMessage name="address" component={"span"} />
              <Typography sx={{ fontSize: 22, fontWeight: "bold", mt: 2 }}>
                Description
              </Typography>
              <Field
                as={TextField}
                id="description"
                name="description"
                variant="outlined"
                multiline
                fullWidth
                rows={4}
              />
              <ErrorMessage name="description" component={"span"} />
            </CardContent>

            <CardActions>
              <Button
                variant="contained"
                size="medium"
                type="submit"
                sx={{ ml: "auto" }}
              >
                Add Meetup
              </Button>
            </CardActions>
          </Card>
        </Form>
      </Formik>
    </Box>
  );
};

export default NewMeetupmuiform;
