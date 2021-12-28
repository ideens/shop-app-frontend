import React from 'react'
import { Spinner } from 'react-bootstrap'

const LoadSpinner = () => {
  return (
    <div>
      <Spinner
        animation="border"
        role="status"
        style={{
          height: '50px',
          width: '50px',
          margin: 'auto',
          display: 'block',
        }}
      >
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    </div>
  )
}

export default LoadSpinner
