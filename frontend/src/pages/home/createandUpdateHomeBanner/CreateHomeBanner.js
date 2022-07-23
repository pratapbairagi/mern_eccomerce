import axios from "axios";
import { useState } from "react";

const CreateHomeBanner = (props) => {

    const [createBanner, setCreateBanner] = useState({
        paragraph: "",
        category: "",
        image: ""
    })
    const submitCreatedProductHandler = async (e) => {
        e.preventDefault()
        const config ={
            headers : { "Content-Type":"application/json"}
        }

        await axios.post("/api/v1/admin/banner/create", createBanner, config).then((res)=>{
            alert("success")
        }).catch((err)=>{
            alert("error")
            console.log(err)
        })

    }

    const createHomeBannerInputChangeHandler = (e) => {
        const {name, value} = e.target
        if(name==="image"){
            const reader = new FileReader()
            reader.onload = function(){
                if(reader.DONE){
                    setCreateBanner({...createBanner, image : reader.result})
                }
            }
            reader.readAsDataURL(e.target.files[0])
        }
        else{
            setCreateBanner({...createBanner, [name]:value})
        }
    }

    return (
        
        <div className="productCreate_container">
            <form onSubmit={submitCreatedProductHandler} className='productCreate_form' action="">
                <img style={{ width: "5rem" }} src="" alt="" />

                <label htmlFor="nameInput" className=' productCreate_input_label' >
                    <input onChange={createHomeBannerInputChangeHandler} className='productCreate_input' placeholder='Banner Paragraph...' type="text" name="paragraph" id="nameInput" />
                </label>

                <label htmlFor="nameInput" className=' productCreate_input_label' >
                    <input onChange={createHomeBannerInputChangeHandler} className='productCreate_input' placeholder='Banner Category Heading...' type="text" name="category" id="nameInput" />
                </label>


                <label htmlFor="fileInput" className='productCreate_input_label' >
                    <input onChange={createHomeBannerInputChangeHandler} className='productCreate_input' type="file" name="image" id="fileInput" />
                </label>

                <span style={{ width: "100%", maxWidth: "250px", margin: "0 auto", display: "flex", columnGap: "3px", position: "relative" }}>
                    {/* {createProduct.images.length >0 && <button onClick={()=>setCreateProduct({...createProduct, images : []})} style={{width:"1rem", height:"1rem", fontSize:"70%", color:"white", position:"absolute", right:"0", top:"0", fontWeight:"600", background:"tomato"}}>X</button>}
                {createProduct.images.length >0 && createProduct.images?.map((img,imgIndex)=>{
                    return <img key={imgIndex} style={{width:"2rem", height:"2.2rem", objectFit:"contain", boxShadow:"0 0 1px grey"}} src={img} alt="" />
                })} */}
                </span>

                <span style={{ display: "flex", justifyContent: "flex-end", alignItems: "center", width: "100%", maxWidth: "15.3rem", margin: "1rem 0" }}>
                    <button className='productCreate_form_submit_btn' type="submit">
                        Create
                    </button>
                </span>

            </form>
        </div>
    );
}
export default CreateHomeBanner;