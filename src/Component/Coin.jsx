import React, { useState } from 'react'
import axios from 'axios'
import { useEffect } from 'react'
import {server} from '../index'
import Loader from './Loader'
import ErrorComponent from './ErrorComponent'
import {Button, Container,HStack, Radio, RadioGroup} from '@chakra-ui/react'
import CoinCard from './CoinCard'

const Coin = () => {
const [coins,setcoins] = useState([])
const [loading,setloading] = useState(true)
const [error,seterror] = useState(false)
const [page,setpage] = useState(1)
const [currency,setcurrency] = useState("inr")

const currencySymbol = 
currency==="inr"?"₹":currency==="eur"?"€":"$"

const changePage = (page)=>{
  setpage(page);
  setloading(true);
}

const btns = new Array(132).fill(1);

  useEffect(() => {
    const fetchCoins = async() =>{
      try{
      const {data} = await axios.get(`${server}/coins/markets?vs_currency=${currency}&page=${page}`)
      setcoins(data);
      setloading(false);
      }catch(error){
        setloading(false);
        seterror(true);
      }
    }
    fetchCoins();
  }, [currency,page])
  
  if(error) return <ErrorComponent/>
  return (
    <Container maxWidth={'container.xl'}>
    {loading ? (<Loader/>
    ) :(
      <>
      <RadioGroup value={currency} onChange={setcurrency} p={"8"}>
        <HStack spacing={"4"}>
          <Radio value={"inr"}>INR(₹)</Radio>
          <Radio value={"usd"}>USD($)</Radio>
          <Radio value={"eur"}>EUR(€)</Radio>
        </HStack>
      </RadioGroup>
      <HStack wrap={"wrap"} justifyContent={"space-evenly"}>
      {
        coins.map((i)=>(
          <CoinCard 
          id={i.id}
          key={i.id}
          name={i.name} 
          price={i.current_price}
          img={i.image}
          symbol={i.symbol}
          url={i.url}
          currencySymbol = {currencySymbol} />
        ))
      }
      </HStack>
      <HStack w={"full"} overflowX={"auto"} p={"8"}>
        {
          btns.map((item,index)=>(
          <Button
          key={index}
          bgColor={"blackAlpha.900"} 
          color={"white"} 
          onClick={()=>{changePage(2)}}>{index+1}
          </Button>
          ))
        }
      </HStack>
    </>)}
    </Container>
  )
}



export default Coin