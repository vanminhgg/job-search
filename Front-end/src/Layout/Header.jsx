import * as React from "react";
import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import InputBase from "@mui/material/InputBase";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import { Card, Paper } from "@mui/material";

export default function Header() {
    return (
        <Box sx={{ flexGrow: 1, gridArea: "header" }}>
            <Toolbar>
                <IconButton
                    size="large"
                    edge="start"
                    aria-label="open drawer"
                    sx={{ mr: 2 }}
                >
                    <MenuIcon color="inherit" />
                </IconButton>
                <Typography
                    variant="h6"
                    noWrap
                    component="div"
                    sx={{
                        flexGrow: 1,
                        display: { xs: "none", sm: "block" },
                    }}
                 
                >
                    JOB SEARCH
                </Typography>
            </Toolbar>
        </Box>
    );
}
