import { useContext } from "react";
import { SearchContext } from "../Context";

export default function useSearch() {
    /**
     * @typedef {Object} JobObject
     * @property {string[]} benefits
     * @property {string[]} location
     * @property {string[]} categories
     * @property {string} level
     * @property {string} fromDate
     * @property {string} toDate
     * @property {number} minSalary
     * @property {number} maxSalary
     * @property {number} page
     * @property {string} sortType
     */

    /**
     * @typedef {Object} SearchService
     * @property {(keyword: any) => Promise<any>} search
     * @property {JobObject} searchParams
     * @property {() => Promise<any>} getAllBenefits
     * @property {() => Promise<any>} getAllLocations
     * @property {() => Promise<any>} getAllLevels
     * @property {() => Promise<any>} getAllCategories
     * @property {() => Promise<any>} getAllSkills
     * @property {(key: any, value: any) => void} setParams
     */

    /**
     * @type {SearchService}
     */
    const search = useContext(SearchContext);
    return search;
}
