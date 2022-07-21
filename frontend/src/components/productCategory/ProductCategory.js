import "./productCategory.css"
import { useHistory } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { GetAllProducts } from "../../redux/actions/ProductAction"
import { useEffect } from "react"
import { ClearProductCategoryError, ClearProductCategorySuccess, GetProductCategoriesAction } from "../../redux/actions/ProductCategoryAction"

const ProductCategory = () => {
    
    const history = useHistory()
    const dispatch = useDispatch()
    const {loading, success, error, category} = useSelector(state=>state.productCategories)

    useEffect(()=>{
    dispatch(GetProductCategoriesAction())
    },[dispatch])

    useEffect(()=>{
        if(success){
            dispatch(ClearProductCategorySuccess())
        }
        if(error){
            dispatch(ClearProductCategoryError())
        }
    },[success, error])
    

    const menCategoryFilter = (e) =>{
        history.push("/products/")
    }
    return (
        <div className="productcategoryContainer">
            <div className="productCategoryHeading">
                <h2 className="productBestSellingHeading">Product Category</h2>
            </div>

            {category.length > 0 && category.map((c,i)=>{

           return <div key={i} className="categoryMen">
                <img src={c.image.url} alt={c.category} />
                <div className="menCategoryBtn">
                    <button value={c.category} onClick={menCategoryFilter}>{c.category}</button>
                </div>
            </div>
            })}
        </div>
    );
}
export default ProductCategory;

