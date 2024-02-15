import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchData,addToCart } from "../../Features/Slices/UserSlice";
import "./Home.css"
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Home = () => {
  // const [desc,setDesc] = useState(-1)
  const dispatch = useDispatch();
  const data = useSelector(state=>state.Data.data.products)
  const cartdata = useSelector(state=>state.Data.cart)
  const navigate = useNavigate()
  useEffect(() => {
    fetch("https://dummyjson.com/products")
      .then((res) => res.json())
      .then((data) => dispatch(fetchData(data)));

      // console.log(data)
  }, []);
  useEffect(()=>{
    if(sessionStorage.getItem("username")){
      navigate("/home")
    }
    else{
      navigate("/")
    }
  })

  const addItemtoCart = (elem) => {
    dispatch(addToCart(elem))
    toast(`${elem.title} added to your cart`)
    console.log(cartdata)
  }


  // const mouseover = () => {
  //   setDesc(1)
  // }
  return (
    <>
    <div className="home">
    {
      data && data.map((card,ind)=>(
        <div className="card" key={ind}>
          <img className="thumbnail" src={card.thumbnail} alt="img" />
          {/* <div> */}
            <div className="desc" >{card.description}</div>     
         {/* </div> */}
          
          <div className="name">{card.title}</div>
          <div className="bottom">
            <div className="bt">
              <div className="price">Price : ${card.price}</div>
              <div className="rating">Rating : {card.rating}<i className="fa-regular fa-star"></i></div>
            </div>
            <div className="bb">
              <div className="btn">
                <button>Preview Item</button>
              </div>
              <div className="btn"><button onClick={()=>addItemtoCart(card)}>Add to Cart</button></div>
            </div>
          </div>
        </div>
      ))
    }
  </div>
    </>
  
  );
};

export default Home;
