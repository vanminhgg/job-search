import { config } from "../Config/config";

const { createContext, useState, Children } = require("react");

export const SearchContext = createContext({});

export default function SearchContextProvider({ children }) {
    const initialSearchParams = {
        benefits: [],
        location: [],
        fromDate: null,
        toDate: null,
        minSalary: null,
        maxSalary: null,
        page: 1,
        sortType: "",
    };

    const [searchParams, setSearchParams] = useState(initialSearchParams);

    const getAllLocations = async () => {
        const response = await fetch(config.apiUrl.concat(config.location));
        return await response.json();
    };
    const getAllBenefits = async () => {
        const response = await fetch(config.apiUrl.concat(config.benefit));
        return await response.json();
    };

    const setParams = (key, value) => {
        setSearchParams((searchParams) => ({
            ...searchParams,
            [key]: value,
        }));
    };

    const search = async (keyword) => {
        const response = await fetch(
            config.apiUrl.concat(config.searchPath, keyword),
            {
                method: "POST",
                body: JSON.stringify(searchParams),
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );
        console.log(searchParams);
       
        return await response.json();
    };

    const contextValue = {
        search,
        searchParams,
        getAllBenefits,
        getAllLocations,
        setParams,
    };

    return (
        <SearchContext.Provider value={contextValue}>
            {children}
        </SearchContext.Provider>
    );
}
