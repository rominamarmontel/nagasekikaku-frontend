import React from 'react'
import './UserCard.css'

const UserCard = (props) => {
  if (!props.user || props.user === null) {
    return null;
  }
  const { _id, username, email, shippingAddress } = props.user;

  return (
    <div className='UserCard'>
      <table>
        <tbody>
          <tr>
            <td><small>{_id}</small></td>
            <td><p>{username}</p></td>
            <td><p>{email}</p></td>
            {shippingAddress && (
              <>
                <td>
                  {shippingAddress.postalCode}
                  {shippingAddress.prefecture}
                  {shippingAddress.city}
                  {shippingAddress.town}
                  {shippingAddress.addressA}
                  {shippingAddress.addressB}
                </td>
                <td>{shippingAddress.phoneNumber}</td>
              </>
            )}
          </tr>
        </tbody>
      </table>
    </div>
  )
}

export default UserCard