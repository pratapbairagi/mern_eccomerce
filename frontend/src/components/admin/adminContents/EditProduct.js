import { useSelector, useDispatch } from "react-redux"
import { useAlert } from "react-alert"
import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import { ClearError, ClearSuccess, GetAllProducts, GetSingleProductAction, ProductUpdateAction } from "../../../redux/actions/ProductAction"
import Loader from "../../loader/Loader"


const EditProduct = ({history}) => {
    const {id} = useParams()
    const {loading, success, error, product} = useSelector(state=>state.getSingleProduct)
    const {loading:updateProductLoading, success:updateProductSuccess, error: updateProductError} = useSelector(state=>state.productUpdate)
    const dispatch = useDispatch()
    const alert = useAlert()


    useEffect(()=>{
        dispatch(GetSingleProductAction(id))
    },[dispatch, id])

    useEffect(()=>{
        if(success){
           dispatch(ClearSuccess())
        }
        if(error){
           dispatch(ClearError())
        }
    },[success, error])


    const [updatedProduct, setUpdatedProduct] = useState({
        name:"",
        category:"",
        description:"",
        price:"",
        stock:"",
        offerAvail: "",
        offerPercentage :0,
        oldImages:[],
        newImages:[]
    })

    useEffect(()=>{
        setUpdatedProduct({
            ...updatedProduct,
            name:product.name,
            category:product.category,
            description:product.description,
            price:product.price,
            stock:product.stock,
            oldImages:product.images,
            newImages: []
        })
    },[product])

    const createProductInputChangeHandler = (e) =>{
    
        const {name, value} = e.target

        if(name==="file"){
            const reader = new FileReader()
            const files = Array.from(e.target.files)

            files.forEach(file=>{
                reader.onload = ()=>{
                    if(reader.DONE){
                        setUpdatedProduct({...updatedProduct, newImages:[...updatedProduct.newImages, reader.result]})
                    }
                }
                reader.readAsDataURL(file)
            })
        }

        setUpdatedProduct({
            ...updatedProduct, [name] : value
        })
        
    }

    const submitCreatedProductHandler = async(e) => {
        e.preventDefault()
        dispatch(ProductUpdateAction(updatedProduct, id))
    }

    useEffect(()=>{
        if(updateProductSuccess){
            alert.success("Product updated successfully !", {position:"bottom center"})
            dispatch(ClearSuccess())
            dispatch(GetAllProducts(""))
            history.push("/")
        }
        if(updateProductError){
            alert.error("Unable to update product !",{position:"bottom center"})
            dispatch(ClearError())
            dispatch(GetAllProducts(""))
        }
    },[ updateProductSuccess,updateProductError])

     console.log(product)
     console.log(updatedProduct)

    return(
        <div className='productCreate_container'>
            { loading ? <Loader/> : updateProductLoading ? <Loader/> :
            
        <form onSubmit={submitCreatedProductHandler}  className='productCreate_form' action="">
           <img style={{width:"5rem"}} src="" alt="" />

            <label htmlFor="nameInput" className='productCreate_input_label' >
                <input defaultValue={updatedProduct.name} onChange={createProductInputChangeHandler} className='productCreate_input' placeholder='Product name...' type="text" name="name" id="nameInput" />
            </label>

            <label htmlFor="emailInput" className='productCreate_input_label' >
                <input defaultValue={updatedProduct.category} onChange={createProductInputChangeHandler} className='productCreate_input' placeholder='Product Category...' type="text" name="category" id="emailInput" />
            </label>

            <label htmlFor="numberInput" className='productCreate_input_label'>
                <input defaultValue={updatedProduct.description} onChange={createProductInputChangeHandler} className='productCreate_input' placeholder='Product description...' type="text" name="description" id="numberInput" />
            </label>



            <label htmlFor="passwordInput" className='productCreate_input_label' >
                <input defaultValue={updatedProduct.price} onChange={createProductInputChangeHandler} className='productCreate_input' placeholder='Product price...' type="number" name="price" id="passwordInput" />
            </label>

            <label htmlFor="passwordInput" className='productCreate_input_label' >
                <input defaultValue={updatedProduct.stock} onChange={createProductInputChangeHandler} className='productCreate_input' placeholder='Product stock...' type="number" name="stock" id="passwordInput" />
            </label>

            <label htmlFor="passwordInput" className='productCreate_input_label' style={{alignItems:"center"}} >
                    <span className="productCreate_input">
                    <span>Offer Avail </span>
                    <select onChange={createProductInputChangeHandler} name="offerAvail" style={{marginTop:"5px"}} id="">
                        <option value="no">NO</option>
                        <option value="yes">YES</option>
                    </select>
                    </span>
                </label>

                <label htmlFor="" style={{display:`${updatedProduct.offerAvail==="yes"?"flex":"none"}`}} className='productCreate_input_label'>
                    <input onChange={createProductInputChangeHandler} className='productCreate_input' placeholder='Product Offer percentage' type="number" name="offerPercentage" id="offerPercentage" />
                </label>

            <label htmlFor="fileInput" className='productCreate_input_label' >
                <input  onChange={createProductInputChangeHandler} className='productCreate_input' type="file" name="file" id="fileInput" />
            </label>

            <span style={{width:"100%", maxWidth:"250px", margin:"0 auto", display:"flex", columnGap:"3px", position:"relative"}}>
                {updatedProduct.newImages.length >0 && <button onClick={()=>setUpdatedProduct({...updatedProduct, newImages : []})} style={{width:"1rem", height:"1rem", fontSize:"70%", color:"white", position:"absolute", right:"0", top:"0", fontWeight:"600", background:"tomato"}}>X</button>}
                {updatedProduct.newImages.length >0 && updatedProduct.newImages?.map((img,imgIndex)=>{
                    return <img key={imgIndex} style={{width:"2rem", height:"2.2rem", objectFit:"contain", boxShadow:"0 0 1px grey"}} src={img} alt="" />
                })}
            </span>

            <span style={{ display: "flex", justifyContent: "flex-end", alignItems:"center", width: "100%", maxWidth: "15.3rem",  margin:"1rem 0" }}>
                <button className='productCreate_form_submit_btn' type="submit">
                    Update
                </button>
            </span>
        </form>
         } 

    </div>
)}
export default EditProduct;