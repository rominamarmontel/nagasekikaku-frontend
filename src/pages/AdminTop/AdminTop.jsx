import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../../context/AuthContext'
import myApi from '../../service/service'
import UserCard from '../../components/UserCard/UserCard'
import './AdminTop.css'

const AdminTop = () => {
  const { user, setUser } = useContext(AuthContext)
  const [users, setUsers] = useState('')

  useEffect(() => {
    const url = '/user/users-list'
    myApi
      .get(url)
      .then((res) => { setUsers(res.data) })
      .catch((error) => console.error(error));
  }, []);

  return (
    <div className='AdminTop'>
      <h2>管理者専用ページ</h2>
      {users && (
        <div className="UserCard">
          {users.map((user) => {
            return <UserCard key={user._id} user={user} />;
          })}
        </div>
      )}
    </div>

  )
}

export default AdminTop