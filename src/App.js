import './App.css';
import Form  from './components/Form'
import LeftPanel from './components/LeftPanel';
import { Box, Typography, useMediaQuery } from '@mui/material';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const isDesktop = useMediaQuery('(min-width:1000px)');

  return (
    <div className="App">
      <Box display='flex' width='100%' fontFamily='Inter'>
        {isDesktop && (
          <Box flex='.3'>
            <LeftPanel />
          </Box>
        )}
        <Box 
          height='100vh' 
          flex={isDesktop ? '.7' : '1'} 
          display='flex' 
          flexDirection='column' 
          alignItems='center' 
          justifyContent='space-between'
        >
          <Box></Box>
          <Form />
          <Box p='1rem' alignSelf='flex-end'>
            <Typography 
              fontFamily='Inter' 
              fontWeight='600' 
              color='#003973' 
              align='right'
            >
              Created by Kamil Chrobak
            </Typography>
          </Box>
        </Box>
      </Box>
      <ToastContainer
        position="bottom-center"
        autoClose={5000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  );
}

export default App;
