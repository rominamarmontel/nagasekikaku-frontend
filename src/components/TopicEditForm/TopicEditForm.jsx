import React, { useState, useEffect } from "react"
import { useNavigate, useParams, Link } from "react-router-dom";
import './TopicEditForm.css'
import myApi from '../../service/service'

const TopicEditForm = (props) => {
  const [editIsOn, setEditIsOn] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [imageFile, setImageFile] = useState('');
  const [topic, setTopic] = useState({});
  const [categoryTopic, setCategoryTopic] = useState('選択')
  const navigate = useNavigate();
  const params = useParams();
  const topicId = params.id;

  useEffect(() => {
    const url = `/topics/${topicId}`;
    myApi
      .get(url)
      .then((res) => {
        setTopic(res.data.oneTopic);
        setTitle(res.data.oneTopic.title);
        setCategoryTopic(res.data.oneTopic.categoryTopic)
        setDescription(res.data.oneTopic.description);
      })
      .catch((e) => console.error(e));
  }, [topicId]);

  //Click to valid your edition
  const editHandler = async (event) => {
    event.preventDefault();
    setEditIsOn(!editIsOn);

    try {
      const formData = new FormData();

      if (imageFile !== '') {
        formData.append("image", imageFile);
      }
      formData.append("title", title);
      formData.append("description", description);
      formData.append('categoryTopic', categoryTopic)

      const res = await myApi.patch(`/topics/${topicId}`, formData);
      navigate(`/topic`)
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <>
      <div className="TopicEditForm">
        <div className="container">
          <div className="title">
            <h2>商品の編集</h2>
            <h5>【管理者画面】</h5>
          </div>
          <form onSubmit={editHandler} action="">
            <div className="form-box">
              <div>
                <label htmlFor="edit-title">タイトル</label>
                <div>
                  <input
                    name="title"
                    value={title}
                    id="title"
                    onChange={(event) => setTitle(event.target.value)}
                  ></input>
                </div>
                <div>
                  <label htmlFor="edit-category">カテゴリー</label>
                  <select value={categoryTopic} onChange={(event) => setCategoryTopic(event.target.value)}>
                    <option value="選択">選択</option>
                    <option value="イベント">イベント</option>
                    <option value="商品情報">商品情報</option>
                    <option value="コラム">コラム</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="edit-image">トピック画像</label>
                  <div>
                    <input type='file' name='image' onChange={(e) => setImageFile(e.target.files[0])} />
                  </div>
                  <label htmlFor="edit-description">お知らせ詳細</label>
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
            </div>
          </form>
        </div >
      </div >
    </>
  )
};

export default TopicEditForm