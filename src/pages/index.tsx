import React from 'react'
import { useColorMode } from '@chakra-ui/react'
import Layout from './layout'
import Blog from './content/Blog'

const Index = () => {
  const { colorMode, toggleColorMode } = useColorMode()

  return (
    <Layout colorMode={colorMode} toggleColorMode={toggleColorMode}>
      <Blog />
    </Layout>
  )
}

export default Index
