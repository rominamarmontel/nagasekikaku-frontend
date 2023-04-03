import React from 'react'
import './Content.css'

const Content = () => {
  const items = [
    {
      children: 'ホーム',
      href: '/',
    },
    {
      children: 'オンラインストア',
      href: '/store',
    },
    {
      children: 'お知らせ',
      href: '/topic'
    }
  ];
  return (
    <div className='Content'><small>
    </small>
    </div>
  )
}

export default Content