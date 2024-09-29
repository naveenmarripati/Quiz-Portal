
import { useState } from "react"
import FormFunctionHook from "./FormFunctionHook.js"
import FormBlogPage from "./FormBlogPage.js"
function PageRoot(props) {

    const { displayPages, displayPageItems, page } = props
    //const sendData=props;
    const [num, setnum] = useState();
    const one = (e, num) => {
        e.preventDefault()
        setnum(num)
    }
    //console.log(sendData)
    const { getEachItem, goToPrevPage, goToNextPage, getPageNumbers, changePage } = FormFunctionHook(displayPages, displayPageItems, page)


    return (
        <>
            <div>

                {
                    getEachItem().map((item) => {


                            if (item <= page ) {
                                return (
                                    <>
                                    <FormBlogPage number={item}></FormBlogPage>
                                    </>
                                )
                            }
                        

                    }
                    )}
            </div>
            <div>
                <button onClick={(e) => goToPrevPage(e)}>prev</button>

                {
                    getPageNumbers().map((item) => {
                        <button className="current" onClick={(e) => changePage(item)}>{item}</button>
                        if (item <= page && item >= 1) {

                            return <button onClick={(e) => changePage(item)}>{item}</button>
                        }
                    })
                }

                <button onClick={(e) => goToNextPage(e)}>next</button>
            </div>

        </>
    )
}
export default PageRoot