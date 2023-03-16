import { Chip } from '@mui/material'
import React from 'react'

function State({type,color}) {
  return (
    <Chip label={type} color={color}/>
  )
}

export default State