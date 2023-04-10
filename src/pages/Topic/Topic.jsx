import React, { useState, useEffect, useContext } from "react";
import TopicCard from "../../components/TopicCard/TopicCard";
import { Link } from "react-router-dom";
import myApi from "../../service/service";
import "./Topic.css";
import { AuthContext } from "../../context/AuthContext";
import { FaFacebook, FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";
import Spinner from '../../components/Spinner/Spinner'
import Breadcrumb from "../../components/Breadcrumb/Breadcrumb";
import PagenateTopicList from "../../components/Pagenate/PagenateTopicList";

const Topic = () => {
  const [topics, setTopics] = useState(null);
  const [createIsOn, setCreateIsOn] = useState(false);
  const isAdmin = true;
  const { user, currentTopics } = useContext(AuthContext);

  const [currentPage, setCurrentPage] = useState(1);
  const topicsPerPage = 8;

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

  const items = [
    { label: "HOME", link: "/" },
    { label: "お知らせ", link: "/topic", active: true },
  ];

  const paginate = (pageNumber, topics) => {
    const startIndex = (pageNumber - 1) * topicsPerPage;
    const endIndex = startIndex + topicsPerPage;
    return topics.slice(startIndex, endIndex);
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const renderedTopics = paginate(currentPage, topics);

  return (
    <>
      <div>
        <Breadcrumb items={items} />
      </div>
      <div className="Topic">
        <div className="container">
          <div className="title">
            <div className="title-container">
              <ul>
                <li><h2>歓楽宝斎
                  からのお知らせ</h2></li>
                <li>{user && user.isAdmin && <Link to={'/admin/topics/create'} className='btn-topic-create'>新規作成</Link>}</li>
              </ul>
              <ul className="sns-icons">
                <li><FaTwitter /></li>
                <li><FaYoutube /></li>
                <li><FaInstagram /></li>
                <li><FaFacebook /></li>
              </ul>
            </div>
          </div>
          <div className="topicCard">
            {renderedTopics.map((topic) => {
              return <TopicCard key={topic._id} topic={topic} />;
            })}
          </div>
          <PagenateTopicList
            topics={topics}
            currentPage={currentPage}
            itemsPerPage={topicsPerPage}
            onPageChange={handlePageChange}
          />
        </div>
      </div>
    </>
  )
}

export default Topic