import logo from "./logo.svg";
import "./App.css";
import { Layout } from "./Layout";
import { CssBaseline } from "@mui/material";
import { Search } from "./Component/Search";



function App() {
    return (
        <div style={{ width : '100%', height : '100vh'}}>
           
            <Layout><Search/></Layout>
        </div>
    );
}

export default App;
