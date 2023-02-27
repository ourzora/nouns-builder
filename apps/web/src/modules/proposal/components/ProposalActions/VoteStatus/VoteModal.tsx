import { Atoms, Box, Button, Flex, Stack, Text, theme } from '@zoralabs/zord'
import { ContractTransaction } from 'ethers'
import { Field, Formik, Form as FormikForm } from 'formik'
import React, { Fragment } from 'react'
import { useGovernorContract } from 'src/hooks'
import { BytesType } from 'src/typings'
import { useSWRConfig } from 'swr'

import { getProposal } from 'src/data/graphql/requests/proposalQuery'

import SWR_KEYS from 'src/constants/swrKeys'

import { Icon } from 'src/components/Icon'
import { IconType } from 'src/components/Icon/icons'
import AnimatedModal from 'src/components/Modal/AnimatedModal'
import { SuccessModalContent } from 'src/components/Modal/SuccessModalContent'

import {
  proposalFormTitle,
  voteModalFieldset,
  voteModalOption,
  voteModalOptionText,
  voteModalRadioInput,
  voteModalReason,
} from 'src/styles/Proposals.css'

enum Choice {
  AGAINST = '0',
  FOR = '1',
  ABSTAIN = '2',
}

interface FormValues {
  choice: Choice | undefined
  reason: string
}

const VoteModal: React.FC<{
  title: string
  proposalId: string
  votesAvailable: number
  showVoteModal: boolean
  setShowVoteModal: (show: boolean) => void
}> = ({ title, proposalId, votesAvailable, showVoteModal, setShowVoteModal }) => {
  const { mutate } = useSWRConfig()
  const { castVote, castVoteWithReason } = useGovernorContract()
  const [isCastVoteSuccess, setIsCastVoteSuccess] = React.useState<boolean>(false)

  const initialValues: FormValues = {
    choice: undefined,
    reason: '',
  }

  const handleSubmit = React.useCallback(
    async (values: FormValues) => {
      const params = {
        proposalId,
        support: Number(values.choice),
        reason: values.reason,
      }

      let vote: Promise<ContractTransaction | undefined>
      if (params.reason.length > 0) {
        vote = castVoteWithReason(
          params.proposalId as BytesType,
          params.support,
          params.reason
        )
      } else {
        vote = castVote(params.proposalId as BytesType, params.support)
      }

      const tx = await vote
      await tx?.wait()

      await mutate([SWR_KEYS.PROPOSAL, proposalId], getProposal(proposalId))

      setIsCastVoteSuccess(true)
    },
    [proposalId, castVoteWithReason, castVote, setIsCastVoteSuccess, mutate]
  )

  const voteOptions = [
    {
      text: `Cast ${votesAvailable} ${votesAvailable > 1 ? 'votes' : 'vote'} for`,
      value: Choice.FOR,
      icon: { id: 'check', fill: 'positive', activeBackground: '#1A8967' },
    },
    {
      text: `Cast ${votesAvailable} ${votesAvailable > 1 ? 'votes' : 'vote'} against`,
      value: Choice.AGAINST,
      icon: { id: 'cross', fill: 'negative', activeBackground: '#CD2D2D' },
    },
    {
      text: 'Abstain from voting',
      value: Choice.ABSTAIN,
      icon: { id: 'dash', fill: 'neutral', activeBackground: '#C4C4C4' },
    },
  ]

  return (
    <Fragment>
      {/* Vote Modal */}
      <AnimatedModal
        open={showVoteModal}
        close={() => setShowVoteModal(false)}
        size={isCastVoteSuccess ? 'small' : 'medium'}
      >
        {isCastVoteSuccess ? (
          <SuccessModalContent
            success={true}
            title={'Vote Submitted'}
            subtitle={`You’ve successfully voted on this proposal`}
          />
        ) : (
          <Box>
            <Box>
              <Text variant="heading-md" className={proposalFormTitle}>
                {votesAvailable === 0 ? 'Submit Vote' : 'Submit Votes'}
              </Text>
              <Text variant="paragraph-sm" color="tertiary">
                Proposal: {title}
              </Text>
            </Box>

            <Formik initialValues={initialValues} onSubmit={handleSubmit}>
              {({ values, isSubmitting, setFieldValue }) => (
                <FormikForm method="post">
                  <fieldset disabled={isSubmitting} className={voteModalFieldset}>
                    <Stack role="group" mt="x6" gap="x3">
                      {voteOptions.map(({ text, value, icon }) => {
                        const active = values.choice === value
                        return (
                          <label key={text}>
                            <Flex
                              backgroundColor="background2"
                              position="relative"
                              w="100%"
                              borderRadius="curved"
                              align="center"
                              justify="center"
                              borderColor="transparent"
                              p="x4"
                              h="x16"
                              className={voteModalOption}
                              data-is-active-negative={
                                value === Choice.AGAINST && values.choice === value
                              }
                              data-is-active-positive={
                                value === Choice.FOR && values.choice === value
                              }
                              data-is-active-neutral={
                                value === Choice.ABSTAIN && values.choice === value
                              }
                            >
                              <Field
                                type="radio"
                                name="choice"
                                value={value}
                                className={voteModalRadioInput}
                                position="absolute"
                                top={0}
                                left={0}
                              />
                              <Text
                                className={voteModalOptionText}
                                variant="paragraph-md"
                              >
                                {text}
                              </Text>
                              <Box position="absolute" top="x4" right="x4">
                                <Icon
                                  id={icon.id as IconType}
                                  borderRadius="round"
                                  p={'x1'}
                                  style={{
                                    backgroundColor: active
                                      ? icon.activeBackground
                                      : theme.colors.background1,
                                  }}
                                  fill={
                                    active ? 'onAccent' : (icon.fill as Atoms['color'])
                                  }
                                />
                              </Box>
                            </Flex>
                          </label>
                        )
                      })}
                    </Stack>

                    <Box mt="x5">
                      <Text variant="paragraph-md" className={voteModalOptionText}>
                        Reason
                      </Text>

                      <Box
                        as="textarea"
                        name="reason"
                        borderRadius="curved"
                        p="x4"
                        mt="x2"
                        backgroundColor="background2"
                        height="x32"
                        width="100%"
                        value={values.reason}
                        className={voteModalReason}
                        onChange={(e: React.FormEvent<HTMLTextAreaElement>) =>
                          setFieldValue('reason', e.currentTarget.value)
                        }
                      />

                      <Text color="tertiary" mt="x2" variant="paragraph-md">
                        Optional
                      </Text>
                    </Box>

                    <Button
                      loading={isSubmitting}
                      type="submit"
                      w="100%"
                      size="lg"
                      mt="x8"
                      borderRadius="curved"
                    >
                      Submit vote
                    </Button>
                  </fieldset>
                </FormikForm>
              )}
            </Formik>
          </Box>
        )}
      </AnimatedModal>
    </Fragment>
  )
}

export default VoteModal
