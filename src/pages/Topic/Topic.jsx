import React, { useState, useEffect, useContext } from "react";
import TopicCard from "../../components/TopicCard/TopicCard";
import { Link } from "react-router-dom";
import myApi from "../../service/service";
import "./Topic.css";
import { AuthContext } from "../../context/AuthContext";
import { FaFacebook, FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";
import Spinner from '../../components/Spinner/Spinner'

const Topic = () => {
  const [topics, setTopics] = useState(null)
  const [createIsOn, setCreateIsOn] = useState(false);
  const isAdmin = true
  const { user } = useContext(AuthContext)

  useEffect(() => {
    const url = `/topics`;
    myApi
      .get(url)
      .then((res) => setTopics(res.data))
      .catch((error) => console.error(error));
  }, []);

  if (!topics) {
    return <Spinner />
  }
  const handleInputChange = (event) => {
    setCreateIsOn(!createIsOn)
  };

  return (
    <>
      <div className="Topic">
        <div className="container">
          <div className="title">
            <div>
              <h2>お知らせ</h2>
              <h5>Information from KANRAKU</h5>
            </div>
            <div>
              {user && user.isAdmin && <Link to={'/admin/topics/create'} className='btn-topic-create'>新規作成</Link>}
            </div>
            <p><FaTwitter /><FaYoutube /><FaFacebook /><FaInstagram /></p>
          </div>
          <div className="topicCard">
            {topics.map((topic) => {
              return <TopicCard key={topic._id} topic={topic} />;
            })}
          </div>
        </div>
      </div>
    </>
  )
}

export default Topic