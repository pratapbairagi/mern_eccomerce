import { useEffect, useState } from "react"
import { useAlert } from "react-alert"

const ShippingInfo = ({history}) =>{
    const alert = useAlert()
    const [shipmentDetails, setShipmentDetails] = useState({
        name:"",
        address:"",
        country:"",
        state:"",
        city:"",
        phone:"",
        pinCode:""
    })

    useEffect(()=>{
        if(localStorage.getItem("shippingAddress")){
            const prevAddress = JSON.parse(localStorage.getItem("shippingAddress"))
            setShipmentDetails({
                name : prevAddress.name,
                address : prevAddress.address,
                country : prevAddress.country,
                state : prevAddress.state,
                city : prevAddress.city,
                phone : prevAddress.phone,
                pinCode : prevAddress.pinCode
            })
        }
    },[])

    const shipmentDetailsHandler = (e) =>{
        const {name, value} = e.target
        setShipmentDetails({...shipmentDetails, [name]: value})
    }

    const submitSippingInfoHandler = (e) =>{
        e.preventDefault()
        if(shipmentDetails.name && shipmentDetails.address && shipmentDetails.country && shipmentDetails.state && shipmentDetails.city && shipmentDetails.phone && shipmentDetails.pinCode){
            localStorage.setItem("shippingAddress", JSON.stringify(shipmentDetails))
            history.push("/order/confirm") 
        }
        else{
            alert.error("All fields are required !", {position:"bottom center"})
        }
    }
    return(
        <div className="shippingInfo_container" style={{width:"100%", minHeight:"90vh", marginTop:"17vh", display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center"}}>
            <form onSubmit={submitSippingInfoHandler} className="shippingInfoForm" style={{maxWidth:"30rem", width:"90%", display:"flex", marginTop:".4rem", flexDirection:"column", alignItems:"center", justifyContent:"center", rowGap:"8px", boxShadow:"0 1px 4px rgba(151, 151, 151, 0.418)", borderRadius:"6px", padding:"1.5rem 2.5rem", background:"white" }}>
            <h4 style={{borderBottom:"2px solid tomato", color:"tomato"}}>SHIPPING INFO</h4>
                <label htmlFor="" style={{width:"100%", position:"relative"}}>
                    {/* <span style={{position:"absolute", top:"-0.9rem", right:".3rem", padding:"1px 6px", background:"white", color:"tomato", fontWeight:"400"}}>Name</span> */}
                <input style={{height:"2.4rem", border:"none", borderBottom:"1px solid tomato", borderRadius:"0", color:"grey", textAlign:"center"}} placeholder="Enter your Name" type="text" name="name" onChange={shipmentDetailsHandler} value={shipmentDetails.name} className={`form-control ${shipmentDetails.name.length > 2 && "is-valid"}`} required />
                </label>

                <label htmlFor="" style={{width:"100%", position:"relative"}}>
                    {/* <span style={{position:"absolute", top:"-0.9rem", right:".3rem", padding:"1px 6px", background:"white", color:"tomato", fontWeight:"500"}}>Country</span> */}
                <input style={{height:"2.4rem", border:"none", borderBottom:"1px solid tomato", borderRadius:"0",color:"grey", textAlign:"center"}} placeholder="Enter Country Name" type="text" name="country" onChange={shipmentDetailsHandler} value={shipmentDetails.country}  className={`form-control ${shipmentDetails.country && "is-valid"}`} required />
                </label>

                <label htmlFor="" style={{width:"100%", position:"relative"}}>
                    {/* <span style={{position:"absolute", top:"-0.9rem", right:".3rem", padding:"1px 6px", background:"white", color:"tomato", fontWeight:"500"}}>State</span> */}
                <input style={{height:"2.4rem", border:"none", borderBottom:"1px solid tomato", borderRadius:"0",color:"grey", textAlign:"center"}} placeholder="Enter State Name" type="text" name="state" onChange={shipmentDetailsHandler} value={shipmentDetails.state} className={`form-control ${shipmentDetails.state && "is-valid"}`} required />
                </label>

                <label htmlFor="" style={{width:"100%", position:"relative"}}>
                    {/* <span style={{position:"absolute", top:"-0.9rem", right:".3rem", padding:"1px 6px", background:"white", color:"tomato", fontWeight:"500"}}>City</span> */}
                <input style={{height:"2.4rem", border:"none", borderBottom:"1px solid tomato", borderRadius:"0" ,color:"grey", textAlign:"center"}} placeholder="Enter City Name" type="text" name="city" onChange={shipmentDetailsHandler} value={shipmentDetails.city} className={`form-control ${shipmentDetails.city && "is-valid"}`} required />
                </label>
                
                <label htmlFor="" style={{width:"100%", position:"relative"}}>
                    {/* <span style={{position:"absolute", top:"-0.9rem", right:".3rem", padding:"1px 6px", background:"white", color:"tomato", fontWeight:"500"}}>Pin Code</span> */}
                <input style={{height:"2.4rem", border:"none", borderBottom:"1px solid tomato", borderRadius:"0" ,color:"grey", textAlign:"center"}} placeholder="Enter Pin Code" type="number" name="pinCode" onChange={shipmentDetailsHandler} value={shipmentDetails.pinCode} className={`form-control ${shipmentDetails.pinCode && "is-valid"}`} required />
                </label>

                <label htmlFor="" style={{width:"100%", position:"relative"}}>
                    {/* <span style={{position:"absolute", top:"-0.9rem", right:".3rem", padding:"1px 6px", background:"white", color:"tomato", fontWeight:"500"}}>Phone Number</span> */}
                <input style={{height:"2.4rem", border:"none", borderBottom:"1px solid tomato", borderRadius:"0" ,color:"grey", textAlign:"center"}} placeholder="Enter Phone Number" type="number" name="phone" onChange={shipmentDetailsHandler} value={shipmentDetails.phone} className={`form-control ${shipmentDetails.phone.length === 0 ? "" : shipmentDetails.phone.length === 10 ? "is-valid" : "is-invalid"}`} required />
                </label>
                
                <label htmlFor="" style={{width:"100%", position:"relative"}}>
                    {/* <span style={{position:"absolute", top:"-0.9rem", right:".3rem", padding:"1px 6px", background:"white", color:"tomato", fontWeight:"500"}}>Full Address</span> */}
                <textarea  type="text" style={{textAlign:"center"}} name="address" onChange={shipmentDetailsHandler} value={shipmentDetails.address} placeholder="Enter Your Full Address" className={`form-control ${shipmentDetails.address && "is-valid"}`} ></textarea>
                </label>

                <input type="submit" value="Submit" style={{width:"100%", marginTop:"6px", color:"white", background:"tomato", border:"none", padding:"4px 2px", boxShadow:"0 1px 2px red", borderRadius:"3px", fontWeight:"500"}} />
            </form>
        </div>
    )
}

export default ShippingInfo