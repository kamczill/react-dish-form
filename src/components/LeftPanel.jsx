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
          color='#ffffff'
        >
          Send a dish
        </Typography>
        <Typography 
          fontWeight='300' 
          align='center' 
          fontFamily='Inter'
          color='#ffffff'
        >
          Recruitment task
        </Typography>
      </Box>
      <Box>
        <img src={Coffee} alt='Drinking Coffee' width='100%'/>
      </Box>
    </Box>
  )
}

export default LeftPanel