import { AppProps } from 'next/app'
import { ChakraProvider, useColorMode } from '@chakra-ui/react'
import 'react-toastify/dist/ReactToastify.css'
import theme from '@/theme/theme'

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <ChakraProvider theme={theme}>
      <Component {...pageProps} />
    </ChakraProvider>
  )
}

export default App
