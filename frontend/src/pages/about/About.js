import { NavLink } from "react-router-dom"
import "./about.css"

const About = () =>{
    return (
        <div className="aboutContainer">
            <h4>ABOUT US</h4>
            <div className="about_aboutCompany_container">
                <img src="https://res.cloudinary.com/protapbairagi/image/upload/v1657959337/product%20category/atnosz3n0l2r8atfntjq.jpg" alt="" />
                <div className="about_aboutCompany">
                    <div>ABOUT OUR COMPANY</div>
                    <p style={{color:"tomato"}}>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aut perspiciatis quidem cum commodi praesentium harum id expedita, consequuntur, officia illum natus eius in illo exercitationem veniam facere voluptatem eaque fugit.</p>
                    <button><NavLink style={{color:"white", textDecoration:"none"}} to="/about/more">LEARN MORE</NavLink></button>
                </div>
            </div>
            <div className="about_aboutCompany_lastContainer">
                <div className="">
                    <h5>01</h5>
                    <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nesciunt consequatur quas doloremque ipsam magnam, quis esse architecto perferendis quae hic assumenda cupiditate quod dolorum mollitia, ut veritatis tenetur. Alias illo natus quis adipisci maiores nemo totam nostrum rem eveniet similique!</p>
                </div>
                <div>
                    <h5>01</h5>
                    <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nesciunt consequatur quas doloremque ipsam magnam, quis esse architecto perferendis quae hic assumenda cupiditate quod dolorum mollitia, ut veritatis tenetur. Alias illo natus quis adipisci maiores nemo totam nostrum rem eveniet similique!</p>
                </div>
                <div>
                    <h5>01</h5>
                    <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nesciunt consequatur quas doloremque ipsam magnam, quis esse architecto perferendis quae hic assumenda cupiditate quod dolorum mollitia, ut veritatis tenetur. Alias illo natus quis adipisci maiores nemo totam nostrum rem eveniet similique!</p>
                </div>
            </div>
        </div>
    )
}

export default About