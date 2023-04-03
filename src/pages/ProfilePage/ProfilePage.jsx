import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { AuthContext } from '../../context/AuthContext'
import './ProfilePage.css'
import DeleteProfileButton from '../../components/DeleteProfileButton/DeleteProfileButton'
import Spinner from '../../components/Spinner/Spinner'
import Breadcrumb from '../../components/Breadcrumb/Breadcrumb'

const ProfilePage = () => {
  const items = [
    { label: "HOME", link: "/" },
    { label: "アカウントページ", active: true },
  ];

  const { user } = useContext(AuthContext)
  if (!user) {
    return <Spinner />
  }

  return (
    <>
      <div>
        <Breadcrumb items={items} />
      </div>
      <div className='ProfilePage'>
        <div className='title'>
          <h2>{user.username} さんのアカウント</h2>
        </div>
        <div className='container'>
          <div className="UserProfile">
            <h3>プロフィール情報</h3>
            <div className='ProfileInfos'>
              <p><span>お名前:</span> {user.username}</p>
              <p><span>メールアドレス:</span> {user.email}</p>
            </div>
            <div>
              <Link to="edit-informations">
                <button>プロフィールを変更</button>
              </Link>
            </div>
          </div>

          {user.shippingAddress ? (
            <div className='UserShippingAddress'>
              <h3>お届け先住所</h3>
              <div className='=ShippingAddressInfos'>
                <p>〒{user.shippingAddress.postalCode}</p>
                <p>{user.shippingAddress.prefecture}{user.shippingAddress.city}</p>
                <p>{user.shippingAddress.town}{user.shippingAddress.addressA}</p>
                <p>{user.shippingAddress.addressB}</p>
                <p>TEL: {user.shippingAddress.phoneNumber}</p>
              </div>
              <div>
                <Link to='edit-address'>
                  <button>編集する</button>
                </Link>
              </div>
            </div>
          ) : (
            <div className='NoShippingAddress'>
              <p>配達先住所がまだ登録されていません</p>
              <Link to='add-address'
              ><button>配達先住所を登録</button>
              </Link>
            </div>
          )}

          {/* {order.purchaseDate ? (
        <div className='UserOrders'>
          <p>過去の注文履歴</p>
          <div className='OrdersContainer'>
            <div></div>
            <div>
              <Link to='/orders'>
                <button>内容を確認する</button>
              </Link>
            </div>
          </div>
        </div>
      ) : (
        <div className='NoOrder'>
          <p>注文された商品はありません</p>
        </div>
      )} */}
          <div>
            <DeleteProfileButton />
          </div>
        </div>
      </div>
    </>
  )
}

export default ProfilePage