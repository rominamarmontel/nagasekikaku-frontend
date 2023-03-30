import React from "react";
import myApi from '../../service/service'
import { FiX } from 'react-icons/fi'
import './CartCard.css'

const CartCard = (props) => {
  const { qty, product } = props.item
  const totalPrice = Number(product.price * qty)

  const handleDelete = async (id) => {
    try {
      await myApi.delete(`/cart/remove/${product._id}`)
      props.onRemove()
    } catch (error) {
      console.log(error)
    }
  }

  const handleSubmit = (event) => {
    event.preventDefault()
  }

  return (
    <>
      <div className='CartCard'>


        <img src={product.image} alt='{product.name}' width={100} />
        <div><p>{product.name}</p></div>
        <div><p>{qty}</p></div>
        <div><p>{totalPrice} 円</p></div>
        <form onSubmit={handleSubmit}>
          <button onClick={() => handleDelete(product._id)} type="button" className="btn-delete">
            <FiX className="batsu-icon" />
          </button>
        </form>
      </div>
    </>
  )
}
export default CartCard