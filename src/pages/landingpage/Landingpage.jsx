import React, {useState, useEffect} from 'react'
import logo from '../../assets/logo-removebg-preview.png'
import konetimg from '../../assets/landingpageimg/konnetimg-removebg-preview.png'
import shaketimg from '../../assets/landingpageimg/shakehand-removebg-preview.png'
import claptop1 from '../../assets/konetimg.png'
import secureimg from '../../assets/landingpageimg/secureimg.webp'
import selandbuy from '../../assets/landingpageimg/selandbuy.webp'
import belefimg from '../../assets/landingpageimg/ourbelef.jpg'
import { useNavigate } from 'react-router-dom'
import './Landing.css'
const Landingpage = () => {
  window.onscroll=()=>{
    document.getElementById('navbar').style.backgroundColor="white"
  }
  const navigate =useNavigate()
  const [mission, setmission] = useState(false)
  const [belief, setbeleif] = useState(false)
  const [vision, setvision] = useState(false)
  const ourMission = () => {
    setmission(true)
    setbeleif(false)
  }
  const ourbelief = () =>{
    setbeleif(true)
    setmission(false)
  }
  useEffect(() => {
    if(belief==false){
      ourMission()
    }
  }, [])
  const login=()=>{
    navigate('/login')
  }
  const signup=()=>{
    navigate('/signup')
  }
  return (
    <div>
      <nav class="navbar fixed-top navbar-expand-lg" id='navbar'>
        <div class="container-fluid">
          <a class="navbar-brand" href="#">
            <div className="logo">
              <img src={logo} alt="" className='img' />
            </div>
          </a>
          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
            <div class="navbar-nav">
              <div className="mx-auto nav-content-holder d-flex justify-content-between" style={{width:"85vw"}}>
              <a className="nav-link text-primary fw-bold" href="#home">Home</a>
              <a className="nav-link text-primary fw-bold" href="#about">About</a>
              <a className="nav-link text-primary fw-bold" href="#why choose us">Why choose us</a>
              <a className="nav-link text-primary fw-bold" href="#category">Categories</a>
              <a className="nav-link text-primary fw-bold" href='#vision'>Our Vision</a>
              <a className="nav-link text-primary fw-bold" href='#contact'>Our Testimonial</a>
              <a className="nav-link text-primary fw-bold"  href='#contact'>Contact</a>
              {/* <a class="nav-link disabled" aria-disabled="true">Disabled</a> */}
              </div>
            </div>
          </div>
        </div>
      </nav>
      <div className="section-one" id='home'>
        <div className='inner1 d-flex'>
          <div className="fw-bold" style={{lineHeight:"45px"}}>
            <div className="px-5 content">
            <p className=''>Empowered your Self <br /><span>And your business</span ><br /> <span  className='text-primary'>Join Konnet</span> now</p>
            </div>
           <div className="px-5 button-divs">
           <div className="button-div bg-white p-1 px-3 pt-3 border justify-content-center rounded d-flex gap-2">
              <div>
                <p className='fs-4' style={{color:"rgb(228,239,255)", textShadow:"1px 1px rgb(1,123,253)"}}>Continue</p>
              </div>
              <button className="btn btn-primary" onClick={signup}>Sign Up</button>
              <button className="btn btn-primary" onClick={login}>Log in</button>
          </div>
           </div>
          <img src={shaketimg} alt="" className=''/>
          </div>
        </div>
        <div className='inner2'>
          <img src={konetimg} alt="" className='img1'/>
        </div>
      </div>
    
      <div className="section-two mx-5 p-3">
      <div className="about px-5" id="about">
        <div>
        <div className="d-flex flex-about">
        <img src={claptop1} alt="" className='claptop'/>
        <div>
        <p className='title mx-2 mt-3'>About us</p>
        <div className="underline mx-2"></div>
        <div className="p-3 about-content">
          Welcome to Konet, where the world comes to buy and sell with ease. Foonded on the principle of trust, covenience, and community, we've been connecting buyers and sellers since our interception. Our diverse marketplace soans across countless categories, from electeonic to fashion, collectible of home decor. We are more than marketplace; we are global ecosystem of sellers, buyers, and ethusiast. We empower individual an business to reach new height, fostering oppourtunities for growth. With a commitment to seamlesstransactions and top-notch customers support, we're the go-to destination of all your needs. Join us today and be a part of our vibrant community
        </div>
        </div>
        </div>
        </div>
      </div>
      </div>
      <div className="mt-5 section" id="why choose us">
            <div className="background">
            <p className='title px-5 pt-4'>Why Choose Us</p>
            <div className="underline mx-5"></div>
            <div className="row about-content rows p-3 mt-4 px-5">
            <div className="card col-sm-12 col-md-3 mx-5 p-3">
              <img src={secureimg} alt="" className='img'/>
              <p className='pt-2 text-center text-primary fw-bold'>Secure Website</p>
              <p className='text-center'>Our e-commerce website employs robust encryption, strict privacy protocols, and continuous monitoring, ensuring your transactions and data are safe, providing you with peace of mind."</p>
            </div>
            <div className="card col-sm-12 col-md-3 mx-5 p-3">
              <img src={secureimg} alt="" className='img'/>
              <p className='pt-2 text-center text-primary fw-bold'>Secure Website</p>
              <p className='text-center'>Our e-commerce website employs robust encryption, strict privacy protocols, and continuous monitoring, ensuring your transactions and data are safe, providing you with peace of mind."</p>
            </div>
            <div className="card col-sm-12 col-md-3 mx-5 p-3">
              <img src={secureimg} alt="" className='img'/>
              <p className='pt-2 text-center text-primary fw-bold'>Secure Website</p>
              <p className='text-center'>Our e-commerce website employs robust encryption, strict privacy protocols, and continuous monitoring, ensuring your transactions and data are safe, providing you with peace of mind."</p>
            </div>
            
        </div>
        </div>
      </div>
      <div className="cateory" id="category">
        <div className="px-5">
          <p className='title pt-5'>Category</p>
          <div className="underline"></div>
        </div>
        <div className="row px-4 gap-2 justify-content-center">
          <div className="card text-center pt-3 col-sm-12 col-md-2 border border-1"><p>Electronics</p></div>
          <div className="card text-center pt-3 col-sm-12 col-md-2 border border-1"><p>Phone and Accessories</p></div>
          <div className="card text-center pt-3 col-sm-12 col-md-2 border border-1"><p>Laptops and Computer</p></div>
          <div className="card text-center pt-3 col-sm-12 col-md-2 border border-1"><p>Electrical and Power Generators</p></div>
          <div className="card text-center pt-3 col-sm-12 col-md-2 border border-1"><p>Home and Electric Appliances</p></div>
          <div className="card text-center pt-3 col-sm-12 col-md-2 border border-1"><p>Home and Kitchen</p></div>
          <div className="card text-center pt-3 col-sm-12 col-md-2 border border-1"><p>Kitchen and Dining</p></div>


          <div className="card text-center pt-3 col-sm-12 col-md-2 border border-1"><p>Fashion</p></div>
          <div className="card text-center pt-3 col-sm-12 col-md-2 border border-1"><p>Shoes and Palm</p></div>
          <div className="card text-center pt-3 col-sm-12 col-md-2 border border-1"><p>Clothing and Outfit</p></div>
          <div className="card text-center pt-3 col-sm-12 col-md-2 border border-1"><p>Shoes and Handbags</p></div>
          <div className="card text-center pt-3 col-sm-12 col-md-2 border border-1"><p>Shoes only</p></div>
          <div className="card text-center pt-3 col-sm-12 col-md-2 border border-1"><p>Handbags only</p></div>
          <div className="card text-center pt-3 col-sm-12 col-md-2 border border-1"><p>School Kit</p></div>
          <div className="card text-center pt-3 col-sm-12 col-md-2 border border-1"><p>Education and school Resources</p></div>
          <div className="card text-center pt-3 col-sm-12 col-md-2 border border-1"><p>Jewelry and Watches</p></div>


          <div className="card text-center pt-3 col-sm-12 col-md-2 border border-1"><p>Beauty and Personal Care</p></div>
          <div className="card text-center pt-3 col-sm-12 col-md-2 border border-1"><p>Health, Household and Baby Care</p></div>
          <div className="card text-center pt-3 col-sm-12 col-md-2 border border-1"><p>Medical and Healthcare products</p></div>
          <div className="card text-center pt-3 col-sm-12 col-md-2 border border-1"><p>Medical equipment</p></div>
  

          <div className="card text-center pt-3 col-sm-12 col-md-2 border border-1"><p>Food and Grocery</p></div>
          <div className="card text-center pt-3 col-sm-12 col-md-2 border border-1"><p>Pet Supplies</p></div>


          <div className="card text-center pt-3 col-sm-12 col-md-2 border border-1"><p>Automotive and car</p></div>
          <div className="card text-center pt-3 col-sm-12 col-md-2 border border-1"><p>Scientific Equipment</p></div>
          <div className="card text-center pt-3 col-sm-12 col-md-2 border border-1"><p>Garden and Tools</p></div>


          <div className="card text-center pt-3 col-sm-12 col-md-2 border border-1"><p>Toys and Games</p></div>
          <div className="card text-center pt-3 col-sm-12 col-md-2 border border-1"><p>Video Games</p></div>
          <div className="card text-center pt-3 col-sm-12 col-md-2 border border-1"><p>Virtual Reality and Gaming</p></div>


          <div className="card text-center pt-3 col-sm-12 col-md-2 border border-1"><p>Furniture and Decor</p></div>
          <div className="card text-center pt-3 col-sm-12 col-md-2 border border-1"><p>Office Furniture</p></div>
          <div className="card text-center pt-3 col-sm-12 col-md-2 border border-1"><p>Office Products</p></div>
          <div className="card text-center pt-3 col-sm-12 col-md-2 border border-1"><p>Home Furniture</p></div>


          <div className="card text-center pt-3 col-sm-12 col-md-2 border border-1"><p>Books and Digital products</p></div>
          <div className="card text-center pt-3 col-sm-12 col-md-2 border border-1"><p>Arts, Crafts, and Sewing</p></div>
          <div className="card text-center pt-3 col-sm-12 col-md-2 border border-1"><p>Musical Instruments</p></div>
          <div className="card text-center pt-3 col-sm-12 col-md-2 border border-1"><p>Industrial and Scientific</p></div>
          <div className="card text-center pt-3 col-sm-12 col-md-2 border border-1"><p>Gifts and Special Occasions</p></div>
          <div className="card text-center pt-3 col-sm-12 col-md-2 border border-1"><p>Art and Collectibles</p></div>
          <div className="card text-center pt-3 col-sm-12 col-md-2 border border-1"><p>Travel and Luggage</p></div>


          <div className="card text-center pt-3 col-sm-12 col-md-2 border border-1"><p>Sports and Fitness</p></div>
          <div className="card text-center pt-3 col-sm-12 col-md-2 border border-1"><p>Outdoor and Recreation</p></div>
          <div className="card text-center pt-3 col-sm-12 col-md-2 border border-1"><p>Sport kIt</p></div>
          <div className="card text-center pt-3 col-sm-12 col-md-2 border border-1"><p>Hiking and Camping</p></div>
          <div className="card text-center pt-3 col-sm-12 col-md-2 border border-1"><p>Sport equiment and kits</p></div>
        </div>
      </div>

      <div className="mission mt-5 pt-5 p-2" id='vision'>
        <div>

        <div className="btn-contain d-flex gap-5 justify-content-center mt-5">
          <div className="btn btn-white border border-2 border-primary pt-3" style={{width:"15vw", height:"55px"}} onClick={ourMission}>Our mission</div>
          <div className="btn btn-white border border-2 border-primary pt-3" style={{width:"15vw", height:"55px"}} onClick={ourbelief}>Our Beliefs</div>
          <div className="btn btn-white border border-2 border-primary pt-3" style={{width:"15vw", height:"55px"}}>Our Vission</div>
        </div>
        {
          mission==true?
          <div className="row justify-content-center mt-4 change-div">
          <div className="col-sm-12 col-md-4">
            <div className="card change-img border ">
              <img src={selandbuy} alt="" />
            </div>
          </div>
          <div className="col-sm-12 col-md-6 change-content p-5">
            <p className='fs-2 text-primary'>Our Mission</p>
            <p>Our mission is to connect buyer and seller together with just using their smart phone and also create an interactive business affairs for both buyer and seller</p>
          </div>
        </div>
        :null
        }
        {
          belief==true?
          <div className="row justify-content-center mt-4 change-div">
          <div className="col-sm-12 col-md-4">
            <div className="card change-img border ">
              <img src={belefimg} alt="" />
            </div>
          </div>
          <div className="col-sm-12 col-md-6 change-content p-5">
            <p className='fs-2 text-primary'>Our Belief</p>
            <p>We belief we can make 90% enterprenuer grow their business with us without spending a lot and also reduce the rate of unemployment around the world. Through <span className='text-primary fw-bold'>Konnet</span> many people can gain a lot of experience base on marketing, enterprenuership and many more</p>
          </div>
        </div>
        :null
        }
        {

        }
        </div>
      </div>
    </div>
  )
}

export default Landingpage