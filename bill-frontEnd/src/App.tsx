import {
  Container,
  CssBaseline,
  Grid,
  ThemeProvider,
  createTheme,
} from "@mui/material";
import { RouterProvider } from "react-router-dom";
import router from "./components/Routes";
import { ApolloProvider } from "@apollo/client";
import client from "./constants/apollo-client";
import Guard from "./components/auth/Guard";
import Snackbar from "./components/snackbar/Snackbar";
import ChatList from "./components/chat-list/ChatList";
import { usePath } from "./hooks/usePath";
// import {
//   Modal,
//   ModalConsumer,
//   ModalContext,
//   ModalProvider,
// } from "./context/modalContext";
import { useState } from "react";
import InvoiceForm from "./components/chat-list/Invoice";
import { FilterList } from "./components/girvi/FilterList";
import { GirviList } from "./components/girvi/GirviList";
import { SearchProvider } from "./components/context/SearchContext";
import { TimeFilterProvider } from "./components/context/TimeFilterContext";
import Header from "./components/header/Header";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});
const lightTheme = createTheme({
  palette: {
    mode: "light",
  },
});

const App = () => {
  const { path } = usePath();

  const [isLightTheme, setIsLightTheme] = useState(false);
  const [filter, setFilter] = useState("all");
  const [sort, setSort] = useState("number");

  const handleThemeChange = () => {
    setIsLightTheme((prevTheme: Boolean) => !prevTheme);
  };
  // const modal = useContext()
  // const { openModal } = useContext(ModalContext);
  const showBillList = path === "/" || path.includes("bills");
  const showGirviList = path === "/girvi" || path.includes("girviru");
  // return (
  //   <ApolloProvider client={client}>
  //     <ThemeProvider theme={darkTheme}>
  //       <CssBaseline />
  //       <Header />
  //       <Guard>
  //         <ModalProvider>
  //           {path === "/" ? (
  //             <Grid container>
  //               <Grid item md={3}>
  //                 <ChatList />
  //               </Grid>
  //               <Grid item md={9}>
  //                 <Modal></Modal>
  //                 <Routes />
  //               </Grid>
  //             </Grid>
  //           ) : (
  //             <Routes />
  //           )}
  //         </ModalProvider>
  //       </Guard>
  //       <Snackbar />
  //     </ThemeProvider>
  //   </ApolloProvider>
  // );
  return (
    <ApolloProvider client={client}>
      {/* <ThemeProvider theme={isLightTheme ? lightTheme : darkTheme}> */}
      <ThemeProvider theme={isLightTheme ? lightTheme : lightTheme}>
        <CssBaseline />
        <Header />
        <TimeFilterProvider>
          <SearchProvider>
            <Guard>
              {showBillList ? (
                <Grid container>
                  <Grid item md={3}>
                    <ChatList />
                  </Grid>
                  <Grid item md={9}>
                    <InvoiceForm onThemeToggle={handleThemeChange} />
                    {/* <Modal></Modal> */}
                    {/* <Routes /> */}
                  </Grid>
                </Grid>
              ) : showGirviList ? (
                <Grid container>
                  <Grid item md={3}>
                    <FilterList
                      filter={filter}
                      setFilter={setFilter}
                      sort={sort}
                      setSort={setSort}
                    />
                  </Grid>
                  <Grid item md={9}>
                    <GirviList
                      filter={filter}
                      sort={sort}
                      // number={seriesData?.seriesRange}
                    />
                    {/* <h1>Hello worlds</h1> */}
                  </Grid>
                </Grid>
              ) : (
                // <div>
                //   <h1>Hello World</h1>
                //   {/* You can replace this with any component you want to show on the /girvi path */}
                // </div>
                <Routes />
              )}
            </Guard>
          </SearchProvider>
        </TimeFilterProvider>
        <Snackbar />
        {/* <Modal /> */}
      </ThemeProvider>
    </ApolloProvider>
  );
};

const Routes = () => {
  return (
    <Container sx={{ height: "100%" }}>
      <RouterProvider router={router} />
    </Container>
  );
};

export default App;
