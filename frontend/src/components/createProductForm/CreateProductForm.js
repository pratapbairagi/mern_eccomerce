import newPRoduct from "./images/reshot-icon-new-product-3ZSU4F6GHN.svg"
import "./createProductForm.css"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { ProductCreateAction, GetAllProducts } from "../../redux/actions/ProductAction"
import { ClearSuccess, ClearError } from "../../redux/actions/ProductAction.js"
import Loader from "../loader/Loader.js"
import { useAlert } from "react-alert"
import { useParams } from "react-router-dom"

const CreateProductForm = ({ history }) => {
    
    
    const dispatch = useDispatch()
    const alert = useAlert()
    const { loading, success, error, product } = useSelector(state => state.productReducer)

    useEffect(() => {
        if (success) {
            alert.success("Product added successfully !",{"position":"bottom center"})
            history.push("/")
            dispatch(ClearSuccess())
            dispatch(GetAllProducts(""))
        }
        if (error) {
            alert.error(error,{"position":"bottom center"})
            dispatch(ClearError())
        }

    }, [success, error, alert])

    const [createProduct, setCreateProduct] = useState({
        name: "",
        category: "",
        description: "",
        price: 0,
        stock: 1,
        images: [],
        offerAvail: "",
        offerPercentage :0
    })

    const createProductInputChangeHandler = (e) => {
        const { name, value } = e.target
        if (name === "file") {
            const files = Array.from(e.target.files)

            files.forEach((file) => {
                const reader = new FileReader()

                reader.onload = () => {
                    if (reader.DONE) {
                        setCreateProduct({ ...createProduct, images: [...createProduct.images, reader.result] })
                    }
                }
                reader.readAsDataURL(file)
            })
        }
        if (name !== "file") {

            setCreateProduct({ ...createProduct, [name]: value })
        }
    }

    const submitCreatedProductHandler = async (e) => {
        e.preventDefault()
        dispatch(ProductCreateAction(createProduct))
    }
    
    return (
        <div className='productCreate_container'>
            {loading && <Loader />}
            <form onSubmit={submitCreatedProductHandler} className='productCreate_form' action="">
                <img style={{ width: "5rem" }} src={newPRoduct} alt="" />

                <label htmlFor="nameInput" className=' productCreate_input_label' >
                    
                    <input onChange={createProductInputChangeHandler} className='productCreate_input' placeholder='Product name...' type="text" name="name" id="nameInput" />
                </label>

                <label htmlFor="emailInput" className=' productCreate_input_label' >
                    <input onChange={createProductInputChangeHandler} className=' productCreate_input' placeholder='Product Category...' type="text" name="category" id="emailInput" />
                </label>

                <label htmlFor="numberInput" className='productCreate_input_label'>
                    <input onChange={createProductInputChangeHandler} className='productCreate_input' placeholder='Product description...' type="text" name="description" id="numberInput" />
                </label>



                <label htmlFor="passwordInput" className='productCreate_input_label' >
                    <input onChange={createProductInputChangeHandler} className='productCreate_input' placeholder='Product price...' type="number" name="price" id="passwordInput" />
                </label>

                <label htmlFor="passwordInput" className='productCreate_input_label' >
                    <input onChange={createProductInputChangeHandler} className='productCreate_input' placeholder='Product stock...' type="number" name="stock" id="passwordInput" />
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

                <label htmlFor="" style={{display:`${createProduct.offerAvail==="yes"?"flex":"none"}`}} className='productCreate_input_label'>
                    <input onChange={createProductInputChangeHandler} className='productCreate_input' placeholder='Product Offer percentage' type="number" name="offerPercentage" id="offerPercentage" />
                </label>

                <label htmlFor="fileInput" className='productCreate_input_label' >
                    <input onChange={createProductInputChangeHandler} className='productCreate_input' type="file" name="file" id="fileInput" />
                </label>

                <span style={{width:"100%", maxWidth:"250px", margin:"0 auto", display:"flex", columnGap:"3px", position:"relative"}}>
                {createProduct.images.length >0 && <button onClick={()=>setCreateProduct({...createProduct, images : []})} style={{width:"1rem", height:"1rem", fontSize:"70%", color:"white", position:"absolute", right:"0", top:"0", fontWeight:"600", background:"tomato"}}>X</button>}
                {createProduct.images.length >0 && createProduct.images?.map((img,imgIndex)=>{
                    return <img key={imgIndex} style={{width:"2rem", height:"2.2rem", objectFit:"contain", boxShadow:"0 0 1px grey"}} src={img} alt="" />
                })}
            </span>

                <span style={{ display: "flex", justifyContent: "flex-end", alignItems: "center", width: "100%", maxWidth: "15.3rem", margin: "1rem 0" }}>
                    <button className='productCreate_form_submit_btn' type="submit">
                        Create
                    </button>
                </span>



            </form>

        </div>
    )
}
export default CreateProductForm;