import { Box, Image, Text } from '@chakra-ui/react'
import React from 'react'
import image from '../assets/image.jpg'
import {motion} from 'framer-motion'

const Home = () => {
  return (
    <Box bgColor={"blackAlpha.900"}
     w={'full'}
      h={"85ch"}
      filter={"grayscale(1)"}>
      <motion.div 
      style={{
        height:"80vh",
      }}
      animate={{
        translateY:"20px",
      }}
      transition={{
        duration:2,
        repeat:Infinity,
        repeatType:"reverse"
      }}>
      <Image w={'full'} h={'full'} objectFit={'center'} src={image}/>
      </motion.div>
      <Text fontSize={'6xl'} 
      textAlign={'center'} 
      fontWeight={"bold"}
      mt={"20"}>X-Crypto</Text>
    </Box>
  )
}

export default Home