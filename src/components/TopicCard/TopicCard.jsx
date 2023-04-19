import React from 'react';
import "./TopicCard.css"
import ConvertDate from '../Convertdate/Convertdate';
import { Link } from 'react-router-dom'
import { useInView } from 'react-intersection-observer';

const TopicCard = (props) => {
  const topic = props.topic
  const [productImageRef, isInView] = useInView({
    threshold: 0.5, // 画像が50%表示された時に検知する
    triggerOnce: true // 1回だけイベントを発火する
  });
  return (
    <div className="TopicCard">
      <Link to={`/topics/${topic._id}`}>
        <picture ref={productImageRef}>
          <img src={topic.image} alt={topic.title} style={{ opacity: isInView ? 1 : 0, transition: 'opacity 0.5s ease' }} />
        </picture>
        <div className='title-topic'>
          <div>
            <p className='topic-date'><ConvertDate convertDate={topic.updatedAt}></ConvertDate></p>
            <p className='categoryTopicEvent'>{topic.categoryTopic}</p>
          </div>
          <p className='topic-title'>{topic.title}</p>
        </div>
      </Link>
    </div >
  )
}

export default TopicCard