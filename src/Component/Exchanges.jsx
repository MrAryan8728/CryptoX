import React, { useState } from 'react'
import axios from 'axios'
import { useEffect } from 'react'
import {server} from '../index'
import Loader from './Loader'
import ErrorComponent from './ErrorComponent'
import { Container, HStack, Heading, VStack, Image, Text} from '@chakra-ui/react'

const Exchanges = () => {
const [exchanges,setexchanges] = useState([])
const [loading,setloading] = useState(true)
const [error,seterror] = useState(false)
  useEffect(() => {
    const fetchChanges = async() =>{
      try{
      const {data} = await axios.get(`${server}/exchanges`)
      setexchanges(data);
      setloading(false);
      }catch(error){
        setloading(false);
        seterror(true);
      }
    }
    fetchChanges();
  }, [])
  
  if(error) return <ErrorComponent/>
  return (
    <Container maxWidth={'container.xl'}>
    {loading ? (<Loader/>
    ) :(
      <>
      <HStack  wrap={"wrap"} justifyContent={"space-evenly"}>
      {
        exchanges.map((i)=>(
          <ExchangeCard 
          key={i.id}
          name={i.name} 
          img={i.image}
          rank={i.trust_score_rank}
          url={i.url} />
        ))
      }
      </HStack>
    </>)}
    </Container>
  )
}

const ExchangeCard = ({name,img,rank,url})=>(
  <a href={url} target={'blank'}>
    <VStack w={"52"} shadow={"lg"} p={"8"} borderRadius={"lg"} 
    transition={"all 0.3s"} m={"4"} 
    css={{
      "&:hover":{
        transform:"scale(1.2)"
      }
    }}>
      <Image 
        src={img}
        w={"10"}
        h={"10"}
        objectFit = {"contain"}
        alt = {"Exchange"}/>
      <Heading size={"md"} noOfLines={1}>{rank}</Heading>
      <Text noOfLines={1}>{name}</Text>
    </VStack>
  </a>
)

export default Exchanges