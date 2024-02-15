import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  addToCart,
  reduceQuantity,
  emptyCart,
  removeToCart,
} from "../../Features/Slices/UserSlice";
import "./cart.css";
import toast from "react-hot-toast";

const Cart = () => {
  const cartdata = useSelector((state) => state.Data.cart);
  const [totalItems,setTotalItems] = useState(0);
  const [totalPrice,setTotalPrice] = useState(0)


  const dispatch = useDispatch();
  const handleRemove = (id) => {
    dispatch(removeToCart(id));
    toast(`item removed from cart`)
  };
  const handleIncrement = (obj) => {
    dispatch(addToCart(obj));
  };
  const handleDecrement = (obj) => {
    dispatch(reduceQuantity(obj));
  };
  const clearcart = () => {
    dispatch(emptyCart());
    toast("cart is empty ")
  };
  // Set total price & total Quantity
  const Total = () => {
    let Price = 0
    let Items = 0
      cartdata.map((val,ind)=>{
        Price = Price + val.qnty*val.price
        Items = Items + val.qnty
      })
      setTotalPrice(Price)
      setTotalItems(Items)
  }
  useEffect(()=>{
    Total()
  },[Total])
  

  return (
    <div className="main">
      <div className="cartbody">
        <div className="cartcard">
          <div className="cartcardheader">
            <span className="headleft">
              Cart Calculation{" "}
              {cartdata.length > 0 ? `(${cartdata.length})` : ""}
            </span>
            <span className="right">
              {cartdata.length > 0 ? (
                <button className="clrcartbtn" onClick={clearcart}>
                  <i className="fa-solid fa-trash"></i>
                  &nbsp;
                  <span>Clear Cart</span>
                </button>
              ) : (
                " "
              )}
            </span>
          </div>
          <div className="cartbody">
            {/* // cart thumbnail */}
            <div className="emptycart">
              {cartdata.length == 0 ? (
                <div className="icon">
                  <i className="fa-solid fa-cart-shopping ico"></i>
                </div>
              ) : (
                ""
              )}
            </div>
            {/* cart data */}
            {cartdata.length > 0 ? (
              <table>
                <thead>
                  <tr>
                    <th>Action</th>
                    <th>Product</th>
                    <th>Name</th>
                    <th>Price</th>
                    <th>Qty</th>
                    <th className="text-right">
                      <span id="amount" className="amount">
                        Total Amount
                      </span>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {cartdata.map((obj, ind) => (
                    <tr className="rows" key={ind}>
                      <td>
                        <button
                          className="prdct-delete"
                          onClick={() => handleRemove(obj.id)}
                        >
                          <i className="fa-solid fa-trash"></i>
                        </button>
                      </td>
                      <td>
                        <div>
                          <img
                            className="product-img"
                            src={obj.thumbnail}
                            alt=""
                          ></img>
                        </div>
                      </td>
                      <td>
                        <div className="product-name">
                          <p>{obj.title}</p>
                        </div>
                      </td>
                      <td>
                        <div className="product-price">
                          <p>$&nbsp;{obj.price}</p>
                        </div>
                      </td>
                      <td>
                        <div className="prdct-qty-container">
                          <button
                            className="prdct-qty-btn"
                            onClick={
                              obj.qnty <= 1
                                ? () => handleRemove(obj.id)
                                : () => handleDecrement(obj)
                            }
                          >
                            <i className="fa fa-minus"></i>
                          </button>
                          <input
                            type="text"
                            className="qty-input-box"
                            value={obj.qnty}
                            disabled
                            name=""
                            id=""
                          />
                          <button
                            className="prdct-qty-btn"
                            onClick={() => {
                              handleIncrement(obj);
                            }}
                          >
                            <i className="fa fa-plus"></i>
                          </button>
                        </div>
                      </td>
                      <td className="text-right">
                        $&nbsp;{obj.price * obj.qnty}
                      </td>
                    </tr>
                  ))}
                </tbody>
                {/* table footer */}
                <tfoot>
                    <tr>
                      <th>&nbsp;</th>
                      <th colSpan={3}>&nbsp;</th>
                      <th>
                        Items in Cart <span className="ml-2 mr-2"> : </span>
                        <span className="text-danger">{totalItems}</span>
                      </th>
                      <th className="text-right">
                        Total Price <span className="ml-2 mr-2"> : </span>
                        <span className="text-danger">{totalPrice}</span>
                      </th>
                    </tr>
                  </tfoot>
              </table>
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
