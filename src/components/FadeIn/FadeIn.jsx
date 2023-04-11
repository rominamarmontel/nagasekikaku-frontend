import React, { useState, useEffect } from 'react'
import { useSpring, animated } from 'react-spring'

const FadeIn = () => {
  const [toggle, setToggle] = useState(false)
  const styles = useSpring({ opacity: toggle ? 1 : 0 })

  const handleToggle = () => {
    setToggle(_toggle => !_toggle)
  }

  useEffect(() => {
    handleToggle()
  }, [])

  return (
    <animated.div style={styles}>
      <p></p>
    </animated.div>
  )
}
export default FadeIn