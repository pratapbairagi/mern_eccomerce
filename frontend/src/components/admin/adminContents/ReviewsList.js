import { useState, useEffect } from "react"
import { NavLink
 } from "react-router-dom"
const ReviewsList = ({reviews}) => {

    const [filteredReview, setFilteredReview] = useState([])
    var [search, setSearch] = useState("")


    const searchReviewInputHandler = (e)=>{
         setSearch(e.target.value)
    }
    useEffect(()=>{
        if(search.length>0){
            setFilteredReview(reviews.filter(v=>v.name.includes(search)))
         }
         else{
             setFilteredReview(reviews)
         }
    },[search, reviews])


    return (
        <div className="usersList_container" style={{width:"100%"}}>
            <input onChange={searchReviewInputHandler} style={{width:"100%", padding:"2px 10px", color:"grey", outline:"none", border:"none", borderBottom:"1px solid tomato",textAlign:"center"}} type="search" placeholder="Search Review..." name="" id="" />
           
        <div className="tableContainer" style={{width:"100%", maxWidth:"100%", overflowX:"auto", overflowY:"hidden"}}>
        
        <table className="table" style={{width:"100%", margin:".5rem 0"}}>
            <thead>
                <tr>
                    <td style={{whiteSpace:"nowrap"}}>No</td>
                    <td style={{whiteSpace:"nowrap"}}>Review ID</td>
                    <td style={{whiteSpace:"nowrap"}}>Rating</td>
                    <td style={{whiteSpace:"nowrap"}}>Comment</td>

                    <td style={{whiteSpace:"nowrap"}}>User name</td>
                    <td style={{whiteSpace:"nowrap"}}>User ID</td>
                    <td style={{whiteSpace:"nowrap"}}>User Image</td>
                    <td style={{whiteSpace:"nowrap"}}>Created</td>
                    <td style={{whiteSpace:"nowrap"}}>Link</td>
                    {/* <td style={{whiteSpace:"nowrap"}}>Edit</td> */}
                    <td style={{whiteSpace:"nowrap"}}>Delete</td>
                </tr>
            </thead>
            <tbody style={{width:"100%", maxWidth:"100%", overflowY:"auto"}}>
                {filteredReview.map((r,i)=>{
               return <tr key={i} style={{fontSize:"90%"}}>
                    <td>{i+1}</td>
                    <td>{r._id}</td>
                   
                    <td>{r.rating}</td>
                    <td title={r.comment} style={{maxWidth:"3rem", cursor:"auto", overflow:"hidden", whiteSpace:"nowrap", textOverflow:"ellipsis"}}>{r.comment}</td>
                    <td>{r.name}</td>
                    <td>{r.user}</td>
                    <td>
                        user image
                        {/* <img style={{width:"2rem"}} src={r.images[0].url} alt="" /> */}
                    </td>


                    {/* <td>{p.price}</td> */}
                    {/* <td>{(p.ratings).toFixed(2)}</td> */}
                    <td style={{fontSize:"90%", display:"flex", flexDirection:"column"}}>
                         <span style={{whiteSpace:"nowrap"}}> {new Date(r.time).toLocaleString().split(",")[0]} </span>
                         <span style={{whiteSpace:"nowrap"}}> {new Date(r.time).toLocaleString().split(",")[1]} </span>
                    </td>
                    <td>Link</td>

                    {/* <td>
                        <button>Edit</button>
                    </td> */}
                    <td>
                        <button>Delete</button>
                    </td>
                </tr>
                 })}
            </tbody>

        </table>
        </div>
    </div>
)}
export default ReviewsList;