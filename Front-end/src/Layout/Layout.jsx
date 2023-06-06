import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import Header from "./Header";
import Nav from "./Nav";
import styled from "@emotion/styled";
import darkScrollbar from "@mui/material/darkScrollbar";
import { SearchContextProvider } from "../Context";
export default function Layout({ children }) {
    return (
        <ThemeProvider theme={theme}>
            <SearchContextProvider>
                <CssBaseline />
                <AppLayout>
                    <Header />
                    <Nav />
                    <Main>{children}</Main>
                </AppLayout>
            </SearchContextProvider>
        </ThemeProvider>
    );
}

const theme = createTheme({
    palette: {
        mode: "dark",
    },
    typography: {
        allVariants: {
            color: "white",
        },
        fontFamily: ['"Open Sans"', "sans-serif"].join(","),
    },
});

const AppLayout = styled("div")(({ theme }) => ({
    display: "grid",

    width: "100%",
    height: "100%",
    backgroundSize: "cover",
    gridTemplateAreas: `
                'header header header'
                'nav main main'
                'footer footer footer'
               `,
    gridTemplateRows: "auto 1fr auto",
    gridTemplateColumns: "auto 1fr auto",
    backgroundImage: "url(/background.jpg)",
}));

const Main = styled("div")(({ theme }) => ({
    width: "100%",
    height: "100%",
    overflow: "hidden",
    gridArea: "main",
    display: "flex",
}));
