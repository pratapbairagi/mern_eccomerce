import axios from "axios";
import { useEffect, useState } from "react";
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { EditProductCategoryAction, GetProductCategoryAction } from "../../redux/actions/ProductCategoryAction";
import Loader from "../loader/Loader"


const EditProductCategory = () => {

    const { id } = useParams()
    const dispatch = useDispatch()
    const alert = useAlert()
    const { loading, success, error, category } = useSelector(state => state.singleProductCategory)

    useEffect(() => {
        if (id) {
            dispatch(GetProductCategoryAction(id))
        }
    }, [id])

    const [editcategory, setEditCategory] = useState({
        category:"",
        image:""
    })
    useEffect(()=>{
        setEditCategory({
            ...editcategory,
            category : category?.category ? category.category :""
        })
    },[category])

    const editProductCategoryInputChangeHandler = (e) => {
        const {name, value} = e.target

        if(name==="image"){
            const reader = new FileReader()

            reader.onload = function(){
                if(reader.DONE){
                    setEditCategory({...editcategory, image : reader.result})
                }
            }
            reader.readAsDataURL(e.target.files[0])
        }
        else{
            setEditCategory({...editcategory, [name]:value})
        }
    }

    const submitEditProductCategoryHandler = async (e) => {
        e.preventDefault()

        if(editcategory.category && id){
            await axios.put(`/api/v1/products/category/${id}`, editcategory).then((res)=>{
                alert.success("Product updated successfully !",{"position":"bottom center"})
            }).catch((err)=>{
                alert.error(err.response.data.message,{"position":"bottom center"})
            })
        
        }
    }

    return (
        <div className='productCreate_container'>
            {loading ? <Loader /> : success &&
                <form onSubmit={submitEditProductCategoryHandler} className='productCreate_form' action="">

                    <label htmlFor="nameInput" className=' productCreate_input_label' >

                        <input defaultValue={category.category} onChange={editProductCategoryInputChangeHandler} className='productCreate_input' placeholder='Product name...' type="text" name="category" id="nameInput" />
                    </label>


                    <label htmlFor="fileInput" className='productCreate_input_label' >
                        <input onChange={editProductCategoryInputChangeHandler} className='productCreate_input' type="file" name="image" id="fileInput" />
                    </label>

                    <span style={{ width: "100%", maxWidth: "250px", margin: "0 auto", display: "flex", columnGap: "3px", position: "relative" }}>

                        <img style={{ width: "2rem", height: "2.2rem", objectFit: "contain", boxShadow: "0 0 1px grey" }} src={category.image.url} alt="" />

                    </span>

                    <span style={{ display: "flex", justifyContent: "flex-end", alignItems: "center", width: "100%", maxWidth: "15.3rem", margin: "1rem 0" }}>
                        <button className='productCreate_form_submit_btn' type="submit">
                            Create
                        </button>
                    </span>



                </form>
            }
        </div>
    );
}
export default EditProductCategory
    ;