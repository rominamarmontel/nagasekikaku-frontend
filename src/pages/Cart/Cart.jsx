import React, { useState, useEffect, useContext } from "react";
import myApi from '../../service/service'
import { Link } from "react-router-dom";
import CartCard from "../../components/CartCard/CartCard";
import './Cart.css'
import Spinner from '../../components/Spinner/Spinner'
import { FaArrowRight } from 'react-icons/fa'
import { AuthContext } from '../../context/AuthContext'


const Cart = () => {
  const [product, setProduct] = useState(null)
  const [totalPrice, setTotalPrice] = useState(0)
  const { user } = useContext(AuthContext)

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

  function calculateTotalPrice() {
    if (!product) return
    const allPrices = product.reduce((acc, val) => {
      return acc + val.qty * val.product.price
    }, 0)
    setTotalPrice(allPrices)
  }
  if (!product) return <Spinner />

  return (
    <>
      {product.length === 0 ? (
        <div className='msg-empty'>
          <p>カートの中身は空です</p>
          <Link to={'/store'}>オンラインストアへ戻る</Link>
        </div>
      ) : (
        <>
          <div className="Cart">
            <div className="container">
              <div className="title">
                <p>{user.username}さんのショッピングカート</p>
              </div>
              <div className="service-box">
                <div className="cart-details">
                  <div className='items-list'>
                    {product.map((item) => {
                      return <CartCard key={item.product._id} item={item} onRemove={fetchCart} />
                    })}
                  </div>
                </div>
                <div className="order-summary">
                  <div className="order-shokei-section">
                    <span>小計</span>
                    <span>{totalPrice} 円</span>
                  </div>
                  <div className="order-soryo-section">
                    <span>送料</span>
                    <span>{totalPrice >= 10000 ? 0 : 1500} 円</span>
                  </div>
                  <div className="order-gokei-section">
                    <span>合計</span>
                    <span>{totalPrice >= 10000 ? totalPrice : totalPrice + 1500} 円</span>
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
