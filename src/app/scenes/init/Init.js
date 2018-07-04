import React from 'react'
import styled from 'styled-components'

const Wrapper = styled.div`
  min-height: 500px;
`

const PreeSeed = styled.p`
  word-break: break-all;
`

const Point = styled.div.attrs({
  style: ({ x, y }) => ({ x, y }),
})`
  left: ${props => props.x + 'px'};
  top: ${props => props.y + 'px'};
  background-color: black;
  border-radius: 50%;
  width: 5px;
  height: 5px;
  position: absolute;
  z-index: 999;
`

const Init = ({ onMouseMove, tempSeed, points }) => (
  <Wrapper onMouseMove={onMouseMove}>
    <p>
      Secure random number generation requires that you provide some
      unpredictable data, also called "entropy". Please move your mouse around.
    </p>
    <PreeSeed>{tempSeed}</PreeSeed>
    <small>{points.length}/200</small>
    <div>{points.map(({ x, y }, key) => <Point key={key} x={x} y={y} />)}</div>
  </Wrapper>
)

export default Init
