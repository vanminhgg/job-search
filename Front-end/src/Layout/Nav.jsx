import {
    Autocomplete,
    Box,
    Button,
    IconButton,
    ListItem,
    MenuList,
    TextField,
    ToggleButton,
    ToggleButtonGroup,
    Typography,
    styled,
} from "@mui/material";
import { useEffect, useState } from "react";
import useSearch from "../Hook/useSearch";

import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers";
import {
    ArrowCircleDownRounded,
    ArrowCircleUpRounded,
    ArrowDownwardRounded,
    ArrowUpwardRounded,
} from "@mui/icons-material";

const NavBox = styled("div")(({ theme }) => ({
    height: "100%",
    width: "400px", // Set the desired width for the sidebar
    gridArea: "nav",
    backgroundColor: "rgba(15,15,50,0.5)",
    padding: "30px",
}));

export default function Nav() {
    const [locations, setLocations] = useState([]);
    const [benefits, setBenefits] = useState([]);
    const [sort, setSort] = useState("");
    const [sortOrder, setSortOrder] = useState("asc");
    const search = useSearch();

    const handleSortChange = (event) => {
        if (!event.target.value) {
            setSort("");
        } else {
            setSort(event.target.value !== sort ? event.target.value : "");
        }
    };
    const handleSortOrder = (event) => {
        setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    };
    useEffect(() => {
        if (!sort) {
            search.setParams("sortType", null);
            return;
        }
        search.setParams("sortType", sortOrder.concat(sort));
        console.log(sortOrder.concat(sort));
        return () => search.setParams("sortType", null);
    }, [sort, sortOrder]);

    useEffect(() => {
        const fetchData = async () => {
            const locationList = await search.getAllLocations();
            console.log(locationList);
            setLocations(locationList);
        };
        fetchData();
        return () => {
            setLocations([]);
        };
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            setBenefits(await search.getAllBenefits());
        };
        fetchData();
        return () => {
            setBenefits([]);
        };
    }, []);

    return (
        <NavBox>
            <MenuList>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <Typography color="primary" variant="h5">
                        Thời gian đăng
                    </Typography>
                    <ListItem>
                        <DatePicker
                            sx={{ width: "100%" }}
                            value={search.searchParams.fromDate}
                            label="Từ ngày"
                            onChange={(value) =>
                                search.setParams("fromDate", value)
                            }
                        />
                    </ListItem>
                    <ListItem>
                        <DatePicker
                            sx={{ width: "100%" }}
                            value={search.searchParams.toDate}
                            label="Đến ngày"
                            onChange={(value) =>
                                search.setParams("toDate", value)
                            }
                        />
                    </ListItem>
                    <Typography color="primary" variant="h5">
                        Lương
                    </Typography>
                    <ListItem>
                        <NumericInput
                            label="Lương tối thiểu"
                            value={search.searchParams.minSalary}
                            onChange={(value) =>
                                search.setParams(
                                    "minSalary",
                                    value ? Number(value) : null
                                )
                            }
                        />
                    </ListItem>
                    <ListItem>
                        <NumericInput
                            label="Lương tối đa"
                            value={search.searchParams.maxSalary}
                            onChange={(value) => {
                                search.setParams(
                                    "maxSalary",
                                    value ? Number(value) : null
                                );
                                console.log(value);
                            }}
                        />
                    </ListItem>
                    <Typography color="primary" variant="h5">
                        Sắp xếp
                    </Typography>
                    <ListItem>
                        <ToggleButtonGroup
                            sx={{ width: "100%" }}
                            size="large"
                            color="primary"
                            onChange={handleSortChange}
                            value={sort !== "" ? [sort] : []}
                        >
                            <ToggleButton value="Date" sx={{ width: "100%" }}>
                                Ngày đăng
                            </ToggleButton>
                            <ToggleButton value="Salary" sx={{ width: "100%" }}>
                                Mức lương
                            </ToggleButton>
                        </ToggleButtonGroup>
                        {sort && (
                            <IconButton
                                onClick={handleSortOrder}
                                color="secondary"
                            >
                                {sortOrder === "asc" ? (
                                    <ArrowCircleUpRounded />
                                ) : (
                                    <ArrowCircleDownRounded />
                                )}
                            </IconButton>
                        )}
                    </ListItem>

                    <Typography color="primary" variant="h5">
                        Lựa chọn khác
                    </Typography>
                    <ListItem>
                        <Autocomplete
                            sx={{ width: "100%" }}
                            multiple
                            options={locations}
                            value={search.searchParams.location}
                            filterSelectedOptions
                            onChange={(_, value) =>
                                search.setParams("location", value)
                            }
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    label="Địa điểm"
                                    placeholder="Địa điểm"
                                />
                            )}
                        />
                    </ListItem>
                    <ListItem>
                        <Autocomplete
                            sx={{ width: "100%" }}
                            multiple
                            options={benefits}
                            value={search.searchParams.benefits}
                            filterSelectedOptions
                            onChange={(_, value) =>
                                search.setParams("benefits", value)
                            }
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    label="Ưu đãi"
                                    placeholder="Ưu đãi"
                                />
                            )}
                        />
                    </ListItem>
                </LocalizationProvider>
            </MenuList>
        </NavBox>
    );
}

export function NumericInput({ onChange, value, label, placeholder }) {
    const [inputValue, setInputValue] = useState(value);

    useEffect(() => {
        const timer = setTimeout(() => {
            onChange(inputValue ? inputValue : null);
        }, 1000);

        return () => {
            clearTimeout(timer);
        };
    }, [inputValue]);

    const handleChange = (event) => {
        setInputValue(event.target.value);
    };

    return (
        <TextField
            sx={{ width: "100%" }}
            label={label}
            type="number"
            value={inputValue}
            onChange={handleChange}
            placeholder={placeholder}
        />
    );
}
