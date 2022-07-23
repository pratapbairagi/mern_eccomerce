import "./admin.css"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { ClearErrorAction, ClearSuccessAction, GetAllUsersAction } from "../../redux/actions/UserAction"
import Chart from "react-apexcharts"
import { ClearError, ClearSuccess, GetAllProducts } from "../../redux/actions/ProductAction"
import Statics from "./adminContents/Statics"
import UsersList from "./adminContents/UsersList"
import ProductsList from "./adminContents/ProductsList"
import ReviewsList from "./adminContents/ReviewsList"
import { useParams } from "react-router-dom"
import AdminOrderList from "./adminContents/AdminOrderList"
import { GetAllOrderAction } from "../../redux/actions/OrderAction"
import AdminMessages from "./adminContents/AdminMessages"
import { Clear_message_error, Clear_message_success } from "../../redux/actions/MessageAction"
import CreateHomeBanner from "../../pages/home/createandUpdateHomeBanner/CreateHomeBanner"
import AdminHomeBannerList from "./adminContents/AdminHomeBannerList"

const Admin = () => {
    const { success, error, users } = useSelector(state => state.users)
    const { success: productsSuccess, error: productsError, products } = useSelector(state => state.getProducts)
    const { loading: orderLoading, success: orderSuccess, error: orderError, orders } = useSelector(state => state.orders)
    const {loading:bannerLoading, success:bannerSuccess, error:bannerError, banners } = useSelector(state=>state.homeBanners)

    const messages = useSelector(state => state.allMessages)

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(GetAllUsersAction())
        dispatch(GetAllProducts(""))
        dispatch(GetAllOrderAction())
    }, [dispatch])

    useEffect(() => {
        if (messages.success) {
            dispatch(Clear_message_success())
        }
        if (messages.error) {
            dispatch(Clear_message_error())
        }

    }, [dispatch, messages])

    useEffect(() => {
        if (success) {
            dispatch(ClearSuccessAction())
        }
        if (error) {
            dispatch(ClearErrorAction())
        }
        if (productsSuccess) {
            dispatch(ClearSuccess())
        }
        if (productsError) {
            dispatch(ClearError())
        }
    }, [success, error, productsSuccess, productsError, dispatch])

    // let data = [{ date: 0 }]

    useEffect(() => {
        const adminNavContents = document.querySelectorAll("aside li") // admin  nav buttons
        const adminContents = document.querySelectorAll(".adminContents section")

        adminNavContents.forEach((nav, i) => {

            nav.addEventListener("click", function () {

                adminNavContents.forEach((clossNav) => {
                    clossNav.classList.remove("active")
                })

                adminContents.forEach((closeContents) => {
                    closeContents.classList.remove("active")
                })

                this.classList.add("active")
                adminContents[i].classList.add("active")

            })
        })
    }, [])

    const [totalReviews, setTotalReviews] = useState(0)
    const [reviews, setReviews] = useState([])

    useEffect(() => {
        if (productsSuccess) {
            let x = 0
            let rev = []

            products.forEach(v => {
                rev.push(...v.reviews)
                x += +v.reviews.length
            })

            setTotalReviews(x)
            setReviews(rev)
        }
    }, [productsSuccess])

    return (
        <div className="adminContainer">
            <aside>

                <li style={{ marginTop: "1.5rem" }}>
                    <svg width="1.6rem" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 544 512">
                        <path d="M527.79 288H290.5l158.03 158.03c6.04 6.04 15.98 6.53 22.19.68 38.7-36.46 65.32-85.61 73.13-140.86 1.34-9.46-6.51-17.85-16.06-17.85zm-15.83-64.8C503.72 103.74 408.26 8.28 288.8.04 279.68-.59 272 7.1 272 16.24V240h223.77c9.14 0 16.82-7.68 16.19-16.8zM224 288V50.71c0-9.55-8.39-17.4-17.84-16.06C86.99 51.49-4.1 155.6.14 280.37 4.5 408.51 114.83 513.59 243.03 511.98c50.4-.63 96.97-16.87 135.26-44.03 7.9-5.6 8.42-17.23 1.57-24.08L224 288z" />
                    </svg>
                    <span>Statics</span>
                </li>

                <li >
                    <svg width="1.6rem" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512">
                        <path d="M96 224c35.3 0 64-28.7 64-64s-28.7-64-64-64-64 28.7-64 64 28.7 64 64 64zm448 0c35.3 0 64-28.7 64-64s-28.7-64-64-64-64 28.7-64 64 28.7 64 64 64zm32 32h-64c-17.6 0-33.5 7.1-45.1 18.6 40.3 22.1 68.9 62 75.1 109.4h66c17.7 0 32-14.3 32-32v-32c0-35.3-28.7-64-64-64zm-256 0c61.9 0 112-50.1 112-112S381.9 32 320 32 208 82.1 208 144s50.1 112 112 112zm76.8 32h-8.3c-20.8 10-43.9 16-68.5 16s-47.6-6-68.5-16h-8.3C179.6 288 128 339.6 128 403.2V432c0 26.5 21.5 48 48 48h288c26.5 0 48-21.5 48-48v-28.8c0-63.6-51.6-115.2-115.2-115.2zm-223.7-13.4C161.5 263.1 145.6 256 128 256H64c-35.3 0-64 28.7-64 64v32c0 17.7 14.3 32 32 32h65.9c6.3-47.4 34.9-87.3 75.2-109.4z" />
                    </svg>
                    <span>Users</span>
                </li>
                <li>
                    <svg width="1.6rem" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">
                        <path d="M160 48C160 21.49 181.5 0 208 0H256V80C256 88.84 263.2 96 272 96H304C312.8 96 320 88.84 320 80V0H368C394.5 0 416 21.49 416 48V176C416 202.5 394.5 224 368 224H208C181.5 224 160 202.5 160 176V48zM96 288V368C96 376.8 103.2 384 112 384H144C152.8 384 160 376.8 160 368V288H208C234.5 288 256 309.5 256 336V464C256 490.5 234.5 512 208 512H48C21.49 512 0 490.5 0 464V336C0 309.5 21.49 288 48 288H96zM416 288V368C416 376.8 423.2 384 432 384H464C472.8 384 480 376.8 480 368V288H528C554.5 288 576 309.5 576 336V464C576 490.5 554.5 512 528 512H368C341.5 512 320 490.5 320 464V336C320 309.5 341.5 288 368 288H416z" />
                    </svg>
                    <span>Products</span>
                </li>
                <li>
                    <svg width="1.6rem" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">
                        <path d="M96 0C107.5 0 117.4 8.19 119.6 19.51L121.1 32H541.8C562.1 32 578.3 52.25 572.6 72.66L518.6 264.7C514.7 278.5 502.1 288 487.8 288H170.7L179.9 336H488C501.3 336 512 346.7 512 360C512 373.3 501.3 384 488 384H159.1C148.5 384 138.6 375.8 136.4 364.5L76.14 48H24C10.75 48 0 37.25 0 24C0 10.75 10.75 0 24 0H96zM128 464C128 437.5 149.5 416 176 416C202.5 416 224 437.5 224 464C224 490.5 202.5 512 176 512C149.5 512 128 490.5 128 464zM512 464C512 490.5 490.5 512 464 512C437.5 512 416 490.5 416 464C416 437.5 437.5 416 464 416C490.5 416 512 437.5 512 464z" />
                    </svg>
                    <span>Orders</span>
                </li>
                <li>
                    <svg width="1.6rem" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">
                        <path d="M259.3 17.8L194 150.2 47.9 171.5c-26.2 3.8-36.7 36.1-17.7 54.6l105.7 103-25 145.5c-4.5 26.3 23.2 46 46.4 33.7L288 439.6l130.7 68.7c23.2 12.2 50.9-7.4 46.4-33.7l-25-145.5 105.7-103c19-18.5 8.5-50.8-17.7-54.6L382 150.2 316.7 17.8c-11.7-23.6-45.6-23.9-57.4 0z" />
                    </svg>
                    <span>Reviews</span>
                </li>
                <li>
                    <svg width="1.6rem" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">
                        <path d="M160 448c-25.6 0-51.2-22.4-64-32-64-44.8-83.2-60.8-96-70.4V480c0 17.67 14.33 32 32 32h256c17.67 0 32-14.33 32-32V345.6c-12.8 9.6-32 25.6-96 70.4-12.8 9.6-38.4 32-64 32zm128-192H32c-17.67 0-32 14.33-32 32v16c25.6 19.2 22.4 19.2 115.2 86.4 9.6 6.4 28.8 25.6 44.8 25.6s35.2-19.2 44.8-22.4c92.8-67.2 89.6-67.2 115.2-86.4V288c0-17.67-14.33-32-32-32zm256-96H224c-17.67 0-32 14.33-32 32v32h96c33.21 0 60.59 25.42 63.71 57.82l.29-.22V416h192c17.67 0 32-14.33 32-32V192c0-17.67-14.33-32-32-32zm-32 128h-64v-64h64v64zm-352-96c0-35.29 28.71-64 64-64h224V32c0-17.67-14.33-32-32-32H96C78.33 0 64 14.33 64 32v192h96v-32z" />
                    </svg>
                    <span>Messages</span>
                </li>

                <li>
                <svg width="1.6rem" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512">
                    <path d="M48 0C21.53 0 0 21.53 0 48v64c0 8.84 7.16 16 16 16h80V48C96 21.53 74.47 0 48 0zm208 412.57V352h288V96c0-52.94-43.06-96-96-96H111.59C121.74 13.41 128 29.92 128 48v368c0 38.87 34.65 69.65 74.75 63.12C234.22 474 256 444.46 256 412.57zM288 384v32c0 52.93-43.06 96-96 96h336c61.86 0 112-50.14 112-112 0-8.84-7.16-16-16-16H288z"/>
                </svg>
                    <span>Banner</span>
                </li>

                <li>
                <svg width="1.6rem" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                    <path d="M256 8C119.043 8 8 119.083 8 256c0 136.997 111.043 248 248 248s248-111.003 248-248C504 119.083 392.957 8 256 8zm0 110c23.196 0 42 18.804 42 42s-18.804 42-42 42-42-18.804-42-42 18.804-42 42-42zm56 254c0 6.627-5.373 12-12 12h-88c-6.627 0-12-5.373-12-12v-24c0-6.627 5.373-12 12-12h12v-64h-12c-6.627 0-12-5.373-12-12v-24c0-6.627 5.373-12 12-12h64c6.627 0 12 5.373 12 12v100h12c6.627 0 12 5.373 12 12v24z"/>
                </svg>
                    <span>About</span>
                </li>
            </aside>



            <div className="adminContents">
                <section>
                    <h3>Highlights</h3>
                    <Statics reviews={totalReviews} products={products} users={users} />
                    <h3>Users</h3>
                    {/*  */}
                    <Chart
                        type="bar"
                        width={400}
                        // height={200}
                        style={{ border: "1px soli red" }}
                        series={
                            [
                                {
                                    name: "Social Media Subscriber",
                                    data: users.map(v => { return new Date(v.createdAt).getDate() }),
                                }
                            ]
                        }
                        options={
                            {
                                title: {
                                    text: "Users Joined by day",
                                    style: { fontSize: 10 }
                                },

                                colors: ["#f90000"],

                                theme: { mode: "light" },

                                xaxis: {
                                    categories: ["facebook", "instagram", "twitter", "likedIn", "whatsApp"],
                                    style: {
                                        color: ["#f90000"]
                                    }
                                },
                                yaxis: {
                                    labels: {
                                        formatter: ((v => `Users below ${v}`)),
                                        style: { colors: "red", fontSize: 7 }
                                    },
                                    title: {
                                        text: "Users joined daily",
                                        style: {
                                            fontSize: 7
                                        }
                                    }

                                },
                                legend: {
                                    show: true,
                                    position: "right"
                                },
                                dataLabels: {
                                    formatter: (v) => `Users ${v}`,
                                    style: {
                                        fontSize: 6
                                    }
                                }
                            }

                        }

                    >

                    </Chart>
                </section>
                <section>
                    <h3>Users</h3>
                    <UsersList users={users} />

                </section>
                <section>
                    <h3>Products</h3>
                    <ProductsList products={products} />

                </section>
                <section>
                    <AdminOrderList orders={orders} />
                </section>
                <section>
                    <h3>Reviews</h3>
                    <ReviewsList reviews={reviews} />
                </section>
                <section>
                    <h3>Messages</h3>
                    <AdminMessages messages={messages} />
                </section>
                <section>
                    <h3>banner</h3>
                    <AdminHomeBannerList banners={banners}/>
                    {/* <CreateHomeBanner/> */}

                </section>
                <section>
                    <h3>About</h3>
                </section>
            </div>



        </div>
    );
}
export default Admin;