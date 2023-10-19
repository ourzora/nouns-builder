import { GraphQLClient } from 'graphql-request'

const HASURA_URL = 'https://causal-tarpon-66.hasura.app/v1/graphql'

export const createHasuraClient = () => {
  console.log(process.env.NEXT_PUBLIC_HASURA_KEY)
  process.env.NEXT_PUBLIC_HASURA_KEY
  return new GraphQLClient(HASURA_URL, {
    headers: {
      'x-hasura-admin-secret': process.env.NEXT_PUBLIC_HASURA_KEY as string,
      'content-type': 'application/json',
    },
  })
}
