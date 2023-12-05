    import React, { useEffect, useState } from 'react';
    import { useParams } from 'react-router-dom';
    import './Uploadproduct.css';
    import '../../overallcss/overallcontainer.css'
    import uploadicon from '../../../assets/uploading.png'
    import Rightnav from '../component/rightnav/Rightnav';
    import Topnav from '../component/topnav/Topnav';
    import axios from 'axios';
import Uploadimg from './Uploadimg';
import Loading from '../../loading/Loading';

    const Uploadproduct = ({cloudimg}) => {
        let url = 'https://konet-uwrs.onrender.com/user/uploadproduct'
        const { id } = useParams();
        
        const [productImg, setproductImg] = useState(null)
        const [produtPrice, setprodutPrice] = useState('')
        const [productcategory, setproductcategory] = useState('')
        const [content, setcontent] = useState('')
        const [name, setname] = useState('')
        const [imgpg, setimgpg] = useState(false)
        const [selectedImage, setSelectedImage] = useState(null);
        const handleImageUpload = (e) => {
            const file = e.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = (event) => {
                    setSelectedImage(event.target.result);
                    setproductImg(event.target.result)
                }
                reader.readAsDataURL(file);
                if(selectedImage!==""){
                    setTimeout(() => {
                        setimgpg(true)
                    }, 1000);
                }
                setTimeout(() => {
                    setimgpg(false)
                }, 1100);
            }
        };
        useEffect(()=>{
            setTimeout(() => {
                setimgpg(false)
            }, 100);
        })
        // const [imgurl, setimgurl] = useState('')
        // console.log(localStorage.imageUrl);
        const [load, setload] = useState(false)
        const doneProduct = () =>{
            if(cloudimg==""){
                alert("image have not been save")
            }
            else{
                console.log(cloudimg);
            }
            setload(true)
            let getId = localStorage.userId
            console.log(getId);
            const productDetails={
                owner:getId,
                productTit:name,
                image:localStorage.imageUrl,
                price:Number(produtPrice),
                category:productcategory,
                hot:0,
                // comments:[],
                date:new Date().toLocaleString('en-US', { timeZone: 'UTC' }),
                discount:15,
                cont:content,
                username:id,
                userImg:"",
            }
            console.log(productDetails);
            axios.post(url, {username:id, newpro:productDetails}).then((res)=>{
                setload(false)
                if(res.data.message){
                    Swal.fire(
                        res.data.message,
                        'Wait a moment',
                        'success'
                        )
                    }
                    else{
                    Swal.fire({
                        icon: 'error',
                        title: res.data.errmessage,
                    })
                }
                
            }).catch((err)=>{
                console.log(err);
                setload(false)
            })
        }
        const triggerFileInput = () => {
            document.getElementById("file-input").click();
        };


        return (
            <div>
                <Topnav username={id}/>
                <Rightnav username={id} />
                {
                    imgpg==true?
                    <Uploadimg imagename={selectedImage}/>
                    :null
                }
                <div className="overall p-1">
                    {
                        load==true?
                        <Loading/>
                        :null
                    }
                    <div className="container p-0">
                        <div
                            id="image-container"
                            onClick={triggerFileInput}
                            className="img-div w-100">
                            {selectedImage ? (
                                <div className='text-center border mx-auto'>
                                    <img src={selectedImage} alt="Uploaded" style={{ maxWidth: "100%", maxHeight: "40vh" }} />
                                </div>

                            ) : (
                                <div>
                                    <div className='mt-3 pt-3 img-icon shadow mx-auto'>
                                        <img src={uploadicon} alt="" style={{ maxWidth: "70%", maxHeight: "40vh" }} />
                                        <p>Choose Image </p>
                                        {/* <button className='btn btn-success mt-3' onClick={uploadimg}>Upload Image</button> */}
                                    </div>
                                    <p className='mt-5 text-center'>Hello {id}, This page is where you upload your product you want to sell to your customers </p>
                                </div>
                            )}
                        </div>
                        {
                            selectedImage || !selectedImage ?
                                <div className="justfy-content-between product-details">
                                        <div>
                                        <label htmlFor="">Product name</label>
                                        <input type="text" className='mt-2 w-100' placeholder='Product name, give name to your product' style={{height:"60px"}} onChange={(e)=>{setname(e.target.value)}}/>
                                        </div>
                                    <div className="first-details mt-3">
                                        <div className='w-100'>
                                            {
                                                !localStorage.closecategory?
                                                <div className="accordion mt-3" id="accordionExample">
                                                <div className="accordion-item">
                                                    <h2 className="accordion-header">
                                                        <button className="accordion-button " type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                                                            <label htmlFor="">What is Category</label>
                                                        </button>
                                                    </h2>
                                                    <div id="collapseOne" className="accordion-collapse collapse show" data-bs-parent="#accordionExample">
                                                        <div className="accordion-body">
                                                        <p>Categories is the type of product you are selling, this will let your product locate the excact customer that are interest in your product</p>
                                                            {/* <button className='btn btn-danger' onClick={()=>{localStorage.setItem('closecategory', true)}}>Don't show me again</button> */}
                                                        </div>
                                                    </div>
                                                </div>

                                            </div>
                                            :null
                                            }
                                            
                                            <label htmlFor="" className='mt-4'>Select Category</label>
                                            <select name="" id="" className='w-100' style={{height:"60px"}} onChange={(e)=>{setproductcategory(e.target.value)}}>
                                                <option selected disabled value="">category 1</option>
                                                <option value="Electronics">Electronics</option>
                                                <option value="19">Phones and Accessories</option>
                                                <option value="20">Laptops and Computers</option>
                                                <option value="21">Electrical and Power Generators</option>
                                                <option value="22">Home and Electric Appliances</option>
                                                <option value="Electrica Tools">Electrica Tools</option>
                                                <option value="Home and Kitchen">Home and Kitchen</option>
                                                <option value="Kitchen and Dining">Kitchen and Dining</option>
                                                <option value="39">Buliding tools</option>

                                                <option selected disabled value="">category 2</option>
                                                <option value="Fashion">Fashion</option>
                                                <option value="Shoe and Palm">Shoes and Palm</option>
                                                <option value="clothing and Outfit">Clothing and Outfit</option>
                                                <option value="Shoe and Handbag">Shoes and Handbags</option>
                                                <option value="Shoe">Shoes only</option>
                                                <option value="Bags">Handbags only</option>
                                                <option value="School kit">School Kit</option>
                                                <option value="Education and School resources">Education and school Resources</option>
                                                <option value="Jewelry and Watches">Jewelry and Watches</option>

                                                <option selected disabled value="">category 3</option>
                                                <option value="Beauty and Skin Care">Beauty and Personal Care</option>
                                                <option value="Baby care">Health, Household and Baby Care</option>
                                                <option value="Medical and Healthcare">Medical and Healthcare products</option>
                                                <option value="Medical equipment">Medical equipment</option>

                                                <option selected disabled value="">category 4</option>
                                                <option value="Food and Grocery">Food and Grocery</option>
                                                <option value="Pet">Pet Supplies</option>


                                                <option selected disabled value="">category 5</option>
                                                <option value="Automotive and car">Automotive and car</option>
                                                <option value="43">Scientific Equipment</option>
                                                <option value="Garden and Tools">Garden and Tools</option>

                                                <option selected disabled value="">category 6</option>
                                                <option value="Toys and Games">Toys and Games</option>
                                                <option value="Video Games">Video Games</option>
                                                <option value="Virtual Reality and Gaming">Virtual Reality and Gaming</option>

                                                <option selected disabled value="">category 7</option>
                                                <option value="Furniture and Decor">Furniture and Decor</option>
                                                <option value="Office Furniture">Office Furniture</option>
                                                <option value="Office Products">Office Products</option>
                                                <option value="Home Furniture">Home Furniture</option>

                                                <option selected disabled value="">category 8</option>
                                                <option value="Books and Digital products">Books and Digital products</option>
                                                <option value="Arts, Crafts, and Sewing">Arts, Crafts, and Sewing</option>
                                                <option value="Musical Instruments">Musical Instruments</option>
                                                <option value="Industrial and Scientific">Industrial and Scientific</option>
                                                <option value="Gifts and Special Occasions">Gifts and Special Occasions</option>
                                                <option value="Art and Collectibles">Art and Collectibles</option>
                                                <option value="Travel and Luggage">Travel and Luggage</option>

                                                <option selected disabled value="">category 9</option>
                                                <option value="Sports and Fitness">Sports and Fitness</option>
                                                <option value="Outdoor and Recreation">Outdoor and Recreation</option>
                                                <option value="Sport">Sport kIt</option>
                                                <option value="Hiking and Camping">Hiking and Camping</option>
                                                <option value="44">Sport equiment and kits</option>


                                            </select>
                                        </div>
                                        <div className='w-100'>
                                            {
                                                !localStorage.closeprice?
                                                <div className="accordion mt-3" id="accordionExample">
                                                <div className="accordion-item">
                                                    <h2 className="accordion-header">
                                                        <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                                                            <label htmlFor="">What is Product price</label>
                                                        </button>
                                                    </h2>
                                                    <div id="collapseOne" className="accordion-collapse collapse show" data-bs-parent="#accordionExample">
                                                        <div className="accordion-body">
                                                            <p>Product price is the exact amount you want your product to be sell to your customers</p>
                                                        {/* <button className='btn btn-danger' onClick={()=>{localStorage.setItem('closeprice', true)}}>Don't show me again</button> */}
                                                        </div>
                                                    </div>
                                                </div>
                                                </div>
                                                :null
                                            }
                                            <label htmlFor="" className='mt-3'>Enter your price</label>
                                            <input type="number" className='w-100 mt-2' placeholder='Enter your Price' style={{height:"60px"}} onChange={(e)=>{setprodutPrice(e.target.value)}}/>
                                        </div>
                                    </div>
                                    <textarea name="" className='w-100 mt-3' id="" cols="30" rows="10" onChange={(e)=>{setcontent(e.target.value)}} placeholder='Write content about your product to attract and convice your customer to buy'></textarea>
                                    <button className="done mt-4" onClick={doneProduct}>Uplode Product</button>
                                </div>
                                : null
                        }
                        <input type="file" id="file-input" style={{ display: "none" }} accept="image/*" onChange={handleImageUpload} />
                    </div>
                </div>
            </div>
        );
    };

    export default Uploadproduct;
