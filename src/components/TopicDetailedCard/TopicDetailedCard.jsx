import React, { useContext, useState, useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import myApi from "../../service/service";
import { AuthContext } from "../../context/AuthContext";
import { BiLeftArrowAlt } from 'react-icons/bi'
import TopicEditForm from "../TopicEditForm/TopicEditForm";
import ConvertDate from "../Convertdate/Convertdate";
import './TopicDetailedCard.css'
import { FaFacebook, FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";

const TopicDetailedCard = () => {
  const [editIsOn, setEditIsOn] = useState(false);
  const [deleteIsOn, setDeleteIsOn] = useState(false);
  const { user } = useContext(AuthContext);
  const [topic, setTopic] = useState({});
  const params = useParams();
  const topicId = params.id;
  const navigate = useNavigate();
  const [title, setTitle] = useState('')
  const [image, setImage] = useState('')
  const [categoryTopic, setCategoryTopic] = useState('')
  const [updateAt, setUpdateAt] = useState('')
  const [description, setDescription] = useState('')

  useEffect(() => {
    const url = `/topics/${topicId}`;
    myApi
      .get(url)
      .then((res) => {
        setTopic(res.data.oneTopic);
        setTitle(res.data.oneTopic.title);
        setCategoryTopic(res.data.oneTopic.categoryTopic)
        setImage(res.data.oneTopic.image);
        setUpdateAt(res.data.oneTopic.updateAt);
        setDescription(res.data.oneTopic.description);
      })
      .catch((error) => console.error(error));
  }, []);

  const editHandler = async (event) => {
    event.preventDefault();
    setEditIsOn(!editIsOn);
  }
  //Click to delete a topic
  const deleteHandler = async (event) => {
    event.preventDefault();
    setDeleteIsOn(!deleteIsOn);
    const url = `/topics/${topicId}/`;
    try {
      await myApi.delete(url);
      setDeleteIsOn(!deleteIsOn);
      navigate("/topic");
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div className="TopicDetailedCard">
      <div className="container">
        <div className="btns-container">
          <p>
            <Link to='/topic' style={{ display: editIsOn ? 'none' : 'block' }}><BiLeftArrowAlt className="leftarrow-icon" />Back</Link>
          </p>
          <div className="btns-box">
            <div>
              {user && user.isAdmin && (
                <button className="btn-block" type="button" onClick={editHandler} style={{ display: editIsOn ? 'block' : 'none' }}>
                  キャンセル
                </button>
              )}
            </div>
            <div>
              {user && user.isAdmin && (
                <button className="btn-block" type="button" onClick={editHandler} style={{ display: editIsOn ? 'none' : 'block' }}>
                  編集する
                </button>
              )}
            </div>
            <div>
              {user && user.isAdmin && (
                <button className="btn-block" type="button" onClick={deleteHandler}>
                  削除する
                </button>
              )}
            </div>
          </div>
        </div>
        {editIsOn ? (
          <TopicEditForm />
        ) : (
          <>
            <div className="topic-details-container">
              <div className="topic-details">
                <div className="topic-details-right">
                  <div className="topic-details-date">
                    <p><ConvertDate convertDate={topic.updatedAt}></ConvertDate></p>
                    <p className="categoryTopic">{topic.categoryTopic}</p>
                  </div>
                  <div className="topic-details-title">
                    <h2 className="h2">{topic.title}</h2>
                    <ul className="sns-icons">
                      <li><FaTwitter /></li>
                      <li><FaYoutube /></li>
                      <li><FaInstagram /></li>
                      <li><FaFacebook /></li>
                    </ul>
                  </div>
                </div>
                <picture>
                  <img src={topic.image} alt={topic.name} />
                </picture>
                <p className='topic-description'>{topic.description}</p>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default TopicDetailedCard