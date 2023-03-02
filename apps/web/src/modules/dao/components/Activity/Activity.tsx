import { Button, Flex, Text } from '@zoralabs/zord'
import omit from 'lodash/omit'
import { useRouter } from 'next/router'
import React from 'react'
import useSWR from 'swr'
import { useAccount } from 'wagmi'

import { ContractButton } from 'src/components/ContractButton'
import AnimatedModal from 'src/components/Modal/AnimatedModal'
import { SuccessModalContent } from 'src/components/Modal/SuccessModalContent'
import Pagination from 'src/components/Pagination'
import SWR_KEYS from 'src/constants/swrKeys'
import { ProposalsResponse, getProposals } from 'src/data/graphql/requests/proposalsQuery'
import { useVotes } from 'src/hooks'
import { Upgrade, useProposalStore } from 'src/modules/create-proposal'
import { ProposalCard } from 'src/modules/proposal'
import { useLayoutStore } from 'src/stores'
import { selectDelegateBtn, submitProposalBtn } from 'src/styles/Proposals.css'
import { sectionWrapperStyle } from 'src/styles/dao.css'
import { AddressType } from 'src/typings'
import { walletSnippet } from 'src/utils/helpers'

import { useDelegate } from '../../hooks'
import { useDaoStore } from '../../stores'
import { CurrentDelegate } from './CurrentDelegate'
import { DelegateForm } from './DelegateForm'
import { MobileMenu } from './MobileMenu'
import { Treasury } from './Treasury'

export const Activity: React.FC = () => {
  const addresses = useDaoStore((state) => state.addresses)
  const { createProposal } = useProposalStore()
  const { address } = useAccount()
  const { query, isReady, push, pathname } = useRouter()
  const { isMobile } = useLayoutStore()
  const LIMIT = 20

  const { token } = addresses

  const { data, error } = useSWR<ProposalsResponse>(
    isReady ? [SWR_KEYS.PROPOSALS, query.token, query.page] : null,
    (_, token, page) => getProposals([token], LIMIT, Number(page))
  )

  const { isOwner, hasThreshold } = useVotes({
    governorAddress: addresses?.governor,
    signerAddress: address,
    collectionAddress: query?.token as AddressType,
  })

  const [
    { viewCurrentDelegate, viewDelegateForm, viewSuccessfulDelegate, newDelegate },
    { view, edit, update, close },
  ] = useDelegate({
    viewCurrentDelegate: false,
    viewDelegateForm: false,
    viewSuccessfulDelegate: false,
  })

  const handleProposalCreation = () => {
    createProposal({
      title: undefined,
      summary: undefined,
      disabled: false,
      transactions: [],
    })
    push(`/dao/${query.token}/proposal/create`)
  }

  const handlePageBack = React.useCallback(() => {
    // user is on the first page
    if (!query.page)
      return {
        pathname,
        query: {
          ...query,
        },
      }

    // user is at least on the second page
    return Number(query.page) > 2
      ? {
          pathname,
          query: {
            ...query,
            page: Number(query.page) - 1,
          },
        }
      : {
          pathname,
          query: omit(query, ['page']),
        }
  }, [query, pathname])

  const handlePageForward = React.useCallback(() => {
    // there are more results to be fetched
    if (!data?.pageInfo?.hasNextPage)
      return {
        pathname,
        query: {
          page: query.page,
        },
      }

    // user is on the first page
    if (!query.page)
      return {
        pathname,
        query: {
          ...query,
          page: 2,
        },
      }

    // user is at least on the second page
    return {
      pathname,
      query: {
        ...query,
        page: Number(query.page) + 1,
      },
    }
  }, [data?.pageInfo?.hasNextPage, pathname, query])

  if (!data && !error) {
    return null
  }

  return (
    <>
      <Flex direction={'column'} className={sectionWrapperStyle['proposals']} mx={'auto'}>
        <Treasury />

        <Flex width={'100%'} justify={'space-between'} align={'center'}>
          <Text variant="heading-sm" style={{ fontWeight: 800 }}>
            Proposals
          </Text>

          <Flex justify={'center'} align={'center'}>
            {isOwner ? (
              <>
                {!isMobile ? (
                  <ContractButton
                    className={selectDelegateBtn}
                    style={{ backgroundColor: '#FFF', color: '#000' }}
                    handleClick={view}
                  >
                    Delegate
                  </ContractButton>
                ) : (
                  <MobileMenu>
                    <ContractButton
                      className={selectDelegateBtn}
                      style={{ backgroundColor: '#FFF', color: '#000' }}
                      handleClick={view}
                    >
                      Delegate
                    </ContractButton>
                  </MobileMenu>
                )}
              </>
            ) : null}

            {!hasThreshold && !isMobile && (
              <Flex mr={'x4'} color={'tertiary'}>
                You have no votes.
              </Flex>
            )}

            <Button
              className={submitProposalBtn}
              onClick={handleProposalCreation}
              disabled={!isOwner}
              color={'tertiary'}
            >
              Submit {!isMobile ? 'proposal' : null}
            </Button>
          </Flex>
        </Flex>
        {addresses && (
          <Upgrade
            collection={query.token as string}
            hasThreshold={hasThreshold}
            addresses={addresses}
          />
        )}
        <Flex direction={'column'} mt={'x6'}>
          {data?.proposals?.length ? (
            data?.proposals?.map((proposal, index: number) => (
              <ProposalCard
                key={index}
                collection={token}
                proposalId={proposal.proposalId}
                proposalNumber={proposal.proposalNumber}
                title={proposal.title}
                status={proposal.status}
                timeCreated={proposal.timeCreated}
                voteEnd={proposal.voteEnd}
                voteStart={proposal.voteStart}
                expiresAt={proposal.expiresAt}
              />
            ))
          ) : (
            <Flex
              width={'100%'}
              mt={'x4'}
              p={'x4'}
              justify={'center'}
              borderColor={'border'}
              borderStyle={'solid'}
              borderRadius={'curved'}
              borderWidth={'normal'}
            >
              <Text>No proposals yet.</Text>
            </Flex>
          )}

          <Pagination
            onNext={handlePageForward}
            onPrev={handlePageBack}
            isLast={!data?.pageInfo?.hasNextPage}
            isFirst={!query.page}
          />
        </Flex>
      </Flex>

      <AnimatedModal open={viewCurrentDelegate} size={'auto'} close={close}>
        <CurrentDelegate toggleIsEditing={edit} />
      </AnimatedModal>

      <AnimatedModal open={viewDelegateForm} size={'auto'} close={close}>
        <DelegateForm handleBack={view} handleUpdate={update} />
      </AnimatedModal>

      <AnimatedModal open={viewSuccessfulDelegate} close={close}>
        <SuccessModalContent
          success
          title="Delegate updated"
          subtitle="Your votes have been successfully delegated to"
          content={walletSnippet(newDelegate)}
        />
      </AnimatedModal>
    </>
  )
}
