import Playground from '../Artwork/PreviewModal/Playground'
import { Box, Button, Flex, Stack, atoms } from '@zoralabs/zord'
import { isObject } from 'lodash'
import React, { BaseSyntheticEvent } from 'react'
import AnimatedModal from 'src/components/Modal/AnimatedModal'
import { useFormStore } from 'src/stores/useFormStore'
import {
  infoSectionLabelStyle,
  infoSectionValueStyle,
  infoSectionValueVariants,
  infoSectionVariants,
} from 'src/styles/deploy.css'
import { camelToTitle, flatten } from 'src/utils/helpers'
import { getFetchableUrl } from 'ipfs-service'

const ReactHtmlParser = require('react-html-parser').default

interface InfoSectionProps {
  _key: string
  value: any
  sub?: boolean
}
const InfoSection: React.FC<InfoSectionProps> = ({ _key, value, sub }) => {
  const { ipfsUpload } = useFormStore()
  /*  handle subsection */
  const subSection = (obj: object) => (
    <Flex>
      {Object.entries(obj).map(([key, value], index) => (
        <>
          <InfoSection _key={key} value={value} key={index} sub={true} />
        </>
      ))}
    </Flex>
  )

  /* modify value */
  const handleCustom = (key: string, value: any, sub: boolean | undefined) => {
    if (sub) {
      return value
    }

    switch (key) {
      case 'auctionDuration':
        return {
          duration: `${value.days} ${value.days < 1 ? 'day' : 'days'}, ${value.hours} ${
            value.hours < 1 ? 'hour' : 'hours'
          } & ${value.minutes} ${value.minutes < 1 ? 'minute' : 'minutes'}`,
        }
      case 'auctionTimeBuffer':
        return {
          duration: `${value.minutes} ${value.minutes < 1 ? 'minute' : 'minutes'} & ${
            value.seconds
          } ${value.seconds < 1 ? 'second' : 'seconds'}`,
        }
      case 'maxTokenAllocation':
        return `${value} Tokens`
      case 'allocationFrequency':
        return `1 in every ${value} Tokens`
      case 'proposalThreshold':
        return `${value} %`
      case 'auctionReservePrice':
        return `${value} ETH`
      case 'quorumThreshold':
        return `${value} %`
      case 'projectDescription':
        return <Stack>{ReactHtmlParser(value)}</Stack>
      case 'founderAllocation':
        return (
          `${value.founderAddress} will receive ${value.allocation}% of Tokens, ` +
          `until ${value.endDate}, for a total of ${value.maxAllocation} Tokens.`
        )
      case 'daoAvatar':
        return (
          <img
            className={atoms({
              mt: 'x4',
              height: 'x24',
              width: 'x24',
              borderRadius: 'round',
            })}
            src={getFetchableUrl(value)}
            alt=""
          />
        )
      default:
        return value
    }
  }

  /*  construct Images for Preview */
  const images = React.useMemo(() => {
    if (!ipfsUpload) return

    const entries = Object.entries(ipfsUpload)
    const uploads = entries.reduce((acc: any[] = [], cv) => {
      acc.push(cv[1])

      return acc
    }, [])

    const flat = uploads.reduce((acc: any[] = [], cv) => {
      if (!cv || typeof cv !== 'object') return
      const image = flatten(cv)
      acc.push({
        cid: image.cid,
        name: image.name,
        trait: image.trait,
        uri: image.uri,
        url: image.url,
        content: cv.content,
      })

      return acc
    }, [])

    return flat
  }, [ipfsUpload])

  const handleArrayValue = (_key: string, value: any, sub: boolean | undefined) => {
    return (
      <Flex direction={'column'}>
        {value.map((v: {}, i: number) => (
          <Flex my={'x4'} key={i}>
            {handleCustom(_key, v, sub)}
          </Flex>
        ))}
      </Flex>
    )
  }

  const [isOpenModal, setIsOpenModal] = React.useState<boolean>(false)

  return (
    <Flex
      width={'100%'}
      direction={'column'}
      className={infoSectionVariants[sub ? 'sub' : 'default']}
    >
      <>
        {!sub && (
          <Box className={infoSectionLabelStyle} mt={'x4'}>
            {camelToTitle(_key)}
          </Box>
        )}

        {(_key === 'artwork' && (
          <>
            <Button
              onClick={(e: BaseSyntheticEvent) => {
                e.stopPropagation()
                setIsOpenModal(true)
              }}
            >
              Preview Artwork
            </Button>
            {images && (
              <AnimatedModal
                open={isOpenModal}
                close={() => setIsOpenModal(false)}
                size={'large'}
              >
                <Playground images={images} />
              </AnimatedModal>
            )}
          </>
        )) || (
          <Flex
            align={'center'}
            fontSize={18}
            className={infoSectionValueVariants[sub ? 'sub' : 'default']}
          >
            <Flex className={infoSectionValueStyle}>
              {Array.isArray(value) ? (
                <>{handleArrayValue(_key, value, sub)}</>
              ) : isObject(value) ? (
                <Flex>{subSection(handleCustom(_key, value, sub))}</Flex>
              ) : (
                handleCustom(_key, value, sub)
              )}
            </Flex>
          </Flex>
        )}
      </>
    </Flex>
  )
}

export default InfoSection
