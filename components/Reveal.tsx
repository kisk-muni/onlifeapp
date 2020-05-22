/** @jsx jsx */
import { ReactNode } from 'react'
import { jsx } from 'theme-ui'
import { keyframes } from '@emotion/core'

const fade = keyframes({
  from: {
    opacity: 0,
    visibility: 'hidden',
  },
  to: {
    visibility: 'visible',
    opacity: 1,
  }
})

interface RevealProps {
  duration: number
  delay: number
  children: ReactNode
}

const Reveal = ({duration, delay, children, ...props}: RevealProps) => (
  <div sx={{
    visibility: 'hidden',
    opacity: 0,
    animationName: fade.toString(),
    animationTimingFunction: 'linear',
    animationDuration: duration + 'ms',
    animationDelay: (delay || 0) + 'ms',
    animationFillMode: 'forwards'
  }}>
    {children}
  </div>
)

export default Reveal