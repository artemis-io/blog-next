import React, { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/router'
import { fetchTutorialData, handleHeadingClick } from '@/functions'
import { Flex, useColorMode } from '@chakra-ui/react'
import { TutorialData } from '@/interface/tutorialData'
import Loading from '@/components/loading'
import Layout from '../layout'
import TutorialContent from '@/components/common/TutorialContent.component'

const TutorialPage = () => {
  const { colorMode, toggleColorMode } = useColorMode()
  const [tutorialData, setTutorialData] = useState<TutorialData | null>(null)
  const [readmeContent, setReadmeContent] = useState<string>('')
  const [showHashtag, setShowHashtag] = useState(false)
  const headingRef = useRef<HTMLDivElement>(null) // Refere-se ao elemento que deve ficar no topo
  const router = useRouter()

  useEffect(() => {
    const fetchReadmeContent = async () => {
      const url = `https://firebasestorage.googleapis.com/v0/b/blog-firebase-98246.appspot.com/o/markdown.md?alt=media&token=9bb48e0b-bbc0-440d-8a24-17e05112c5ce`;
      
      try {
        const response = await fetch(url);
        if (response.ok) {
          const content = await response.text();
          setReadmeContent(content);
        } else {
          console.log('Erro ao buscar o arquivo:', response.status);
        }
      } catch (error) {
        console.log('Erro:', error);
      }
    };
  
    fetchReadmeContent();
  }, []);
  

  useEffect(() => {
    const { id } = router.query

    if (id) {
      const fetchData = async () => {
        const tutorialData = await fetchTutorialData(id as string)
        setTutorialData(tutorialData)
      }

      fetchData()
    }
  }, [router.query])

  const handleHeading = () => {
    handleHeadingClick(headingRef)
  }

  if (!tutorialData) {
    return <Loading />
  }

  return (
    <Layout colorMode={colorMode} toggleColorMode={toggleColorMode}>
      <Flex align="center" py={20} justify={'left'}>
        <TutorialContent
          tutorialData={tutorialData}
          colorMode={colorMode}
          readmeContent={readmeContent}
          handleHeading={handleHeading}
          showHashtag={showHashtag}
          setShowHashtag={setShowHashtag}
          headingRef={headingRef} // Adicione essa linha
        />
      </Flex>
    </Layout>
  )
}

export default TutorialPage
