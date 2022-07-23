
import axios from "axios";
import { useEffect, useState } from "react";
import { useAlert } from "react-alert";
import { useDispatch } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { GetHomeBannersAction } from "../../../redux/actions/HomeBannerAction";

const UpdateHomeBanner = () => {
    const {id} = useParams()
    const alert = useAlert()
    const dispatch = useDispatch()
    const history = useHistory()

    const [updateBanner, setUpdateBanner] = useState({
        paragraph: "",
        paragraphColor: "",
        category: "",
        categoryColor: "",
        image: ""
    })

    useEffect(()=>{
        if(id){
          async function getSingleBannerFun(){
            await axios.get(`/api/v1/admin/banner/${id}`).then((res)=>{
                setUpdateBanner({
                    paragraph: res.data.banner.paragraph,
                    paragraphColor: res.data.banner.paragraphColor,
                    category : res.data.banner.category,
                    categoryColor : res.data.banner.categoryColor,
                    image: res.data.banner.image.url
                })
                
            }).catch((err)=>{
                
            })
        
           }
           getSingleBannerFun()
        }
    },[id])

    
    const submitUpdateBannerHandler = async (e) => {
       e.preventDefault()

        await axios.put(`/api/v1/admin/banner/edit/${id}`, updateBanner).then((res)=>{
            alert.success(res.data.message, {"position":"bottom center"})
            history.push("/")
            dispatch(GetHomeBannersAction())
            
        }).catch((err)=>{
            alert.error(err.response.data.message, {"position":"bottom center"})
        })

    }

    const UpdateHomeBannerInputChangeHandler = (e) => {
        const {name, value} = e.target
        if(name==="image"){
            const reader = new FileReader()
            reader.onload = function(){
                if(reader.DONE){
                    setUpdateBanner({...updateBanner, image : reader.result})
                }
            }
            reader.readAsDataURL(e.target.files[0])
        }
        else{
            setUpdateBanner({...updateBanner, [name]:value})
        }
    }

    return (
        <div className="productCreate_container">
            <h3 style={{color:"tomato"}}>Banner Update</h3>
            <form onSubmit={submitUpdateBannerHandler} className='productCreate_form' action="">

                <label htmlFor="nameInput" className=' productCreate_input_label' >
                    <input defaultValue={updateBanner.category} onChange={UpdateHomeBannerInputChangeHandler} style={{width:"65%"}} className='productCreate_input' placeholder='Banner Heading...' type="text" name="category" id="nameInput" />
                    <input defaultValue={updateBanner.categoryColor} style={{width:"3rem"}} onChange={UpdateHomeBannerInputChangeHandler} className='productCreate_input' placeholder='Banner Heading Color...' type="color" name="categoryColor" id="nameInput" />
                </label>

                <label htmlFor="nameInput" className=' productCreate_input_label' style={{display:"flex", flexDirection:"column"}} >
                    <textarea rows="10" defaultValue={updateBanner.paragraph} onChange={UpdateHomeBannerInputChangeHandler} className='productCreate_input' placeholder='Banner paragraph...' type="text" name="paragraph" id="nameInput" style={{height:"max-content"}} ></textarea>
                    <input rows="10" defaultValue={updateBanner.paragraphColor} style={{width:"80%"}} onChange={UpdateHomeBannerInputChangeHandler} className='productCreate_input' placeholder='Banner Paragraph Heading Color...' type="color" name="paragraphColor" id="nameInput" />

                </label>


                <label htmlFor="fileInput" className='productCreate_input_label' >
                    <input onChange={UpdateHomeBannerInputChangeHandler} className='productCreate_input' type="file" name="image" id="fileInput" style={{width:"68%"}} />
                    <img src={ updateBanner.image} style={{width:"2.5rem", height:"2.5rem", objectFit:"contain", border:"1px solid grey"}} alt="" />
                </label>

                <span style={{ display: "flex", justifyContent: "flex-end", alignItems: "center", width: "100%", maxWidth: "15.3rem", margin: "1rem 0" }}>
                    <button className='productCreate_form_submit_btn' type="submit">
                        Update Banner
                    </button>
                </span>

            </form>
        </div>
    );
}
export default UpdateHomeBanner;