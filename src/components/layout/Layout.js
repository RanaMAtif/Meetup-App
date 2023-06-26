import React from "react";
import ResponsiveAppBar from "./ResponsiveAppBar";
import Container from "@mui/material/Container";

function Layout(props) {
  console.log("In Layout");

  return (
    <div>
      <Container maxWidth="lg" sx={{ margin: "80px auto" }}>
        {props.children}
      </Container>
    </div>
  );
}

export default Layout;
