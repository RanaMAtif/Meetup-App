import React from "react";
import ResponsiveAppBar from "./ResponsiveAppBar";
import Grid from "@mui/material/Grid";
import AllMeetupsPage from "../../pages/AllMeetups";
import NewMeetupPage from "../../pages/NewMeetup";
import FavoritesPage from "../../pages/Favorites";
import { AllMeetupConext } from "../../contexts/AllMeetupConext";
import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import UserLandingPage from "../../pages/LandingPage";
import { useAuth } from "../../contexts/AuthContext";
const LazyProfilePage = React.lazy(() => import("../../pages/ProfilePage"));

function NewLayout() {
  const [loadedMeetups, setLoadedMeetups] = useState([]);
  const [isSignup, setSignup] = useState(false);
  const [isProfileUpdated, setUpdateProfile] = useState(false);
  const { getUser } = useAuth();
  var logininfo = getUser();

  console.log("Signup Value in New Layout = " + isSignup);
  return (
    <>
      <AllMeetupConext.Provider
        value={{
          value1: [loadedMeetups, setLoadedMeetups],
          value2: [isSignup, setSignup],
          value3: [isSignup, setSignup],
        }}
      >
        {logininfo && <ResponsiveAppBar />}
        <Grid container>
          <Grid item sm={2} xs={2}></Grid>
          <Grid item sm={7} xs={8} mt={5}>
            {logininfo ? (
              <Routes>
                <Route path="/" element={<AllMeetupsPage />} />
                <Route path="/AllMeetupsPage" element={<AllMeetupsPage />} />
                <Route path="/new-meetup" element={<NewMeetupPage />} />
                <Route path="/favorites" element={<FavoritesPage />} />
                <Route path="/Login" element={<UserLandingPage />} />
                <Route
                  path="ProfilePage"
                  element={
                    <React.Suspense fallback="Loading...">
                      <LazyProfilePage />
                    </React.Suspense>
                  }
                />
              </Routes>
            ) : (
              <Routes>
                <Route path="/" element={<UserLandingPage />} />
                <Route path="/Login" element={<UserLandingPage />} />
                <Route path="/AllMeetupsPage" element={<UserLandingPage />} />
                <Route path="/new-meetup" element={<UserLandingPage />} />
                <Route path="/favorites" element={<UserLandingPage />} />
                <Route path="/profilePage" element={<UserLandingPage />} />
              </Routes>
            )}
          </Grid>
          <Grid item sm={3} xs={2}></Grid>
        </Grid>
      </AllMeetupConext.Provider>
    </>
  );
}

export default NewLayout;
