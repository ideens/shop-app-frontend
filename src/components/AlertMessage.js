import React from 'react'
import { Alert } from 'react-bootstrap'

const AlertMessage = ({ heading, variant, children }) => {
  return (
    <div>
      <Alert variant={variant} className="py-2">
        <Alert.Heading className="mb-1" style={{ fontSize: '20px' }}>
          {heading}
        </Alert.Heading>
        {children}
      </Alert>
    </div>
  )
}

export default AlertMessage
