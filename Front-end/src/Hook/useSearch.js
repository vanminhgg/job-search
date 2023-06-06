import { useContext } from "react";
import { SearchContext } from "../Context";

export default function useSearch() {
    /**
     * @typedef {Object} SearchService
     * @property {(keyword: any) => Promise<any>} search 
     * @property {{
     *    benefits: never[];
     *    location: never[];
     *    fromDate: null;
     *    toDate: null;
     *    minSalary: number|null;
     *    maxSalary: number|null;
     *    page: number;
     *    sortType: string;
     * }} searchParams 
     * @property {() => Promise<any>} getAllBenefits 
     * @property {() => Promise<any>} getAllLocations 
     * @property {(key: any, value: any) => void} setParams 
     */

    /**
     * @type {SearchService}
     */
    const search = useContext(SearchContext);
    return search;
}
