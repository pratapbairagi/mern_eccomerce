import "./productCategory.css"
import { useHistory } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { GetAllProducts } from "../../redux/actions/ProductAction"
import { useEffect } from "react"
import { ClearProductCategoryError, ClearProductCategorySuccess, GetProductCategoriesAction } from "../../redux/actions/ProductCategoryAction"

let categ = ""

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
        categ = e.target.value
    }
    return (
        <div className="productcategoryContainer">
            <div className="productCategoryHeading">
                <h2 className="productBestSellingHeading">Cloths Category</h2>
            </div>

            {category.length > 0 && category.map((c,i)=>{

           return <div key={i} className="categoryMen">
                <img src={c.image.url} alt={c.category} />
                <div className="menCategoryBtn">
                    <button value={c.category} onClick={menCategoryFilter}>{c.category}</button>
                </div>
            </div>
            })}

            {/* <div className="categoryMen">
                <img src={men} alt="" />
                <div className="menCategoryBtn">
                    <button value="men" onClick={menCategoryFilter}>MEN</button>
                </div>
            </div>

            <div className="categoryWomen">
                <img src={women} alt="" />

                <div className="womenCategoryBtn">
                    <button value="women" onClick={menCategoryFilter} >WOMEN</button>
                </div>
            </div>

            <div className="categoryKid">
                <img src={kids} alt="" />

                <div className="kidsCategoryBtn">
                    <button value="kid" onClick={menCategoryFilter}>KIDS</button>
                </div>
            </div> */}
        </div>
    );
}
export default ProductCategory;

export {categ}
