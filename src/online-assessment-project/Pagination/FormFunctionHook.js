import { useState } from "react"

function FormFunctionHook(...props) {
    const [displayPages, displayPageItems, page] = props;

    const [currentPage, setCurrentPage] = useState(1)
    const getEachItem = () => {
        const startIndex = (currentPage * displayPageItems) - displayPageItems
        const endIndex = startIndex + displayPageItems
        return [endIndex]
    }
    const goToPrevPage = (e) => {
        setCurrentPage(currentPage - 1)

    }

    const goToNextPage = (e) => {
        if (currentPage<page) {
            console.log(page)
            setCurrentPage(currentPage + 1)
        }
    }

    const getPageNumbers = () => {
        let start = Math.floor((currentPage - 1) / displayPages) * displayPages //0
        let end=Math.min(start+displayPages-1,page)
        console.log("it I am", start)
        return new Array(end-start+1).fill().map((_, idx) => start + idx+1)//1


    }
    const changePage = (item) => {
        console.log(item, "pagedfghjktyuiopfghjkl;tyuiop", page)

        setCurrentPage(item)
        console.log(item, "pagedfghjktyuiopfghjkl;tyuiop", page)

    }
    

    return {
    
        getEachItem,
        goToPrevPage,
        goToNextPage,
        getPageNumbers,
        changePage

    }
}
export default FormFunctionHook