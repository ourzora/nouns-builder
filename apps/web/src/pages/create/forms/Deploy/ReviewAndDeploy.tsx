import { Box, Button, Flex, atoms } from '@zoralabs/zord'
import { BigNumber, ethers } from 'ethers'
import React from 'react'
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
import { toSeconds } from 'src/utils/helpers'
import { sanitizeStringForJSON } from 'src/utils/sanitize'
import { Icon } from 'src/components/Icon'
import type { AddressType } from 'src/typings'
import { managerAbi } from 'src/constants/abis'
import { useContractEvent, useContractWrite } from 'wagmi'
import { usePrepareContractWrite } from 'wagmi'
import { WriteContractUnpreparedArgs } from '@wagmi/core'
import { getFetchableUrl } from 'ipfs-service'
import { formatAuctionDuration, formatFounderAllocation } from 'src/modules/create/utils'

import ReviewSection from './ReviewSection'
import ReviewItem from './ReviewItem'
import PreviewArtwork from './PreviewArtwork'
import SuccessfulDeploy from './SuccessfulDeploy'

type FounderParameters = NonNullable<
  WriteContractUnpreparedArgs<typeof managerAbi, 'deploy'>
>['args'][0]

interface ReviewAndDeploy {
  title: string
}

const ReviewAndDeploy: React.FC<ReviewAndDeploy> = ({ title }) => {
  const { signer } = useLayoutStore()
  const [isPendingTransaction, setIsPendingTransaction] = React.useState<boolean>(false)
  const [hasConfirmed, setHasConfirmed] = React.useState<boolean>(false)
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

  useContractEvent({
    address: PUBLIC_MANAGER_ADDRESS!,
    abi: managerAbi,
    eventName: 'DAODeployed',
    listener(token, metadata, auction, treasury, governor) {
      setDeployedDao({
        token,
        metadata,
        auction,
        treasury,
        governor,
      })
      setIsPendingTransaction(false)
      setFulfilledSections(title)
    },
  })

  /* handle section navigation */
  const handlePrev = () => {
    setActiveSection(activeSection - 1)
  }

  const founderParams: FounderParameters = [
    ...founderAllocation,
    ...contributionAllocation,
  ].map(({ founderAddress, allocation, endDate }) => ({
    wallet: founderAddress as AddressType,
    ownershipPct: BigNumber.from(allocation),
    vestExpiry: BigNumber.from(Math.floor(new Date(endDate).getTime() / 1000)),
  }))

  const abiCoder = new ethers.utils.AbiCoder()
  const tokenParamsHex = abiCoder.encode(
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

  const tokenParams = { initStrings: ethers.utils.hexlify(tokenParamsHex) as AddressType }

  const auctionParams = {
    reservePrice: auctionSettings.auctionReservePrice
      ? ethers.utils.parseEther(auctionSettings.auctionReservePrice.toString())
      : ethers.utils.parseEther('0'),
    duration: auctionSettings?.auctionDuration
      ? BigNumber.from(toSeconds(auctionSettings?.auctionDuration))
      : BigNumber.from('86400'),
  }

  const govParams = {
    timelockDelay: BigNumber.from(toSeconds({ days: 2 }).toString()),
    votingDelay: BigNumber.from('86400'),
    votingPeriod: BigNumber.from('345600'),
    proposalThresholdBps: auctionSettings?.proposalThreshold
      ? BigNumber.from(
          Number((Number(auctionSettings?.proposalThreshold) * 100).toFixed(2))
        )
      : BigNumber.from('0'),
    quorumThresholdBps: auctionSettings?.quorumThreshold
      ? BigNumber.from(
          Number((Number(auctionSettings?.quorumThreshold) * 100).toFixed(2))
        )
      : BigNumber.from('0'),
  }

  const vetoer =
    vetoPower === 0
      ? ethers.utils.getAddress(founderParams?.[0].wallet as AddressType)
      : ethers.utils.getAddress(NULL_ADDRESS) // 0 === YES in Radio component

  const { config } = usePrepareContractWrite({
    address: PUBLIC_MANAGER_ADDRESS,
    abi: managerAbi,
    functionName: 'deploy',
    args: [
      founderParams,
      tokenParams,
      auctionParams,
      {
        ...govParams,
        vetoer,
      },
    ],
  })

  const { writeAsync } = useContractWrite(config)

  const handleDeploy = async () => {
    setIsPendingTransaction(true)
    const txn = await writeAsync?.()
    await txn?.wait()
  }

  return (
    <Box>
      {!fulfilledSections.includes(title) ? (
        <Box>
          <Flex direction={'column'}>
            <ReviewSection subHeading="General Info">
              <ReviewItem
                label="Dao Avatar"
                value={
                  <img
                    className={atoms({
                      mt: 'x4',
                      height: 'x24',
                      width: 'x24',
                      borderRadius: 'round',
                    })}
                    src={getFetchableUrl(generalInfo.daoAvatar)}
                    alt=""
                  />
                }
              />
              <ReviewItem label="Dao Name" value={generalInfo.daoName} />
              <ReviewItem label="Dao Symbol" value={generalInfo.daoSymbol} />
              <ReviewItem label="Dao Website" value={generalInfo.daoWebsite} />
            </ReviewSection>

            <ReviewSection subHeading="Auction Settings">
              <ReviewItem
                label="Auction Duration"
                value={formatAuctionDuration(auctionSettings.auctionDuration)}
              />
              <ReviewItem
                label="Auction Reserve Price"
                value={`${auctionSettings.auctionReservePrice} ETH`}
              />
              <ReviewItem
                label="Proposal Threshold"
                value={`${auctionSettings.proposalThreshold} %`}
              />
              <ReviewItem
                label="Quorum Threshold"
                value={`${auctionSettings.quorumThreshold} %`}
              />
            </ReviewSection>

            <ReviewSection subHeading="Allocation">
              {[...founderAllocation, ...contributionAllocation].map((value, i) => (
                <ReviewItem
                  label="Founder Allocation"
                  value={formatFounderAllocation(value)}
                  key={i}
                />
              ))}
            </ReviewSection>

            <ReviewSection subHeading="Set Up Artwork">
              <ReviewItem
                label="Project Description"
                value={setUpArtwork.projectDescription}
              />
              <ReviewItem label="Artwork" value={<PreviewArtwork />} />
              <ReviewItem label="Files Length" value={setUpArtwork.filesLength} />
            </ReviewSection>
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
                onClick={handleDeploy}
                w={'100%'}
                disabled={isUploadingToIPFS || !signer || !hasConfirmed}
                className={
                  deployContractButtonStyle[isPendingTransaction ? 'pending' : 'default']
                }
              >
                {!isPendingTransaction ? `Deploy Contracts (1 of 2)` : `Deploying`}
              </Button>
            </Flex>
          </Flex>
        </Box>
      ) : (
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
