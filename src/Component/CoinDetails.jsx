import { Badge, Box, Button, Container, HStack, Image, Radio, RadioGroup, Stat, StatArrow, StatHelpText, StatLabel, StatNumber, Text, VStack } from '@chakra-ui/react'
import React,{useState} from 'react'
import Loader from './Loader'
import axios from 'axios'
import { server } from '../index'
import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import ErrorComponent from './ErrorComponent'
import Chart from './Chart'

const CoinDetails = () => {
  const [coin,setcoin] = useState({})
  const [loading,setloading] = useState(true)
  const [error,seterror] = useState(false)
  const [currency,setcurrency] = useState("inr") 
  const [days,setDays] = useState("24h") ;
  const [chartArray,setchartArray] = useState([]) ;
  const params = useParams();
  const currencySymbol = 
currency==="inr"?"₹":currency==="eur"?"€":"$"

 const btns = ["24h","7d","14d","30d","60d","200d","365d","max"]

 const switchChart = (key)=>{

  switch (key) {
    case "24h":
      setDays("24h")
      setloading(true)
      break;
    case "7d":
      setDays("7d")
      setloading(true)
      break;
    case "14d":
      setDays("14d")
      setloading(true)
    break;
    case "30d":
      setDays("30d")
      setloading(true)
    break;
    case "60d":
      setDays("60d")
      setloading(true)
    break;
    case "200d":
      setDays("200d")
      setloading(true)
    break;
    case "365d":
      setDays("365d")
      setloading(true)
    break;
    case "max":
      setDays("max")
      setloading(true)
      break;
  
    default:
      setDays("24h")
      setloading(true)
      break;
  }
 }

useEffect(() => {
  const fetchCoin = async() =>{
    try{
    const { data } = await axios.get(`${server}/coins/bitcoin`);

    const { data:chartData} = await axios.get(`${server}/coins/bitcoin/market_chart?vs_currency=${currency}&days=${days}`);

    setcoin(data);
    setchartArray(chartData.prices)
    setloading(false);
    }catch(error){
      setloading(false);
      seterror(true);
    }
  }
  fetchCoin();
}, [currency,days])

if(error) return <ErrorComponent/>

  return (
    <Container maxWidth={'container.xl'}>
    {
      loading?<Loader/>:(
        <>
          <Box borderWidth={1} width={"full"}>
            <Chart arr = {chartArray} currency={currencySymbol} days={days}/>
          </Box>

          <HStack p = "4" overflowX={"auto"}>
          {
            btns.map((i)=>(
              <Button key={i} onClick={()=>switchChart(i)}>
              {i}
              </Button>
            ))
          } 
          </HStack>

      <RadioGroup value={currency} onChange={setcurrency} p={"8"}>
        <HStack spacing={"4"}>
          <Radio value={"inr"}>INR(₹)</Radio>
          <Radio value={"usd"}>USD($)</Radio>
          <Radio value={"eur"}>EUR(€)</Radio>
        </HStack>
      </RadioGroup>

      <VStack spacing={'4'} p = "16" alignItems={"flex-start"}>
          <Text fontSize={"small"} alignSelf={"center"} opacity={0.7}>
            Last Updated On
            {Date(coin.market_data.last_updated).split("G")[0]}
          </Text>
          <Image 
            src={coin.image.large} 
            width={"16"} 
            height={"16"} 
            objectFit={"contain"}>
          </Image>
          <Stat>
            <StatLabel>{coin.name}</StatLabel>
            <StatNumber>{currencySymbol}{coin.market_data.current_price[currency]}</StatNumber>
            <StatHelpText>
              <StatArrow type={coin.market_data.price_change_percentage_24h > 0?"increase":"decrease"}/>
              {coin.market_data.price_change_percentage_24h}%
            </StatHelpText>
          </Stat>
          <Badge 
          fontSize={"2xl"}
          bgColor={"blackAlpha.800"}
          color={"white"} >
            {`#${coin.market_cap_rank}`}
          </Badge>
          <CustomBar high={`${currencySymbol}${coin.market_data.high_24h[currency]}`}
          low={`${currencySymbol}${coin.market_data.low_24h[currency]}`}>
          </CustomBar>
          <Box width={'full'}>
            <Item title = {"Max Supply"} value={coin.market_data.max_supply}></Item>
            <Item title = {"Circulating Supply"} value={coin.market_data.circulating_supply}></Item>
            <Item title = {"Market Cap"} value={`${currencySymbol}${coin.market_data.market_cap[currency]}`}></Item>
            <Item title = {"All time Low"} value={coin.market_data.atl[currency]}></Item> 
            <Item title = {"All time High"} value={coin.market_data.ath[currency]}></Item>    
          </Box>
      </VStack>
        </>
      )
    }
    </Container>
  )
}
const CustomBar = ({high,low})=> (
  <VStack width={'full'}>
    <progress value={50} colorscheme={"teal"}/>
    <HStack justifyContent={"space-between"} w={"full"}>
    <Badge children={low} colorscheme={'red'}/>
    <Text fontSize={"sm"}>24H Range</Text>
    <Badge children={high} colorscheme={'green'}/>
    </HStack>
  </VStack>
)
const Item = ({title,value})=>(
  <HStack justifyContent={"space-between"} w={"full"} my={"4"}>
    <Text fontFamily={"Bebas Neue"} letterSpacing={"wider"}>{title}</Text>
    <Text>{value}</Text>
  </HStack>
)
export default CoinDetails