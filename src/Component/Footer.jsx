import { Avatar, Box, Stack, Text, VStack } from '@chakra-ui/react'
import React from 'react'

const Footer = () => {
  return (
    <Box bgColor={"blackAlpha.900"} color={"whiteAlpha.800"}
    minHeight={"48"} p={"16"} py={["16","8"]} >
        <Stack direction={["column","row"]}
        h={"full"}
        alignItems={"center"}>
        <VStack width={"full"} alignItems={["center","flex-start"]}>
            <Text fontWeight={"bold"}>About Us</Text>
            <Text fontSize={"sm"} letterSpacing={"widest"}
            textAlign={["center","left"]}>Best Crypto trader in India, provided Guidance</Text>
        </VStack>
        <VStack>
            <Avatar boxSize={"28"} mt={["4","0"]}></Avatar>
            <Text>My project</Text>
        </VStack>
        </Stack>
    </Box>
  )
}

export default Footer