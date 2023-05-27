import { Box, Typography } from '@mui/material'
import React from 'react'

import Coffee from '../assets/coffee.png' 

const LeftPanel = () => {
  return (
    <Box 
      width='100%' 
      height='100vh' 
      display='flex' 
      flexDirection='column' 
      justifyContent='space-between' 
      alignItems='center' 
      backgroundColor='#2bb7e2' 
      padding='3rem'
    >
      <Box>
        <Typography 
          variant='h2' 
          fontWeight='600' 
          fontFamily='Inter'
        >
          Dishes
        </Typography>
        <Typography 
          fontWeight='400' 
          align='center' 
          fontFamily='Inter'
        >
          Provide your dish
        </Typography>
      </Box>
      <Box>
        <img src={Coffee} alt='Coffee image' width='100%'/>
      </Box>
    </Box>
  )
}

export default LeftPanel