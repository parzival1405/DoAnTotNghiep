import { Typography } from '@mui/material'
import React from 'react'

function Label({label,require,className}) {
  return (
    <Typography variant="h6" component="div" className={className}>
          {label}
          <p
            style={
              require
                ? { margin: "0 0 0 2px", color: "red" }
                : { margin: "0 0 0 2px", color: "transparent" }
            }
          >
            *
          </p>
        </Typography>
  )
}

export default Label