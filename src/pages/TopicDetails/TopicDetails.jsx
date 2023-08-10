import React, { useState, useEffect, useContext } from 'react'
import { useParams } from 'react-router-dom'
import myApi from '../../service/service'
import Spinner from '../../components/Spinner/Spinner'
import TopicDetailedCard from '../../components/TopicDetailedCard/TopicDetailedCard';
import Breadcrumb from '../../components/Breadcrumb/Breadcrumb'
import PagenateTopicDetails from '../../components/Pagenate/PagenateTopicDetails'
import { AuthContext } from "../../context/AuthContext";


const TopicDetails = () => {
  const [topic, setTopic] = useState(null)
  const params = useParams()
  const { user } = useContext(AuthContext);

  const [currentPage, setCurrentPage] = useState(1);
  const topicsPerPage = 1;


  useEffect(() => {
    const url = `topics/${params.id}`
    myApi.get(url)
      .then((res) => setTopic(res.data))
      .catch((error) => console.error(error))
  }, [params.id])

  if (!topic) {
    return <Spinner />
  }

  const items = [
    { label: "Home", link: "/" },
    { label: "お知らせ", link: "/topic" },
    { label: "お知らせの詳細", active: true },
  ];

  const paginate = (pageNumber, topics) => {
    if (!Array.isArray(topics)) {
      topics = Object.values(topics);
    }
    const startIndex = (pageNumber - 1) * topicsPerPage;
    const endIndex = startIndex + topicsPerPage;
    return topics.slice(startIndex, endIndex);
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const renderedTopics = paginate(currentPage, topic);
  return (
    <>
      <div>
        <Breadcrumb items={items} />
      </div>
      {topic && <TopicDetailedCard key={topic._id} topic={renderedTopics[0]} />}
      {/* <PagenateTopicDetails
        currentTopics={topic}
        currentPage={currentPage}
        itemsPerPage={topicsPerPage}
        onPageChange={(pageNumber) => {
          setCurrentPage(pageNumber);
          const updatedRenderedTopics = paginate(pageNumber, topic);
          setTopic(updatedRenderedTopics);
        }}
      /> */}
    </>
  )
}

export default TopicDetails