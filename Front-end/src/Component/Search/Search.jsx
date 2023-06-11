import styled from "@emotion/styled";

import {
    Box,
    InputBase,
    Pagination,
    Skeleton,
    Toolbar,
    Typography,
    alpha,
} from "@mui/material";
import { SearchRounded } from "@mui/icons-material";
import { useEffect, useRef, useState } from "react";
import { config } from "../../Config/config";
import JobCard from "./Job/JobCard";
import useSearch from "../../Hook/useSearch";

export default function Search() {
    const [keyword, setKeyword] = useState(null);
    const [data, setData] = useState(null);
    const [searchValue, setSearchValue] = useState(null);
    const [pageNumber, setPageNumber] = useState(1);
    const [count, setCount] = useState(1);
    const [loading, setLoading] = useState(false);
    const ref = useRef();
    const search = useSearch();

    useEffect(() => {
        const timeOutId = setTimeout(() => setKeyword(searchValue), 500);
        return () => clearTimeout(timeOutId);
    }, [searchValue]);

    useEffect(() => {
        if (!keyword) return;
        setLoading(true);

        const fetchData = async () => {
            if (!keyword) {
                setLoading(false);
                setData(null);
                return;
            }
            const results = await search.search(keyword);
            setLoading(false);
            setCount(results.count);
            console.log(results)
            setPageNumber(Math.ceil(results.count / 9));
            setData(results.data.map((d) => d._source));
        };

        fetchData();
        
    }, [keyword, search.searchParams]);

    const searhReult = () => {
        if (loading)
            return Array.from({ length: 3 }, (_, index) => {
                return <SkeletonBox key={index} />;
            });

        if (data && data?.length > 0)
            return data.map((job, index) => {
                return <JobCard key={index} job={job} />;
            });
        if(keyword) return "Không có kết quả"
        return ""
    };

    return (
        <Box sx={{ display: "flex", flexDirection: "column", width: "100%" }}>
            <Toolbar
                sx={{
                    width: "100%",
                    display: "flex",
                    top: 0,
                    left: 0,
                }}
            >
                <SearchBar>
                    <SearchIconWrapper>
                        <SearchRounded color="white" />
                    </SearchIconWrapper>
                    <StyledInputBase
                        placeholder="Bạn muốn tìm gì..."
                        inputProps={{ "aria-label": "search" }}
                        color="white"
                        ref={ref}
                        onChange={(e) => setSearchValue(e.currentTarget.value)}
                    />
                </SearchBar>
                {data && (
                    <Typography marginLeft="auto" color="primary">
                        Tìm được {count} kết quả
                    </Typography>
                )}
            </Toolbar>

            <Box
                sx={{
                    display: "flex",
                    gap: "20px",
                    padding: "20px",
                    height: "100%",
                    flexDirection: "column",
                    overflowY: "scroll",
                    overflowX: "hidden",
                    msOverflowStyle: "none",
                    scrollbarWidth: "none",
                    "&::-webkit-scrollbar": {
                        display: "none",
                    },
                }}
            >
                {searhReult()}
            </Box>
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "center",
                    minHeight: "50px",
                    padding: "10px",
                    width: '100%',
                    backgroundColor: 'rgba(25,25,25,0.5)'
                }}
            >
                {data && (
                    <Pagination
                        count={pageNumber}
                        page={search.searchParams.page}
                        onChange={(_, page) => search.setParams("page", page)}
                        variant="outlined"
                        color="secondary"
                        shape="rounded"
                    />
                )}
            </Box>
        </Box>
    );
}

//----------------------------------------------------------//

const SearchBar = styled("div")(({ theme }) => ({
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.black, 0.3),
    "& :focus": {
        backgroundColor: alpha(theme.palette.common.black, 0.5),
    },
    overflow: "hidden",
    marginLeft: 0,
    color: "white",
    width: "100%",
    [theme.breakpoints.up("sm")]: {
        marginLeft: theme.spacing(1),
        width: "auto",
    },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
    zIndex: 1,
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: "inherit",
    "& .MuiInputBase-input": {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create("width"),
        width: "100%",
        [theme.breakpoints.up("sm")]: {
            width: "30ch",
            "&:focus": {
                width: "100ch",
            },
        },
    },
}));

const SkeletonBox = () => {
    return (
        <Box
            sx={{
                backgroundColor: "rgba(25,25,45,0.9)",
                borderRadius: "30px",
                boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
                paddingX: "40px",
                paddingY: "20px",
                width: "100%",
                height: "400px",
                display: "flex",
                flexDirection: "column",
                gap: "5%",
            }}
        >
            <Skeleton width="100%" height="25%" />
            <Skeleton width="100%" height="15%" />
            <Skeleton width="100%" height="15%" />
            <Skeleton width="100%" height="15%" />
        </Box>
    );
};
