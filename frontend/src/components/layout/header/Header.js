import "./header.css"
import { useEffect, useRef, useState } from 'react';
import brandLogo from "./images/brandLogo.svg"
import UserContentsNav from "../user_contents_nav/UserContentsNav";
import { NavLink, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { GetAllProducts } from "../../../redux/actions/ProductAction";

const Header = ({user}) => {



    const navs = useRef(null)
    const history = useHistory()

    useEffect(() => {
        if (navs.current) {
            navs.current.childNodes.forEach((el, i) => {

                el.addEventListener("click", function () {

                    navs.current.childNodes.forEach(r => {
                        r.classList.remove("active")
                    })

                    document.querySelector(".header_container").style.height = "10vh"
                    this.classList.add("active")
                    if (window.innerWidth <= 599) {
                        document.querySelector(".right_nav").style.display = "none"
                    }
                })
            })
        }
    }, [])


    const navToggleBtn = () => {
        const nav = document.querySelector(".right_nav")
        const nav_container = document.querySelector(".header_container")

        if (nav.style.display === "none") {
            nav.style.display = "flex"
            nav_container.style.height = "100%"
        }
        else {
            nav.style.display = "none"
            nav_container.style.height = "10vh"

        }
    }

    window.onresize = () => {
        const size = window.innerWidth
        if (size >= 600) {
            document.querySelector(".right_nav").style.display = "flex"
            document.querySelector(".header_container").style.height = "10vh"
        }
        else {
            document.querySelector(".right_nav").style.display = "none"
            document.querySelector(".header_container").style.height = "10vh"
        }
    }


    const [keyword, setKeyword] = useState("")
    const price = {
            from: 0,
            to: 999999
        }


    const submitSearchProduct_handler = (e) =>{
        e.preventDefault()
        
        if(keyword.length > 1){
            history.push(`/products/${keyword}`)
        }
        dispatch(GetAllProducts(keyword, "", price))
    }



    ///////////////
   


    const { loading, success, error, products, totalProducts, resultPerPage, resultFound } = useSelector(state => state.getProducts)

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(GetAllProducts(keyword, "", "", "",""))
    }, [])

    return (
        <>
            <div className='header_container'>
                <div className="left_nav">
                    <button>
                        <NavLink to="/">
                        <img style={{ width: "2.5rem", height: "2.5rem", borderRadius: "50%", boxShadow: "0 0 2px grey" }} src={ brandLogo } alt="" />
                        </NavLink>
                    </button>

                </div>

                <div className="mid_nav">
                    <button onClick={navToggleBtn}>
                        
                        <svg width="2rem" fill="tomato" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                            <path d="M16 132h416c8.837 0 16-7.163 16-16V76c0-8.837-7.163-16-16-16H16C7.163 60 0 67.163 0 76v40c0 8.837 7.163 16 16 16zm0 160h416c8.837 0 16-7.163 16-16v-40c0-8.837-7.163-16-16-16H16c-8.837 0-16 7.163-16 16v40c0 8.837 7.163 16 16 16zm0 160h416c8.837 0 16-7.163 16-16v-40c0-8.837-7.163-16-16-16H16c-8.837 0-16 7.163-16 16v40c0 8.837 7.163 16 16 16z" />
                        </svg>
                    </button>
                </div>

                <div className="right_nav" ref={navs}>
                   <li><NavLink to="/" className="headerNavLink">HOME</NavLink></li>
                    <li><NavLink to="/products/" className="headerNavLink">PRODUCTS</NavLink></li>
                    <li><NavLink to="/about/more" className="headerNavLink">ABOUT</NavLink></li>
                    <li>CONTACT</li>
                </div>

                <UserContentsNav userData={user === null ? null : user }/>

                <form id="searchInput" onSubmit={submitSearchProduct_handler} className="input-group searchBarContainer" style={{position:"fixed", display:"none"}}>
                    <input onChange={(e)=>setKeyword(e.target.value)} className="form-control" type="search" name="" id="" />
                    <button type="submit" className="input-group-text">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                        <path d="M505 442.7L405.3 343c-4.5-4.5-10.6-7-17-7H372c27.6-35.3 44-79.7 44-128C416 93.1 322.9 0 208 0S0 93.1 0 208s93.1 208 208 208c48.3 0 92.7-16.4 128-44v16.3c0 6.4 2.5 12.5 7 17l99.7 99.7c9.4 9.4 24.6 9.4 33.9 0l28.3-28.3c9.4-9.4 9.4-24.6.1-34zM208 336c-70.7 0-128-57.2-128-128 0-70.7 57.2-128 128-128 70.7 0 128 57.2 128 128 0 70.7-57.2 128-128 128z"/>
                    </svg>
                    </button>
                </form>

                


            {/*  */}
                {/* <div className="filterContainer">
                <select onChange={(e) => setCategory(e.target.value.length > 0 ? e.target.value : "")} style={{ width: "10rem", marginRight: ".5rem" }}>
                    <option value="" >Choose Category</option>
                    {cat.map((v, i) => {
                        return <option value={v.category}>{v.category}</option>
                    })}
                </select>

                <form onSubmit={submitPriceRange_handler} className="priceRage" style={{ display: "flex" }}>
                    <input defaultValue={price.from} style={{ width: "4rem" }} onChange={(e) => setPrice({ ...price, from: e.target.value })} type="number" name="" id="" />
                    <input defaultValue={price.to} style={{ width: "4rem" }} onChange={(e) => setPrice({ ...price, to: e.target.value })} type="number" name="" id="" />
                    <button style={{ width: "2rem", display: "grid", placeItems: "center", border: "1px solid grey" }} type="submit">
                        <svg style={{ width: "1.2rem" }} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                            <path d="M505 442.7L405.3 343c-4.5-4.5-10.6-7-17-7H372c27.6-35.3 44-79.7 44-128C416 93.1 322.9 0 208 0S0 93.1 0 208s93.1 208 208 208c48.3 0 92.7-16.4 128-44v16.3c0 6.4 2.5 12.5 7 17l99.7 99.7c9.4 9.4 24.6 9.4 33.9 0l28.3-28.3c9.4-9.4 9.4-24.6.1-34zM208 336c-70.7 0-128-57.2-128-128 0-70.7 57.2-128 128-128 70.7 0 128 57.2 128 128 0 70.7-57.2 128-128 128z" />
                        </svg>
                    </button>
                </form>

                <div className="pageFilter" style={{ height: "100%", marginLeft: ".5rem" }}>
                    <select onChange={selectPage_handler} style={{ width: "10rem", marginRight: ".5rem" }}>
                        {totalPages.map((v, i) => {
                            return <option key={i} value={v}>PageNo. {v}</option>
                        })}

                    </select>
                </div>
            </div> */}
                {/*  */}

            </div>


        </>
    );
}

export default Header;