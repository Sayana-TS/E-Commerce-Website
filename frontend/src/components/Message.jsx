import React from 'react'
import { Alert } from 'react-bootstrap'

function Message({ variant = 'Info', children }) {
    return (
        <>
            <Alert variant={variant}>{children}</Alert>
        </>
    )
}

export default Message