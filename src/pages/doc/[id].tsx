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
  const [readmeContent, setReadmeContent] = useState('')
  const [showHashtag, setShowHashtag] = useState(false)
  const headingRef = useRef<HTMLDivElement>(null) // Refere-se ao elemento que deve ficar no topo
  const router = useRouter()
  const { id } = router.query

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        if (id) {
          const response = await fetch(`/markdown/${id}.md`)
          if (!response.ok) {
            // Arquivo não encontrado, redirecionar para página 404
            router.push('/404')
            return
          }
          const text = await response.text()
          setReadmeContent(text)
        }
      } catch (error) {
        console.error('Error fetching article:', error)
      }
    }

    fetchArticle()
  }, [id, router])

  useEffect(() => {
    if (id) {
      const fetchData = async () => {
        const tutorialData = await fetchTutorialData(id as string)
        setTutorialData(tutorialData)
      }

      fetchData()
    }
  }, [id])

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
          headingRef={headingRef}
        />
      </Flex>
    </Layout>
  )
}

export default TutorialPage
