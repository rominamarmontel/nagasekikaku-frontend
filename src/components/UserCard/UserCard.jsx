import React from 'react'
import './UserCard.css'

const UserCard = (props) => {
  console.log(props)
  if (!props.user || props.user === null) {
    return null;
  }
  const { _id, username, email, shippingAddress } = props.user;

  return (
    <div className='UserCard'>
      <p>{_id}</p>
      <p>{username}</p>
      <p>{email}</p>
      {shippingAddress && (
        <div>
          <p>{shippingAddress.postalCode}
            {shippingAddress.prefecture}
            {shippingAddress.city}
            {shippingAddress.town}
            {shippingAddress.addressA}
            {shippingAddress.addressB}</p>
          <p>{shippingAddress.phoneNumber}</p>
        </div>
      )}
    </div>
  )
}

export default UserCard