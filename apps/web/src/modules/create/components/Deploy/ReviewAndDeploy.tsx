import InfoSection from './InfoSection'
import ReviewSection from './ReviewSection'
import SuccessfulDeploy from './SuccessfulDeploy'
import { IManager } from 'src/constants/typechain'
import { Box, Button, Flex, atoms } from '@zoralabs/zord'
import { BigNumber, ethers } from 'ethers'
import React, { useEffect } from 'react'
import { defaultBackButtonVariants } from 'src/components/Fields/styles.css'
import { PUBLIC_MANAGER_ADDRESS } from 'src/constants/addresses'
import { NULL_ADDRESS } from 'src/constants/addresses'
import { useFormStore } from 'src/stores/useFormStore'
import { useLayoutStore } from 'src/stores/useLayoutStore'
import {
  deployCheckboxHelperText,
  deployCheckboxStyleVariants,
  deployCheckboxWrapperStyle,
  deployContractButtonStyle,
} from 'src/styles/deploy.css'
import { getEnsAddress } from 'src/utils/ens'
import { isEmpty, toSeconds } from 'src/utils/helpers'
import { sanitizeStringForJSON } from 'src/utils/sanitize'
import { Manager__factory } from 'src/constants/typechain'
import { Icon } from 'src/components/Icon'
import type { allocationProps, AddressType } from 'src/typings'

interface ReviewAndDeploy {
  title: string
}

const ReviewAndDeploy: React.FC<ReviewAndDeploy> = ({ title }) => {
  const {
    founderAllocation,
    contributionAllocation,
    generalInfo,
    auctionSettings,
    setUpArtwork,
    setActiveSection,
    activeSection,
    fulfilledSections,
    deployedDao,
    setDeployedDao,
    isUploadingToIPFS,
    setFulfilledSections,
    vetoPower,
  } = useFormStore()

  const { signer, provider } = useLayoutStore()

  const zounsContractAddress = PUBLIC_MANAGER_ADDRESS!
  const managerContract = React.useMemo(() => {
    if (!signer) return
    try {
      return Manager__factory.connect(zounsContractAddress, signer)
    } catch (err) {
      console.log('err', err)
    }
  }, [signer, zounsContractAddress])

  /*

    Prepare Params for -- deploy()


  */
  const getFounderParams = React.useCallback(
    (
      allocationArray: allocationProps[]
    ): Promise<IManager.FounderParamsStruct[]> | undefined => {
      if (!allocationArray) return

      return allocationArray?.reduce(async (acc: any, cv: any) => {
        const _acc = await acc

        _acc.push({
          wallet: ethers.utils.getAddress(
            await getEnsAddress(cv.founderAddress, provider)
          ),
          ownershipPct: BigNumber.from(cv.allocation),
          vestExpiry: Math.floor(new Date(cv.endDate).getTime() / 1000),
        })

        return _acc
      }, Promise.resolve([]))
    },
    [provider]
  )

  const tokenParams = React.useMemo(() => {
    // name, symbol, description, contract image, renderer base
    const abiCoder = new ethers.utils.AbiCoder()
    const hex = abiCoder.encode(
      ['string', 'string', 'string', 'string', 'string', 'string'],
      [
        sanitizeStringForJSON(generalInfo?.daoName),
        generalInfo?.daoSymbol.replace('$', ''),
        sanitizeStringForJSON(setUpArtwork?.projectDescription),
        generalInfo?.daoAvatar,
        sanitizeStringForJSON(generalInfo?.daoWebsite),
        'https://api.zora.co/renderer/stack-images',
      ]
    )
    return { initStrings: ethers.utils.arrayify(hex) }
  }, [generalInfo, setUpArtwork])

  const auctionParams = React.useMemo(() => {
    if (isEmpty(auctionSettings)) return

    return {
      reservePrice: auctionSettings.auctionReservePrice
        ? ethers.utils.parseEther(auctionSettings.auctionReservePrice.toString())
        : '0',
      duration: auctionSettings?.auctionDuration
        ? BigNumber.from(toSeconds(auctionSettings?.auctionDuration))
        : '86400',
    }
  }, [auctionSettings])

  const govParams = React.useMemo(() => {
    if (isEmpty(auctionSettings)) return

    return {
      timelockDelay: BigNumber.from(toSeconds({ days: 2 }).toString()),
      votingDelay: BigNumber.from('86400'),
      votingPeriod: BigNumber.from('345600'),
      proposalThresholdBps: auctionSettings?.proposalThreshold
        ? BigNumber.from(
            Number((Number(auctionSettings?.proposalThreshold) * 100).toFixed(2))
          )
        : '0',
      quorumThresholdBps: auctionSettings?.quorumThreshold
        ? BigNumber.from(
            Number((Number(auctionSettings?.quorumThreshold) * 100).toFixed(2))
          )
        : '0',
    }
  }, [auctionSettings])

  /*

    Parse Store Data

  */
  const _generalInfo = React.useMemo(() => {
    return Object.entries(generalInfo).map(([key, value], index) => {
      return <InfoSection _key={key} value={value} key={index} />
    })
  }, [])

  const _auctionSettings = React.useMemo(() => {
    return Object.entries(auctionSettings).map(([key, value], index) => {
      return <InfoSection _key={key} value={value} key={index} />
    })
  }, [])

  const _allocationSettings = React.useMemo(() => {
    return Object.entries([...founderAllocation, ...contributionAllocation]).map(
      ([key, value], index) => {
        return <InfoSection _key={key} value={value} key={index} />
      }
    )
  }, [])

  const _setUpArtwork = React.useMemo(() => {
    return Object.entries(setUpArtwork).map(([key, value], index) => {
      return <InfoSection _key={key} value={value} key={index} />
    })
  }, [])

  /*

  Compose Review Sections

*/
  const ReviewSections = [
    {
      subHeading: 'General Info',
      section: _generalInfo.map((element, i) => (
        <Box key={i}>{React.cloneElement(element)}</Box>
      )),
    },
    {
      subHeading: 'Auction Settings',
      section: _auctionSettings.map((element, i) => (
        <Box key={i}>{React.cloneElement(element)}</Box>
      )),
    },
    {
      subHeading: 'Allocation',
      section: _allocationSettings.map((element, i) => (
        <Box key={i}>{React.cloneElement(element)}</Box>
      )),
    },
    {
      subHeading: 'Set Up Artwork',
      section: _setUpArtwork.map((element, i) => (
        <Box key={i}>{React.cloneElement(element)}</Box>
      )),
    },
  ]

  /*

    Deploy

  */

  /*
    check if founders address is gnosis safe  &&   if signer is owner of the safe
  */

  /*

    handle deploy attempt

   */
  const [isPendingTransaction, setIsPendingTransaction] = React.useState<boolean>(false)
  const handleDeploy = React.useCallback(async () => {
    if (!tokenParams || !auctionParams || !govParams || !managerContract) return

    const founderParams = await getFounderParams([
      ...founderAllocation,
      ...contributionAllocation,
    ])
    if (!founderParams) return

    /*

      add vetoer if user has chosen vetoPower

     */
    const _govParams = {
      ...govParams,
      vetoer:
        vetoPower === 0 ? founderParams[0].wallet : ethers.utils.getAddress(NULL_ADDRESS), // 0 === YES in Radio component
    }

    try {
      const { wait } = await managerContract?.deploy(
        founderParams,
        tokenParams,
        auctionParams,
        _govParams
      )

      setIsPendingTransaction(true)
      await wait()
    } catch (err) {
      console.log('err', err)
    }
  }, [
    tokenParams,
    auctionParams,
    govParams,
    managerContract,
    founderAllocation,
    contributionAllocation,
    getFounderParams,
    vetoPower,
  ])

  /*

    Handle Successful Deploy

  */
  const handleSuccessfulDeploy = (
    token: AddressType,
    metadata: AddressType,
    auction: AddressType,
    treasury: AddressType,
    governor: AddressType
  ) => {
    setDeployedDao({
      token,
      metadata,
      auction,
      treasury,
      governor,
    })
    setIsPendingTransaction(false)
    setFulfilledSections(title)
  }

  useEffect(() => {
    if (!managerContract) return

    managerContract.on('DAODeployed', handleSuccessfulDeploy)

    return () => {
      managerContract.off('DAODeployed', handleSuccessfulDeploy)
    }
  }, [managerContract])

  /* handle section navigation */
  const handlePrev = () => {
    setActiveSection(activeSection - 1)
  }

  /* handle confirm review */
  const [hasConfirmed, setHasConfirmed] = React.useState<boolean>(false)

  return (
    <Box>
      {(!fulfilledSections.includes(title) && (
        <>
          <Box>
            <Flex direction={'column'}>
              {ReviewSections.map(({ subHeading, section }) => (
                <ReviewSection
                  subHeading={subHeading}
                  section={section}
                  key={subHeading}
                />
              ))}
            </Flex>
            <Flex direction={'column'} p={'x6'} className={deployCheckboxWrapperStyle}>
              <Flex>
                <Flex align={'center'} justify={'center'} gap={'x4'}>
                  <Flex
                    align={'center'}
                    justify={'center'}
                    className={
                      deployCheckboxStyleVariants[hasConfirmed ? 'confirmed' : 'default']
                    }
                    onClick={() => setHasConfirmed((bool) => !bool)}
                  >
                    {hasConfirmed && <Icon fill="background1" id="check" />}
                  </Flex>
                  <Flex className={deployCheckboxHelperText}>
                    [I have reviewed and acknowledge and agree to the{' '}
                    <a
                      href={'/legal'}
                      target="_blank"
                      className={atoms({ color: 'accent' })}
                      rel="noreferrer"
                    >
                      Nouns Builder Terms of Service
                    </a>
                    ]
                  </Flex>
                </Flex>
              </Flex>
              <Flex mt={'x8'}>
                <Flex
                  justify={'center'}
                  align={'center'}
                  w={'x15'}
                  h={'x15'}
                  minH={'x15'}
                  minW={'x15'}
                  onClick={() => handlePrev()}
                  className={defaultBackButtonVariants['default']}
                >
                  <Icon id="arrowLeft" />
                </Flex>
                <Button
                  onClick={
                    isUploadingToIPFS || !signer || !hasConfirmed
                      ? () => {}
                      : () => handleDeploy()
                  }
                  w={'100%'}
                  disabled={isUploadingToIPFS || !signer || !hasConfirmed}
                  className={
                    deployContractButtonStyle[
                      isPendingTransaction ? 'pending' : 'default'
                    ]
                  }
                >
                  {!isPendingTransaction ? `Deploy Contracts (1 of 2)` : `Deploying`}
                </Button>
              </Flex>
            </Flex>
          </Box>
        </>
      )) || (
        <SuccessfulDeploy
          token={deployedDao?.token}
          metadata={deployedDao?.metadata}
          auction={deployedDao?.auction}
          treasury={deployedDao?.treasury}
          governor={deployedDao?.governor}
          title={title}
        />
      )}
    </Box>
  )
}

export default ReviewAndDeploy
