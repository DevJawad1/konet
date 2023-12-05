import axios from 'axios'
import React, { useEffect, useState, useRef } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
// import logo from '../../../assets/logoimg-removebg-preview.png'
import './Home.css'
import Rightnav from '../component/rightnav/Rightnav'
import Topnav from '../component/topnav/Topnav'
import '../../overallcss/overallcontainer.css'
import Like from './Actions/Like'
import Deletcom from './Actions/Deletcom'
import Addcustomer from './Actions/Addcustomer'
const Home = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [allProduct, setallProduct] = useState([])
  const [commetsec, setcommetsec] = useState(false)
  const [commetWord, setcommetWord] = useState("")
  const [showUsercom, setshowUsercom] = useState(false)
  const [verifycom, setverifycom] = useState("")
  const [allCom, setallCom] = useState([])
  const [likecheck, setlikecheck] = useState(false)
  const [calclike, setcalclike] = useState(Number())
  const [deletcom, setdeletcom] = useState(false)
  const [ctgr, setctgr] = useState("")
  const [instal, setinstal] = useState(null)
  // const [addlike, setaddlike] = useState(null)
  let url = 'https://konet-uwrs.onrender.com/user/home'
  let likeurl = 'http://localhost:2500/user/like'

  const sendComment = ({ installer }) => {
    // setinstal(installer)
    // console.log(installer);
    const userId = localStorage.userId;
    const img = localStorage.userimg;
    setshowUsercom(true)
    axios.post(url, { usercomment: { comment: commetWord, user: userId, productid: verifycom, userImg: img, username: id } })
      .then((res) => {
        console.log("Comment sent");
        if (document.getElementById('first')) {
        }
        document.getElementById('first').style.display = "none"
      })
      .catch(err => {
        console.log(err);
      });
  };

  useEffect(() => {
    axios.post(url)
      .then((res) => {
        setallProduct(res.data.allproducts)
        console.log(res.data.allproducts);
        // console.log(res.data.allcoments);
        if (res.data.allcoments) {
          setallCom(res.data.allcoments)
          console.log(res.data.allcoments)
        }
      }).catch(err => {
        console.log(err);
      })
  }, [])
  const comment = (get) => {
    setcommetsec(true)
    setverifycom(get)
  }
  const [fullcontent, setfullcontent] = useState(false)
  const [fullcontentid, setfullcontentid] = useState("second")
  const showfullcontent =(i)=>{
    if(fullcontent==false){
      setfullcontent(true)
    }
    else{
      setfullcontent(false)
    }
    setfullcontentid(i)
  }
  const [addone, setaddone] = useState(0)
  const [pid, setpid] = useState("")
  const like = (get, i, value) => {
    localStorage.setItem('currentplace', i)
    localStorage.setItem("username", id)
    localStorage.setItem('prodId', get)
    setpid(get)
    console.log(pid, get);
    setlikecheck(true)
    setTimeout(() => {
      setlikecheck(false)
    }, 200);
    setaddone(addone+1)
    // value=tot
    console.log(addone);
  }


  const closeComment = () => {
    setcommetsec(false)
    console.log(commetsec);
    // document.getElementById('noscroll').style.position="relative"
  }
  const closeAnimate = () => {
    if (commetsec == true) {
      setcommetsec(false)
      setfullcontent(false)
    }
    // setsetting(false)

  }
  const [comopt, setcomopt] = useState(false)
  const [comoptId, setcomoptId] = useState(Number())
  const commopt = (i) => {
    setcomoptId(i)
    if (comopt == false) {
      setcomopt(true)

    }
    else {
      setcomopt(false)
    }
  }

  const deletcmt = () => {
    setdeletcom(true)
    setTimeout(() => {
      setdeletcom(false)
    }, 150);
  
  }

  const [searchBar, setsearchBar] = useState("")
  const [bar, setbar] = useState(false)
  const [filterprd, setfilterprd] = useState([])
  // console.log(filterprd.length);
  const filterObjects = () => {
    // console.log(document.getElementById('search-bar'));
    const searchTerm = searchBar.toLowerCase();
    // console.log(allProduct);
    const filteredData = allProduct.filter(item =>
      item.category.toLowerCase().includes(searchTerm)
      // || item.category.toLowerCase().includes(searchTerm)
      );
    setbar(false)
    setfilterprd(filteredData)
    // console.log(filteredData);
    // displayResults(filteredData);
  }
  const [addcstpage, setaddcstpage] = useState("")
  const [showfollow, setshowfollow] = useState("")
  let urladdcst = 'http://localhost:2500/user/addcustomer'
  const addcst=(cst, i)=>{
    if(cst==localStorage.userId){
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "You cannot add yourself",
      });
    }
    else{
      axios.post(urladdcst, {recivingcst:cst, addingcst:localStorage.userId}).then((res)=>{
        console.log('sent');
        setaddcstpage("Now following ✔")
        setshowfollow(i)
        setTimeout(() => {
          setaddcstpage("")
        }, 1000);
    }).catch((err)=>{
        console.log(err);
    })
    }
  }
  return (
    <div>
      <Topnav username={id} />
      <Rightnav username={id} />
      {/* <Rightnav obj={{username:id, instal:instal}} /> */}
      {
        likecheck == true ?
          <Like url={likeurl} />
          : null
      }
      <div className="overall mt-5 pt-2">
        <div className='d-flex gap-1 pt-1 bg-white just mx-1 px-1 cat'>
          <div className=""><p className='shado bg-light p-1 text-center border border-2' style={{ width: "50px" }} onClick={() => { setctgr("") }}>All</p></div>
          <div className=""><p className='shado bg-light p-1 text-center border border-2' onClick={() => { setctgr("Electronics") }}>Electronics</p></div>
          <div className=""><p className='shado bg-light p-1 text-center  border border-2' onClick={() => { setctgr("19") }}>Phone and Accessories</p></div>
          <div className=""><p className='shado bg-light p-1 text-center  border border-2' onClick={() => { setctgr("20") }}>Laptops and Computer</p></div>
          <div className=""><p className='shado bg-light p-1 text-center  border border-2' style={{ width: "250px" }} onClick={() => { setctgr("21") }}>Electrical and Power Generators</p></div>
          <div className=""><p className='shado bg-light p-1 text-center  border border-2' style={{ width: "250px" }} onClick={() => { setctgr("22") }}>Home and Electric Appliances</p></div>
          <div className=""><p className='shado bg-light p-1 text-center  border border-2' onClick={() => { setctgr("Electrical Tools") }}>Electric Tools</p></div>
          <div className=""><p className='shado bg-light p-1 text-center  border border-2' onClick={() => { setctgr("Home and Kitchen") }}>Home and Kitchen</p></div>
          <div className=""><p className='shado bg-light p-1 text-center  border border-2' onClick={() => { setctgr("Kitchen and Dining") }}>Kitchen and Dining</p></div>
          <div className=""><p className='shado bg-light p-1 text-center  border border-2' onClick={() => { setctgr("39") }}>Building tools</p></div>
          <div className=""><p className='shado bg-light p-1 text-center  border border-2' onClick={() => { setctgr("Fashion") }}>Fashion</p></div>
          <div className=""><p className='shado bg-light p-1 text-center  border border-2' onClick={() => { setctgr("Shoe and Palm") }}>Shoes and Palm</p></div>
          <div className=""><p className='shado bg-light p-1 text-center  border border-2' onClick={() => { setctgr("clothing and Outfit") }}>Clothing and Outfit</p></div>
          <div className=""><p className='shado bg-light p-1 text-center  border border-2' onClick={() => { setctgr("Shoe and Handbag") }}>Shoes and Handbags</p></div>
          <div className=""><p className='shado bg-light p-1 text-center  border border-2' onClick={() => { setctgr("Shoe"), console.log(ctgr); }}>Shoes only</p></div>
          <div className=""><p className='shado bg-light p-1 text-center  border border-2' onClick={() => { setctgr("Bags"), console.log(ctgr); }}>Handbags only</p></div>
          <div className=""><p className='shado bg-light p-1 text-center  border border-2' onClick={() => { setctgr("School kit") }}>School Kit</p></div>
          <div className=""><p className='shado bg-light p-1 text-center  border border-2' style={{ width: "250px" }} onClick={() => { setctgr("Education and School resources"), console.log(ctgr) }}>Education and school Resources</p></div>
          <div className=""><p className='shado bg-light p-1 text-center  border border-2' onClick={() => { setctgr("Jewelry and Watches") }}>Jewelry and Watches</p></div>
          <div className=""><p className='shado bg-light p-1 text-center  border border-2' onClick={() => { setctgr("Beauty abd Skin Care") }}>Beauty and Personal Care</p></div>
          <div className=""><p className='shado bg-light p-1 text-center  border border-2' style={{ width: "250px" }} onClick={() => { setctgr("Baby care") }}>Health, Household and Baby Care</p></div>
          <div className=""><p className='shado bg-light p-1 text-center  border border-2' style={{ width: "250px" }} onClick={() => { setctgr("Medical and Healthcare") }}>Medical and Healthcare products</p></div>
          <div className=""><p className='shado bg-light p-1 text-center  border border-2' onClick={() => { setctgr("Medical equipment") }}>Medical equipment</p></div>
          <div className=""><p className='shado bg-light p-1 text-center  border border-2' onClick={() => { setctgr("Food and Grocery") }}>Food and Grocery</p></div>
          <div className=""><p className='shado bg-light p-1 text-center  border border-2' onClick={() => { setctgr("Pet") }}>Pet Supplies</p></div>
          <div className=""><p className='shado bg-light p-1 text-center  border border-2' onClick={() => { setctgr("Automotive and car") }}>Automotive and car</p></div>
          <div className=""><p className='shado bg-light p-1 text-center  border border-2' onClick={() => { setctgr("43") }}>Scientific Equipment</p></div>
          <div className=""><p className='shado bg-light p-1 text-center  border border-2' onClick={() => { setctgr("Garden and Tools") }}>Garden and Tools</p></div>
          <div className=""><p className='shado bg-light p-1 text-center  border border-2' onClick={() => { setctgr("Toys and Games") }}>Toys and Games</p></div>
          <div className=""><p className='shado bg-light p-1 text-center  border border-2' onClick={() => { setctgr("Video Games") }}>Video Games</p></div>
          <div className=""><p className='shado bg-light p-1 text-center  border border-2' onClick={() => { setctgr("Virtual Reality and Gaming") }}>Virtual Reality and Gaming</p></div>
          <div className=""><p className='shado bg-light p-1 text-center  border border-2' onClick={() => { setctgr("Furniture and Decor") }}>Furniture and Decor</p></div>
          <div className=""><p className='shado bg-light p-1 text-center  border border-2' onClick={() => { setctgr("Office Furniture") }}>Office Furniture</p></div>
          <div className=""><p className='shado bg-light p-1 text-center  border border-2' onClick={() => { setctgr("Office Products") }}>Office Products</p></div>
          <div className=""><p className='shado bg-light p-1 text-center  border border-2' onClick={() => { setctgr("Home Furniture") }}>Home Furniture</p></div>
          <div className=""><p className='shado bg-light p-1 text-center  border border-2 t-five' onClick={() => { setctgr("Book and Digital products") }}>Books and Digital products</p></div>
          <div className=""><p className='shado bg-light p-1 text-center  border border-2' onClick={() => { setctgr("Arts, Crafts, and Sewing") }}>Arts, Crafts, and Sewing</p></div>
          <div className=""><p className='shado bg-light p-1 text-center  border border-2' onClick={() => { setctgr("Musical Instruments") }}>Musical Instruments</p></div>
          <div className=""><p className='shado bg-light p-1 text-center  border border-2' onClick={() => { setctgr("Industrial and Scientific") }}>Industrial and Scientific</p></div>
          <div className=""><p className='shado bg-light p-1 text-center  border border-2 t-five' onClick={() => { setctgr("Gifts and Special Occasions") }}>Gifts and Special Occasions</p></div>
          <div className=""><p className='shado bg-light p-1 text-center  border border-2' onClick={() => { setctgr("Art and Collectibles") }}>Art and Collectibles</p></div>
          <div className=""><p className='shado bg-light p-1 text-center  border border-2' onClick={() => { setctgr("Travel and Luggage") }}>Travel and Luggage</p></div>
          <div className=""><p className='shado bg-light p-1 text-center  border border-2' onClick={() => { setctgr("Sports and Fitness") }}>Sports and Fitness</p></div>
          <div className=""><p className='shado bg-light p-1 text-center  border border-2' onClick={() => { setctgr("Outdoor and Recreation") }}>Outdoor and Recreation</p></div>
          <div className=""><p className='shado bg-light p-1 text-center  border border-2' onClick={() => { setctgr("Sport") }}>Sport kIt</p></div>
          <div className=""><p className='shado bg-light p-1 text-center  border border-2' onClick={() => { setctgr("Hiking and Camping") }}>Hiking and Camping</p></div>
          <div className=""><p className='shado bg-light p-1 text-center  border border-2' onClick={() => { setctgr("44") }}>Sport equiment and kits</p></div>
        </div>
          {
            filterprd.length>0?
            <div className='w-100 bg-white pt-1' style={{position:"fixed", marginTop:"-5px", height:"50px"}}>
            <button onClick={()=>setfilterprd([])} className='btn border border-1 w-100'><i class="ri-arrow-left-circle-fill"></i>Back</button>
            </div>
            :null
          }
        <div className="row gap-3 mx-1 mt-5 justify-content-cente " id='noscroll'>
          {
            filterprd.length == 0 ?
              allProduct.map((product, i) => (
                ctgr == "" ?
                  <div className='cards col-sm-12 col-md-2 p-2' key={i} onClick={closeAnimate}>
                    <div className="d-flex gap-2">
                    <div className="round"></div>
                    <p className='pt-2'>{product.username}</p>
                    </div>
                    <div className="scroll d-flex gap-2">
                      <p style={{color:"black"}}>
                        {/* Lorem ipsum dolor sit amet consectetur adipisicing elit. Eveniet, magnam. */}
                        {product.cont.length>71?
                          <span>
                            {product.cont.slice(0, 71)}
                            <span onClick={()=>{showfullcontent(product._id)}} style={{borderBottom:"1px solid"}}> 
                            {
                              fullcontent==true?
                            <span> close<i className="ri-arrow-up-s-line"></i></span>
                            :<span> see more<i className="ri-arrow-down-s-line"></i></span>
                            }
                            </span>
                            <div>
                              {
                                fullcontent==true && fullcontentid==product._id?
                                <div style={{position:"absolute"}} className='bg-white shadow p-2'>
                                  <span>{product.cont}</span> <br />
                                  <span className='pt-1' onClick={()=>{setfullcontent(false)}}>close <i className="ri-close-fill"></i></span>
                                </div>
                                :null
                              }
                            </div>
                          </span>
                         :<p className='pt-1'>{product.cont}</p>
                      }
                      </p>
                    </div>
                    <div className="text-center">
                      <img src={product.image} alt="" id={`${i}img`} className='img'/>
                    </div>                    
                    <div className="d-flex mt-2 gap-3 justify-content-between">
                      <p className='text-center w-100 btn-action p-1 pt-0' onClick={() => { like(product._id, i, product.hot) }}>
                        <i className="bi bi-hand-thumbs-up-fill"> </i>
                        <span>
                        <span>
                          {
                          pid==""?
                          product.hot
                          :product._id==pid?
                          product.hot+addone
                          :null
                          }</span>
                        </span>
                      </p>
                      <p className='text-center w-100 btn-action p-1 pt-0'>
                        <div className='shadow p-1 bg-white' style={{position:"absolute", marginTop:"-30px"}}>
                          {
                            addcstpage!=="" && showfollow==i?
                            addcstpage
                            :null
                          }
                        </div>
                        <i className="bi bi-person-fill-add" onClick={()=>{addcst(product.owner, i)}}></i>
                      </p>
                      <p className='text-center w-100 btn-action p-1 pt-0' onClick={() => { comment(product._id) }}>
                        <i className="bi bi-chat-dots-fill"></i>
                        <span>
                          {
                            allCom.reduce((count, com) => {
                              return com.productid == verifycom ? count + 1 : count;
                            }, 0)
                          }
                        </span>
                      </p>
                    </div>
                  </div>
                  : filterprd.map((product, i) => (
                    <div className='cards col-sm-12 col-md-2 p-2' key={i} onClick={closeAnimate}>
                    <div className="d-flex gap-2">
                    <div className="round"></div>
                    <p className='pt-2'>{product.username}</p>
                    </div>
                    <div className="scroll d-flex gap-2">
                      <p>
                      {product.cont.length>71?
                          <span>
                            {product.cont.slice(0, 71)}
                            <span onClick={()=>{showfullcontent(product._id)}} style={{borderBottom:"1px solid"}}> 
                            {
                              fullcontent==true?
                            <span> close<i className="ri-arrow-up-s-line"></i></span>
                            :<span> see more<i className="ri-arrow-down-s-line"></i></span>
                            }
                            </span>
                            <div>
                              {
                                fullcontent==true && fullcontentid==product._id?
                                <div style={{position:"absolute"}} className='bg-white shadow p-2'>
                                  <span>{product.cont}</span> <br />
                                  <span className='pt-1' onClick={()=>{setfullcontent(false)}}>close <i className="ri-close-fill"></i></span>
                                </div>
                                :null
                              }
                            </div>
                          </span>
                         :<p className='pt-1'>{product.cont}</p>
                      }
                      </p>
                    </div>
                    <div className="text-center">
                      <img src={product.image} alt="" id={`${i}img`} className='img'/>
                    </div>                    
                    <div className="d-flex mt-2 gap-3 justify-content-between">
                      <p className='text-center w-100 btn-action p-1 pt-0' onClick={() => { like(product._id, i, product.hot) }}>
                        <i className="bi bi-hand-thumbs-up-fill"> </i>
                        <span>
                        <span>
                          {
                          pid==""?
                          product.hot
                          :product._id==pid?
                          product.hot+addone
                          :null
                          }</span>
                        </span>
                      </p>
                      <p className='text-center w-100 btn-action p-1 pt-0'>
                        <div className='shadow p-1 bg-white' style={{position:"absolute", marginTop:"-30px"}}>
                          {
                            addcstpage!=="" && showfollow==i?
                            addcstpage
                            :null
                          }
                        </div>
                        <i className="bi bi-person-fill-add" onClick={()=>{addcst(product.owner, i)}}></i>
                      </p>
                      <p className='text-center w-100 btn-action p-1 pt-0' onClick={() => { comment(product._id) }}>
                        <i className="bi bi-chat-dots-fill"></i>
                        <span>
                          {
                            allCom.reduce((count, com) => {
                              return com.productid == verifycom ? count + 1 : count;
                            }, 0)
                          }
                        </span>
                      </p>
                    </div>
                  </div>
                  ))
              ))
              :null
          }
          <div className="row gap-2 justify-content-cener " id='noscroll'>
            {
              allProduct.map((product, i) => (
                ctgr == product.category ?
                <div className='cards col-sm-12 col-md-2 p-2' key={i} onClick={closeAnimate}>
                <div className="d-flex gap-2">
                <div className="round"></div>
                <p className='pt-2'>{product.username}</p>
                </div>
                <div className="scroll d-flex gap-2">
                  <p>
                  {product.cont.length>71?
                          <span>
                            {product.cont.slice(0, 71)}
                            <span onClick={()=>{showfullcontent(product._id)}} style={{borderBottom:"1px solid"}}> 
                            {
                              fullcontent==true &&fullcontentid==product._id?
                             <span style={{cursor:"pointer"}}> close<i className="ri-arrow-up-s-line"></i></span>
                            :<span style={{cursor:"pointer"}}> see more<i className="ri-arrow-down-s-line"></i></span>
                            }
                            </span>
                            <div>
                              {
                                fullcontent==true && fullcontentid==product._id?
                                <div style={{position:"absolute"}} className='bg-white shadow p-2'>
                                  <span>{product.cont}</span> <br />
                                  <span className='pt-1' onClick={()=>{setfullcontent(false)}}>close <i className="ri-close-fill"></i></span>
                                </div>
                                :null
                              }
                            </div>
                          </span>
                            :
                          <p className='pt-1'>{product.cont}</p>
                      }
                  </p>
                </div>
                <div className="text-center">
                  <img src={product.image} alt="" id={`${i}img`} className='img'/>
                </div>                    
                <div className="d-flex mt-2 gap-3 justify-content-between">
                  <p className='text-center w-100 btn-action p-1 pt-0' onClick={() => { like(product._id, i, product.hot) }}>
                    <i className="bi bi-hand-thumbs-up-fill"> </i>
                    <span>
                    <span>
                      {
                      pid==""?
                      product.hot
                      :product._id==pid?
                      product.hot+addone
                      :null
                      }</span>
                    </span>
                  </p>
                  <p className='text-center w-100 btn-action p-1 pt-0'>
                    <div className='shadow p-1 bg-white' style={{position:"absolute", marginTop:"-30px"}}>
                      {
                        addcstpage!=="" && showfollow==i?
                        addcstpage
                        :null
                      }
                    </div>
                    <i className="bi bi-person-fill-add" onClick={()=>{addcst(product.owner, i)}}></i>
                  </p>
                  <p className='text-center w-100 btn-action p-1 pt-0' onClick={() => { comment(product._id) }}>
                    <i className="bi bi-chat-dots-fill"></i>
                    <span>
                      {
                        allCom.reduce((count, com) => {
                          return com.productid == verifycom ? count + 1 : count;
                        }, 0)
                      }
                    </span>
                  </p>
                </div>
              </div>
                  :null
              ))
            }
          </div>
          {
            commetsec == true ?
              <div className='comment-cover'>
                <div className="comment-div pt-1" id='comment-div'>
                  <div className="text-end">
                    <button className='btn  ' onClick={closeComment}><i className="ri-close-fill"></i> Close</button>
                  </div>
                  <div className="p-1">
              
                    {
                      showUsercom == true ?
                        <div className="mx-1 mt-2 d-flex border justify-content-between com-content" style={{ alignItems: "center" }}>
                          <div className='pt-1'>
                            <div className='d-flex com-flex gap-2 px-1'>
                              <div className="pic">
                              </div>
                              <p className='fw-bold'>{id}</p>
                            </div>
                            <div></div>
                            <div className='px-5' style={{ marginTop: "-10px" }}>
                              <p>{commetWord}</p>
                            </div>
                          </div>
                          <p className='fs-5' onClick={() => { commopt }}><i class="bi bi-three-dots-vertical"></i></p>
                        </div>
                        : null
                    }
                    <div className="scrolls">
                      {allCom.map((com, i) => (
                        com.productid == verifycom ?
                          <div className="mx-1 mt-2 d-flex border justify-content-between com-content" style={{ alignItems: "center" }}>
                            {
                              deletcom == true ?
                                <Deletcom comId={com._id} />
                                : null
                            }
                            <div className='pt-1' key={i}>
                              <div className="d-flex gap-2 px-1 com-flex">
                                <div className="pic">
                                </div>
                                <p className='fw-bold'>{com.username}</p>
                              </div>
                              <div></div>
                              <div className='px-5' style={{ marginTop: "-10px" }}>
                                <p>{com.comment}</p>
                              </div>
                            </div>
                            <p className='fs-5' onClick={() => { commopt(i) }}><i class="bi bi-three-dots-vertical"></i></p>
                            {
                              comopt == true && comoptId == i ?
                                <div className="pops border shaow pt-3 p-3 px-1">
                                  {
                                    com.user == localStorage.userId ?
                                      <div className='text-light p-1' onClick={deletcmt}>
                                        <i className="ri-logout-box-fill"></i> <span>Delete</span>
                                      </div>
                                      : null
                                  }
                                  <div className='text-light mt-2 p-1'>
                                    <i className="ri-logout-box-fill"></i> <span>Report</span>
                                  </div>
                                  <div className='text-light text-center mt-2 p-1 close' onClick={() => { setcomopt(false) }}>
                                    <span>Close Option </span>
                                    <i className="ri-close-circle-line"></i>
                                  </div>
                                </div>
                                : null
                            }
                          </div>
                          : null
                      ))
                      }
                    </div>
                  </div>
                  <div className="d-flex comment-inp-holder px-2 mx-2">
                    <input type="text" onChange={(e) => { setcommetWord(e.target.value) }} className='mx-auto' placeholder='Write your comment' />
                    <button className="btn text-dark" onClick={sendComment}><i className="ri-send-plane-2-fill"></i></button>
                  </div>

                </div>
              </div>
              : null
          }
        </div>
      </div>
      <div className="searchbtn">
      <input type="text" onChange={(e) => { setsearchBar(e.target.value) }} />
      <div className='text-center text-black' onClick={filterObjects}>
      <span><i className="bi bi-search"></i></span>
      </div>
      <div className='text-center text-black sm' data-bs-toggle="modal" data-bs-target="#exampleModal">
      <span><i className="bi bi-search"></i></span>
      </div>
      </div>
      <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h1 class="modal-title fs-5" id="exampleModalLabel">Search Bar</h1>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
              <button className='btn border text-success'>Search People</button>
              <button className='btn border text-success mx-2' onClick={() => { setbar(true) }}>Search</button>
              {
                bar == true ?
                  <div style={{ position: "absolute", width: "91%", top: "-10px", }} className='bg-white'>
                    <button className='btn' onClick={() => { setbar(false) }}>Back</button>
                    <div className="d-flex bg-white shadow" style={{ height: "50px", border: "1px solid green" }}>
                      <input type="" style={{ border: "none", outline: "none", width: "100%" }} placeholder='Search' onChange={(e) => { setsearchBar(e.target.value) }} />
                      <button className="btn border-0" onClick={filterObjects} data-bs-dismiss="modal"><i className="bi bi-search"></i></button>
                    </div>
                  </div>
                  : null
              }

            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>  
              {/* <button type="button" class="btn btn-primary">Save changes</button> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home