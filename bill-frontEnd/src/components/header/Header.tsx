import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Container from "@mui/material/Container";
import Branding from "./Branding";
import MobileNavigation from "./mobile/MobileNavigation";
import MobileBranding from "./mobile/MobileBranding";
import Navigation from "./Navigation";
import Settings from "./Settings";
import { useReactiveVar } from "@apollo/client";
import { authenticatedVar } from "../../constants/authenticated";
import { Page } from "../../interfaces/page.interface";
import { useFindRange } from "../../hooks/useFindRange";

const Header = () => {
  const authenticated = useReactiveVar(authenticatedVar);
  const { data: seriesData } = useFindRange();
  const smallestSeries = seriesData?.seriesRange?.smallest;
  const largestSeries = seriesData?.seriesRange?.largest;

  const pages: Page[] = [
    {
      title: "Bill",
      path: "/",
    },
    {
      title: "Girvi",
      path: smallestSeries ? `/girvi` : "/girvi",
    },
  ];

  const unauthenticatedPages: Page[] = [
    {
      title: "Login",
      path: "/login",
    },
    {
      title: "Signup",
      path: "/signup",
    },
  ];
  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Branding />
          <MobileNavigation
            pages={authenticated ? pages : unauthenticatedPages}
          />
          <MobileBranding />
          <Navigation pages={authenticated ? pages : unauthenticatedPages} />
          {authenticated && <Settings />}
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default Header;
