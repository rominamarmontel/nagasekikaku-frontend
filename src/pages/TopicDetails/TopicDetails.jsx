import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import './TopicDetails.css'
import myApi from '../../service/service'
import Spinner from '../../components/Spinner/Spinner'
import TopicDetailedCard from '../../components/TopicDetailedCard/TopicDetailedCard';
import Breadcrumb from '../../components/Breadcrumb/Breadcrumb'


const TopicDetails = () => {
  const [topic, setTopic] = useState(null)
  const params = useParams()
  const items = [
    { label: "Home", link: "/" },
    { label: "お知らせ", link: "/topic" },
    { label: "お知らせの詳細", active: true },
  ];

  useEffect(() => {
    const url = `topics/${params.id}`
    myApi.get(url)
      .then((res) => setTopic(res.data))
      .catch((error) => console.error(error))
  }, [params.id])

  if (!topic) {
    return <Spinner />
  }
  return (
    <>
      <div>
        <Breadcrumb items={items} />
      </div>
      <TopicDetailedCard key={topic._id} topic={topic} />
    </>
  )
}

export default TopicDetails