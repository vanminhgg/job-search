import React, { createContext, useState } from "react";
import { config } from "../Config/config";

export const SearchContext = createContext({});

export default function SearchContextProvider({ children }) {
    /**
     * @typedef {Object} JobObject
     * @property {string[]} benefits 
     * @property {string[]} location 
     * @property {string[]} categories
     * @property {string} level
     * @property {Date} fromDate 
     * @property {string} toDate 
     * @property {number} minSalary 
     * @property {number} maxSalary
     * @property {number} page
     * @property {string} sortType
     */

    const initialJobObject = {
        benefits: [],
        location: [],
        categories: [],
        level: null,
        fromDate: null,
        toDate: null,
        minSalary: null,
        maxSalary: null,
        page: 0,
        sortType: "",
    };

    const [searchParams, setSearchParams] = useState(
        /** @type {JobObject} */ (initialJobObject)
    );

    const getAllLocations = async () => {
        const response = await fetch(config.apiUrl.concat(config.location));
        return await response.json();
    };

    const getAllBenefits = async () => {
        const response = await fetch(config.apiUrl.concat(config.benefit));
        return await response.json();
    };

    const getAllLevels = async () => {
        const response = await fetch(config.apiUrl.concat(config.level));
        return await response.json();
    };

    const getAllCategories = async () => {
        const response = await fetch(config.apiUrl.concat(config.category));
        return await response.json();
    };

    const getAllSkills = async () => {
        const response = await fetch(config.apiUrl.concat(config.skill));
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
        getAllLevels,
        getAllCategories,
        getAllSkills,
        setParams,
    };

    return (
        <SearchContext.Provider value={contextValue}>
            {children}
        </SearchContext.Provider>
    );
}
