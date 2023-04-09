import React, { useState, useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom";
import './ProductEditForm.css'
import myApi from '../../service/service'

const ProductEditForm = (props) => {
  const [editIsOn, setEditIsOn] = useState(false);
  const [name, setName] = useState("");
  const [brand, setBrand] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState(0);
  const [countInStock, setCountInStock] = useState(0);
  const [description, setDescription] = useState("");
  const [imageFile, setImageFile] = useState('');
  const [product, setProduct] = useState({});
  const navigate = useNavigate();
  const params = useParams();
  const productId = params.id;

  useEffect(() => {
    const url = `/products/${productId}`;
    myApi
      .get(url)
      .then((res) => {
        setProduct(res.data.oneProduct);
        setName(res.data.oneProduct.name);
        setBrand(res.data.oneProduct.brand);
        setCategory(res.data.oneProduct.category);
        setPrice(res.data.oneProduct.price);
        setCountInStock(res.data.oneProduct.countInStock);
        setDescription(res.data.oneProduct.description);
      })
      .catch((e) => console.error(e));
  }, [productId]);

  //Click to valid your edition
  const editHandler = async (event) => {
    event.preventDefault();
    setEditIsOn(!editIsOn);

    try {
      const formData = new FormData();

      if (imageFile !== '') {
        formData.append("image", imageFile);
      }
      formData.append("name", name);
      formData.append("brand", brand);
      formData.append("category", category);
      formData.append("price", price);
      formData.append("countInStock", countInStock);
      formData.append("description", description);

      const res = await myApi.patch(`/products/${productId}`, formData);
      navigate(`/store`)
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <>
      <div className="ProductEditForm">
        <div className="container">
          <div className="title">
            <h2>商品の編集</h2>
            <h5>【管理者画面】</h5>
          </div>
          <form onSubmit={editHandler} action="">
            <div className="form-box">
              <div>
                <label htmlFor="edit-name">名前</label>
                <div>
                  <input
                    name="name"
                    value={name}
                    id="name"
                    onChange={(event) => setName(event.target.value)}
                  ></input>
                </div>

                <label htmlFor="edit-brand">ブランド</label>
                <div>
                  <input
                    name="brand"
                    value={brand}
                    id="brand"
                    onChange={(event) => setBrand(event.target.value)}
                  />
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
                <label htmlFor="edit-price">価格（税込）</label>
                <div>
                  <input
                    name="price"
                    value={price.toLocaleString()}
                    id="price"
                    onChange={(event) => setPrice(event.target.value)}
                  />
                </div>
                <label htmlFor="edit-countInstock">
                  在庫数
                </label>
                <div>
                  <input
                    name="countInStock"
                    value={countInStock}
                    id="countInStock"
                    onChange={(event) =>
                      setCountInStock(event.target.value)
                    }
                  />
                </div>
              </div>

              <div>
                <label htmlFor="edit-image">商品画像</label>
                <div>
                  <input type='file' name='image' onChange={(e) => setImageFile(e.target.files[0])} />
                </div>
                <label htmlFor="edit-description">商品説明</label>
                <div>
                  <textarea
                    name="description"
                    value={description}
                    id="description"
                    cols="30"
                    rows="10"
                    onChange={(event) =>
                      setDescription(event.target.value)
                    }
                  />
                </div>
              </div>
            </div>
            <div className="edit-btns">
              <button>編集する</button>
            </div>
          </form>
        </div>
      </div>
    </>
  )
};

export default ProductEditForm