import React, { useState } from 'react'
import Confetti from 'react-confetti'
import './ProductCreate.css'
import myApi from '../../service/service'
import { useNavigate } from 'react-router-dom'

const ProductCreate = () => {
  const [name, setName] = useState('')
  const [image, setImage] = useState('')
  const [brand, setBrand] = useState('')
  const [category, setCategory] = useState('')
  const [price, setPrice] = useState(0)
  const [countInStock, setCountInStock] = useState(0)
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
      formData.append("name", name);
      formData.append("brand", brand);
      formData.append("category", category);
      formData.append("price", price);
      formData.append("countInStock", countInStock);
      formData.append("description", description);
      console.log('*****', formData.get('image'));
      const productToCreate = { name, image, brand, category, description, price, countInStock }
      const response = await myApi.post('/products/create', formData)
      console.log(response)
      if (!productToCreate) {
        setMessage('Please enter product information')
      }
      if (response.status === 201) {
        setShowConfetti(true)

        setTimeout(() => {
          setShowConfetti(false)
          navigate('/store')
        }, 3000)
      }
    } catch (error) {
      console.error(error)
    }
  }
  const handleSelect = e => {
    setCategory(e.target.value);
  };

  return (
    <>
      <div className='ProductCreate'>
        <div className='container'>
          <div className='title'>
            <h2>商品の新規作成</h2>
            <h5>【管理者画面】</h5>
          </div>
          <form action="/profile" method="post" onSubmit={handleSubmit} enctype="multipart/form-data">
            <div className='form-box'>
              <div>
                <label htmlFor="name">名前</label>
                <div>
                  <input
                    type='text'
                    value={name}
                    name="name"
                    id="name"
                    onChange={(event) => setName(event.target.value)}
                  ></input>
                </div>

                <label htmlFor="brand">ブランド </label>
                <div>
                  <input
                    type='text'
                    value={brand}
                    name="brand"
                    id="brand"
                    onChange={(event) => setBrand(event.target.value)}
                  ></input>
                </div>
                <label htmlFor="category">カテゴリー</label>
                <div>
                  <select value={category} onChange={(event) => setCategory(event.target.value)}>
                    <option value="選択">選択する</option>
                    <option value="家具">家具</option>
                    <option value="食器">食器</option>
                    <option value="美術品">美術品</option>
                    <option value="雑貨">雑貨</option>
                  </select>
                </div>
                <label htmlFor="price">価格（税込）</label>
                <div>
                  <input
                    type='number'
                    value={price.toLocaleString()}
                    name="price"
                    id="price"
                    min='1'
                    onChange={(event) => setPrice(event.target.value)}
                  ></input>
                </div>
                <label htmlFor="countInStock">在庫数</label>
                <div>
                  <input
                    type='number'
                    value={countInStock}
                    name="countInStock"
                    id="countInStock"
                    min='0'
                    onChange={(event) => setCountInStock(event.target.value)}
                  ></input>
                </div>
              </div>

              <div>
                <label htmlFor="edit-image">商品画像</label>
                <div>
                  <input type="file" name="image" onChange={(e) => setImageFile(e.target.files[0])} />
                </div>
                <label htmlFor="description">商品説明</label>
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
              <button>作成する</button>
              {showConfetti && <Confetti recycle={false} />}
            </div>
          </form>
        </div>
      </div>
    </>
  )
}

export default ProductCreate