import { useSelector, useDispatch } from "react-redux";
import "./profile.css"
import { useEffect } from "react"
import Loader from "../loader/Loader"
import { ClearSuccessAction, ClearErrorAction } from "../../redux/actions/UserAction"
import { NavLink } from "react-router-dom";

const Profile = () => {
    const { loading, success, error, user } = useSelector(state => state.user)
    const dispatch = useDispatch()

    useEffect(() => {
        if (success) {
            dispatch(ClearSuccessAction())
        }
        if (error) {
            dispatch(ClearErrorAction())
        }
    }, [success, error])
    console.log(user)
    return (
        <>
            {loading ? <Loader /> :
                <div className="profileContainer">
                    <h3>Profile</h3>
                    <div className="profileSubContainer">
                        <div className="col col-md-6 col-12 profileDevisionOne">
                            <img style={{}} src={user.avatars.url} alt="" />
                            <strong>{user.name}</strong>
                        </div>

                        <div className="col col-md-6 col-12 profileDevisionTwo">

                            <div className="profile_emailContainer">
                                <strong>{user.email}</strong>
                                {/* <button>Change</button> */}
                            </div>

                            <div className="profile_phoneContainer">
                                <strong>{user.phone}</strong>
                                {/* <button>Change</button> */}
                            </div>



                            <div className="profile_passwordContainer">
                                <strong>*******</strong>
                                {/* <button>Change</button> */}
                            </div>

                            <div className="profile_phoneContainer">
                                {/* <strong>{user.phone}</strong> */}
                                <button>
                                    <NavLink to="/profile/edit">
                                        Edit Profile
                                    </NavLink>
                                </button>
                            </div>

                            <div className="profile_ordersContainer">
                                <button><NavLink style={{ textDecoration: "none", color: "white" }} to="/orders">My Orders</NavLink></button>
                            </div>

                        </div>
                    </div>
                </div>
            }
        </>
    );
}
export default Profile;