import React, { useState, useEffect, useContext } from "react";
import myApi from '../../service/service'
import { Link } from "react-router-dom";
import CartCard from "../../components/CartCard/CartCard";
import './Cart.css'
import Spinner from '../../components/Spinner/Spinner'
import { FaArrowRight } from 'react-icons/fa'
import { AuthContext } from '../../context/AuthContext'
import Breadcrumb from "../../components/Breadcrumb/Breadcrumb";


const Cart = () => {
  const items = [
    { label: "HOME", link: "/" },
    { label: "ショッピングカート", active: true },
  ];
  const [product, setProduct] = useState(null)
  const [totalPrice, setTotalPrice] = useState(0)
  const [finalPrice, setFinalPrice] = useState(0)
  const { user } = useContext(AuthContext)
  const shippingFee = totalPrice >= 10000 ? 0 : 1500;

  if (!user) {
    return <Spinner />
  }

  const fetchCart = () => {
    myApi
      .get('/cart')
      .then((res) => {
        setProduct(res.data)
      })
      .catch((e) => console.error(e))
  }
  useEffect(() => {
    fetchCart()
  }, [])

  useEffect(() => calculateTotalPrice(), [product])

  useEffect(() => {
    const newFinalPrice = Number(shippingFee) + Number(totalPrice);
    setFinalPrice(newFinalPrice);
  }, [shippingFee, totalPrice]);

  function calculateTotalPrice() {
    if (!product) return
    const allPrices = product.reduce((acc, val) => {
      return acc + val.qty * val.product.price
    }, 0)
    const formattedPrice = allPrices.toLocaleString();
    const numericPrice = Number(formattedPrice.replace(/,/g, ''));
    setTotalPrice(numericPrice);
  }
  if (!product) return <Spinner />

  return (
    <>
      <div>
        <Breadcrumb items={items} />
      </div>
      {product.length === 0 ? (
        <div className='msg-empty'>
          <h3>カートの中身は空です</h3>
          <Link to={'/store'} className="back-to-store">オンラインストアへ戻る</Link>
        </div>
      ) : (
        <>
          <div className="Cart">
            <div className="title">
              <h2>商品の確認</h2>
            </div>
            <div className="container">
              <div className="service-box">
                <div className="cart-details">
                  {product.map((item) => {
                    return <CartCard key={item.product._id} item={item} onRemove={fetchCart} />
                  })}
                </div>
                <div className="order-summary">
                  <div className="order-shokei-section">
                    <span>小計</span>
                    <span>{totalPrice.toLocaleString()} 円</span>
                  </div>
                  <div className="order-soryo-section">
                    <span>送料</span>
                    <span>{shippingFee.toLocaleString()} 円</span>
                  </div>
                  <div className="order-gokei-section">
                    <span>合計</span>
                    <span>{finalPrice.toLocaleString()} 円</span>
                  </div>
                  <div className="process-to-next">
                    <Link to="/checkout">
                      <button>商品を購入
                        <FaArrowRight />
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  )
}

export default Cart;
