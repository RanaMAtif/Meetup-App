import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import bg1 from "../images/meetup_img.jpg";
import bg2 from "../images/meetup_img1.jpg";
import bg3 from "../images/meetup_img2.jpg";
import bg4 from "../images/meetup_img3.jpg";
import { useState, useEffect, useContext } from "react";
import Login from "./Login";
import { AllMeetupConext } from "../contexts/AllMeetupConext";
import SignUp from "./SignUp";

const theme = createTheme();

export default function LoginPage() {
  const [isMobile, setIsMobile] = useState(false);
  const [gridSize, setgridSize] = useState("94vh");
  const { value1, value2 } = useContext(AllMeetupConext);
  const [isSignup, setSignup] = value2;

  console.log("Landing page Signup value =" + isSignup);

  useEffect(() => {
    window.addEventListener("resize", handleResize);

    if (window.innerWidth < 720) {
      setIsMobile(true);
      setgridSize("25vh");
    } else {
      setIsMobile(false);
      setgridSize("95vh");
    }

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  });

  const pictureArray = [bg1, bg2, bg3, bg4];
  const randomIndex = Math.floor(Math.random() * pictureArray.length);
  const selectedPicture = pictureArray[randomIndex];

  const handleResize = () => {
    if (window.innerWidth < 720) {
      setIsMobile(true);
      setgridSize("25vh");
    } else {
      setIsMobile(false);
      setgridSize("95vh");
    }
  };
  return (
    <ThemeProvider theme={theme}>
      <Grid container component="main" sx={{ height: gridSize }}>
        <CssBaseline />
        <Grid
          item
          xs={0}
          sm={4}
          md={7}
          sx={{
            backgroundImage: `url(${selectedPicture})`,
            backgroundRepeat: "no-repeat",
            backgroundColor: (t) =>
              t.palette.mode === "light"
                ? t.palette.grey[50]
                : t.palette.grey[900],
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          {isSignup ? <SignUp /> : <Login />}
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}
