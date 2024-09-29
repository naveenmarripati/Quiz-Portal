import { useParams } from "react-router-dom"
function Language(){
    const params = useParams()
    console.log("lANGUAGES",params)
    return(
        <>
        <h1>Language</h1>
        </>
    )
}
export default Language