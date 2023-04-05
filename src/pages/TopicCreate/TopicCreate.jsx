import React, { useState } from 'react'
import Confetti from 'react-confetti'
import './TopicCreate.css'
import myApi from '../../service/service'
import { useNavigate } from 'react-router-dom'

const TopicCreate = () => {
  const [title, setTitle] = useState('')
  const [image, setImage] = useState('')
  const [description, setDescription] = useState('')
  const [showConfetti, setShowConfetti] = useState(false)
  const [imageFile, setImageFile] = useState('');
  const [message, setMessage] = useState('')
  const navigate = useNavigate()

  const handleSubmit = async (event) => {
    event.preventDefault()
    try {
      const formData = new FormData();

      formData.append("image", imageFile);
      formData.append("title", title);
      formData.append("description", description);

      const topicToCreate = { title, image, description }

      const response = await myApi.post('/topics/create', formData)
      if (!topicToCreate) {
        setMessage('Please enter Topic information')
      }
      if (response.status === 201) {
        setShowConfetti(true)

        setTimeout(() => {
          setShowConfetti(false)
          navigate('/topic')
        }, 3000)
      }
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <>
      <div className='TopicCreate'>
        <div className='container'>
          <div className='title'>
            <h2>お知らせの新規作成</h2>
            <h5>【管理者画面】</h5>
          </div>
          <form onSubmit={handleSubmit}>
            <div className='form-box'>
              <div>
                <label htmlFor="name">タイトル:</label>
                <div>
                  <input
                    type='text'
                    value={title}
                    name="title"
                    id="title"
                    onChange={(event) => setTitle(event.target.value)}
                  ></input>
                </div>
                <div>
                  <label htmlFor="edit-image">画像:</label>
                  <div>
                    <input type="file" name="image" onChange={(e) => setImageFile(e.target.files[0])} />
                  </div>
                  <label htmlFor="description">詳細: </label>
                  <div>
                    <textarea
                      type='text'
                      value={description}
                      name="description"
                      id="description"
                      onChange={(event) => setDescription(event.target.value)}
                    ></textarea>
                  </div>
                </div>
              </div>
              <div>{message}</div>
              <div className='create-btns'>
                <button>トピックを作成する</button>
              </div>
              {showConfetti && <Confetti recycle={false} />}
            </div>
          </form>
        </div>
      </div>
    </>
  )
}

export default TopicCreate