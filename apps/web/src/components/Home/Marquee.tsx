import { Flex, atoms } from '@zoralabs/zord'
import { motion } from 'framer-motion'
import React from 'react'
import { useLayoutStore } from 'src/stores'

const Marquee = () => {
  const { isMobile } = useLayoutStore()
  return (
    <Flex direction={'column'} align={'center'} mt={{ '@initial': 'x4', '@768': 'x32' }}>
      <Flex gap={'x2'} mb={'x1'}>
        <img
          src={'/home/unlock.svg'}
          alt={'unlock'}
          width={isMobile ? '130px' : 'auto'}
        />
        <motion.div
          className={atoms({ display: 'flex', alignItems: 'center' })}
          animate={{ rotate: 360 }}
          transition={{ ease: 'linear', duration: 2, repeat: Infinity }}
        >
          <img
            src={'/home/purple_galaxy.svg'}
            alt={'purple galaxy icon'}
            width={isMobile ? '34px' : 'auto'}
          />
        </motion.div>
      </Flex>
      <Flex gap={'x2'} mb={'x1'}>
        <img src={'/home/the.svg'} alt={'the'} width={isMobile ? '62px' : 'auto'} />
        <motion.div
          className={atoms({ display: 'flex', alignItems: 'center' })}
          animate={{ rotate: [36, 72, 108, 144, 180, 216, 252, 288, 324, 396] }}
          transition={{
            duration: 20,
            ease: [0.36, 0, 0.66, -0.56],
            repeat: Infinity,
          }}
        >
          <img
            src={'/home/blue_wheel.svg'}
            alt={'blue wheel'}
            width={isMobile ? '36px' : 'auto'}
          />
        </motion.div>
        <img
          src={'/home/possibilities.svg'}
          alt={'possibilities'}
          width={isMobile ? '225px' : 'auto'}
        />
      </Flex>
      <Flex gap={'x2'} mb={'x1'}>
        <img src={'/home/of.svg'} alt={'of'} width={isMobile ? '38px' : 'auto'} />
        <motion.div
          className={atoms({ display: 'flex', alignItems: 'center' })}
          animate={{ rotate: -360 }}
          transition={{
            duration: 6,
            ease: 'linear',
            repeat: Infinity,
          }}
        >
          <img
            src={'/home/green_clover.svg'}
            alt={'green clover icon'}
            width={isMobile ? '36px' : 'auto'}
          />
        </motion.div>
        <img
          src={'/home/collective.svg'}
          alt={'collective'}
          width={isMobile ? '180px' : 'auto'}
        />

        <Flex
          ml={isMobile ? 'x4' : 'x12'}
          position={'relative'}
          align={'center'}
          justify={'center'}
        >
          <motion.div
            className={atoms({
              display: 'flex',
              alignItems: 'center',
              position: 'absolute',
            })}
            style={{
              opacity: 0,
            }}
            animate={{
              opacity: [0, 1, 0],
              filter: ['blur(20px)', 'blur(0px)', 'blur(20px)'],
              rotate: [0, 180, 360],
              scale: [0.6, 1, 0.6],
            }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <img
              src={'/home/purple_star.svg'}
              alt={'purple star icon'}
              width={isMobile ? '36px' : 'auto'}
            />
          </motion.div>
          <motion.div
            className={atoms({
              display: 'flex',
              alignItems: 'center',
              position: 'absolute',
            })}
            style={{
              transform: 'scale(0.6)',
              opacity: 0,
            }}
            animate={{
              opacity: [0, 1, 0],
              filter: ['blur(0px)', 'blur(0px)', 'blur(0px)'],
              rotate: [0, 180, 360],
              scale: [0.6, 1, 0.6],
            }}
            transition={{ duration: 2, repeat: Infinity, delay: 1 }}
          >
            <img
              src={'/home/blue_sun.svg'}
              alt={'blue sun icon'}
              width={isMobile ? '36px' : 'auto'}
            />
          </motion.div>
        </Flex>
      </Flex>
      <Flex gap={'x2'} mb={'x1'}>
        <img
          src={'/home/nouns_glasses.svg'}
          alt={'small nouns glasses logo'}
          width={isMobile ? '62px' : 'auto'}
        />
        <img
          src={'/home/creation.svg'}
          alt={'creation'}
          width={isMobile ? '157px' : 'auto'}
        />
      </Flex>
    </Flex>
  )
}

export default Marquee
