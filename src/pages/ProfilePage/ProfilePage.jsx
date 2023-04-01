import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { AuthContext } from '../../context/AuthContext'
import './ProfilePage.css'
import DeleteProfileButton from '../../components/DeleteProfileButton/DeleteProfileButton'
import Spinner from '../../components/Spinner/Spinner'

const ProfilePage = (props) => {
  const { user } = useContext(AuthContext)
  console.log(user.shippingAddress)
  if (!user) {
    return <Spinner />
  }

  return (
    <div className='ProfilePage'>
      <h2>{user.username} さんのアカウント</h2>
      <div className="UserProfile">
        <div className='ProfileInfos'>
          <h3>プロフィール情報</h3>
          <p><span>Username:</span> {user.username}</p>
          <p><span>Email:</span> {user.email}</p>
          <Link to="edit-informations">
            <button>プロフィールを変更</button>
          </Link>
        </div>

        {user.shippingAddress ? (
          <div className='UserShippingAddress'>
            <h3>お届け先住所</h3>
            <p>〒{user.shippingAddress.postalCode}</p>
            <p>{user.shippingAddress.prefecture}{user.shippingAddress.city}</p>
            <p>{user.shippingAddress.town}{user.shippingAddress.addressA}</p>
            <p>{user.shippingAddress.addressB}</p>
            <p>TEL: {user.shippingAddress.phoneNumber}</p>
            <Link to='edit-address'>
              <button>編集する</button>
            </Link>
          </div>
        ) : (
          <div className='NoShippingAddress'>
            <p>配達先住所がまだ登録されていません</p>
            <Link to='add-address'
            ><button>配達先住所を登録</button>
            </Link>
          </div>
        )}
      </div>

      <div className='UserOrders'>
        <div className='OrdersContainer'>
          <p>過去の注文履歴</p>
          <Link to='/orders'>
            <button>内容を確認する</button>
          </Link>
        </div>
      </div>

      <DeleteProfileButton />
    </div>
  );
}

export default ProfilePage