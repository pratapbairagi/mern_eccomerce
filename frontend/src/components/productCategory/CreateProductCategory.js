import { useEffect, useState } from "react";
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import { ClearProductCategoryError, ClearProductCategorySuccess, CreateProductCategoryAction, GetProductCategoriesAction } from "../../redux/actions/ProductCategoryAction";


const CreateProductCategory = () => {

    const dispatch = useDispatch()
    const {loading, success, error, category} = useSelector(state=>state.productCategory)
    const {loading:allCategoriesLoading, success:allCategoriesSuccess, error:allCategoriesError, category:allCategories} = useSelector(state=>state.productCategories)


    const alert = useAlert()

    const [createCategory, setCreateCategory] = useState({
        categoryName:"",
        categoryImage:""
    })

    const createProductCategoryInputChangeHandler = (e) =>{
        const {name, value} = e.target
        if(name==="categoryImage"){
            const reader = new FileReader()
            reader.onload = function(){
                if(reader.DONE){
                    setCreateCategory({...createCategory, categoryImage : reader.result})
                }
            }
            reader.readAsDataURL(e.target.files[0])
        }else{
            setCreateCategory({...createCategory, [name]:value})
        }
    }

    const submitCreatedProductCategoryHandler = (e) =>{
        e.preventDefault()
        if(createCategory.categoryImage && createCategory.categoryName){
            dispatch(CreateProductCategoryAction(createCategory))
        }
    }

    useEffect(()=>{
        dispatch(GetProductCategoriesAction())

        if(success){
            alert.success("Product category created successfully !", {"position":"bottom center"})
            dispatch(ClearProductCategorySuccess())
        }

        if(error){
            alert.error(error, {"position":"bottom center"})
            dispatch(ClearProductCategoryError())
        }

    },[success, error])


    return (
        <div className='productCreate_container'>
        
        <form onSubmit={submitCreatedProductCategoryHandler} className='productCreate_form' action="">

            <label htmlFor="nameInput" className=' productCreate_input_label' >
                
                <input onChange={createProductCategoryInputChangeHandler} className='productCreate_input' placeholder='Product name...' type="text" name="categoryName" id="nameInput" />
            </label>


            <label htmlFor="fileInput" className='productCreate_input_label' >
                <input onChange={createProductCategoryInputChangeHandler} className='productCreate_input' type="file" name="categoryImage" id="fileInput" />
            </label>

            {/* <span style={{width:"100%", maxWidth:"250px", margin:"0 auto", display:"flex", columnGap:"3px", position:"relative"}}>
            {createProduct.images.length >0 && <button onClick={()=>setCreateProduct({...createProduct, images : []})} style={{width:"1rem", height:"1rem", fontSize:"70%", color:"white", position:"absolute", right:"0", top:"0", fontWeight:"600", background:"tomato"}}>X</button>}
            {createProduct.images.length >0 && createProduct.images?.map((img,imgIndex)=>{
                return <img key={imgIndex} style={{width:"2rem", height:"2.2rem", objectFit:"contain", boxShadow:"0 0 1px grey"}} src={img} alt="" />
            })}
        </span> */}

            <span style={{ display: "flex", justifyContent: "flex-end", alignItems: "center", width: "100%", maxWidth: "15.3rem", margin: "1rem 0" }}>
                <button className='productCreate_form_submit_btn' type="submit">
                    Create
                </button>
            </span>



        </form>
        </div>
    );
}
export default CreateProductCategory;