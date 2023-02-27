import { Box, Flex, Stack } from '@zoralabs/zord'
import Head from 'next/head'
import Image from 'next/legacy/image'
import { useRouter } from 'next/router'
import React from 'react'
import { ContractButton } from 'src/components/ContractButton'

import { whyCreateButton, whyTextStyle } from '../styles/why.css'

const About = () => {
  const router = useRouter()

  return (
    <>
      <Head>
        <title>Nouns Builder | About</title>
      </Head>

      <Stack align={'center'} pt={'x64'}>
        <Flex width={'x64'}>
          <Image src="/noggles.png" alt="Nouns" width={256} height={95} />
        </Flex>
        <Stack
          fontSize={35}
          pt={'x64'}
          className={whyTextStyle}
          textAlign={'center'}
          gap={'x12'}
          width={'100%'}
          px={'x4'}
        >
          <Box>What do these glasses symbolize?</Box>

          <Box>
            To us, they symbolize a powerful new model <br /> for collective creation.
          </Box>

          <Box>
            A shared vision. <br /> And a shared realization of that vision. <br /> The
            seed of one idea. <br />
            And the infinite ideas that can grow from it. <br /> From coming up together.{' '}
            <br /> To taking over together.
          </Box>

          <img src={'/why.svg'} alt="" />

          <Box>
            We built Nouns Builder to proliferate this new model so anyone can build with
            it. <br /> Why? <br /> Because the old ways of doing great things together
            aren’t so great anymore.
          </Box>

          <Box>
            What if… <br /> Instead of relying on corporations, <br /> we created together
            and relied on each other? <br />
            Instead of just creating short-term revenue,
            <br /> we created lasting resonance?
            <br /> Instead of trusting hidden systems, <br /> we did everything openly
            onchain? <br />
            Instead of working together feeling like work, <br /> it could feel like an
            endless jam session?
          </Box>

          <Box>
            We built Nouns Builder <br />
            to make all of this more possible. <br /> For any idea to become an
            invitation. <br /> To create together.
          </Box>

          <Box>Is Nouns Builder made by Nouns or by ZORA? Yes.</Box>

          <Box>
            Nouns Builder exists in the spirit of co-creation. <br /> We are part of Nouns
            and Nouns are a part of us.
          </Box>

          <Box>
            Is Nouns Builder its own Nouns style DAO? Yes. <br /> It’s called Builder DAO.{' '}
            <br />
            Our intention is to open more doors for <br />
            more people to help realize this vision together. <br /> And it was important
            we actually use this tool to do it.
          </Box>

          <Box mb={'x8'}>What will you do with it?</Box>
          <ContractButton
            alignSelf={'center'}
            align={'center'}
            justify={'center'}
            borderRadius={'curved'}
            py={'x4'}
            px={'x6'}
            fontSize={18}
            style={{ background: '#000', color: '#fff' }}
            className={whyCreateButton}
            mb={'x12'}
            handleClick={() => {
              router.push('/create')
            }}
          >
            Create a DAO
          </ContractButton>

          <Box mb="x16">
            <Image
              src={'/builder.png'}
              alt="Builder"
              height={500}
              width={300}
              objectFit="contain"
              layout="responsive"
            />
          </Box>
        </Stack>
      </Stack>
    </>
  )
}

export default About
