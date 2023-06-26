import * as React from "react";
import Grid from "@mui/material/Grid";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import bg1 from "../images/meetup_img.jpg";
import bg2 from "../images/meetup_img1.jpg";
import bg3 from "../images/meetup_img2.jpg";
import bg4 from "../images/meetup_img3.jpg";
import { useState, useEffect, useContext } from "react";
import { AllMeetupConext } from "../contexts/AllMeetupConext";
import UserProfile from "./UserProfile";
import ProfileCard from "../pages/ProfileCard";

const theme = createTheme();

function ProfilePage() {
  const [isMobile, setIsMobile] = useState(false);
  const [gridSize, setgridSize] = useState("94vh");
  const [cardSize, setcardSize] = useState("800");
  const { value1, value2 } = useContext(AllMeetupConext);
  const [isSignup, setSignup] = value2;

  console.log("Landing page Signup value =" + isSignup);

  useEffect(() => {
    window.addEventListener("resize", handleResize);

    if (window.innerWidth < 720) {
      setIsMobile(true);
      setgridSize("119vh");
      setcardSize("1000");
    } else {
      setIsMobile(false);
      setgridSize("80vh");
      setcardSize("120vh");
    }
  });

  const pictureArray = [bg1, bg2, bg3, bg4];
  const randomIndex = Math.floor(Math.random() * pictureArray.length);

  const handleResize = () => {
    if (window.innerWidth < 720) {
      setIsMobile(true);
      setgridSize("119vh");
      setcardSize("38vh");
    } else {
      setIsMobile(false);
      setgridSize("80vh");
      setcardSize("120vh");
    }
  };
  console.log("CardSize =" + cardSize);

  return (
    <ThemeProvider theme={theme}>
      <Grid
        container
        component="main"
        sx={{ height: gridSize, width: cardSize, marginTop: 10 }}
        elevation={6}
        square
      >
        <Grid item xs={0} sm={4} md={7}>
          <UserProfile />
        </Grid>

        <Grid item xs={12} sm={8} md={5} marginTop={15}>
          <ProfileCard />
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}
export default ProfilePage;
