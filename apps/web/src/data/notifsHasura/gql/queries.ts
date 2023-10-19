import { gql } from 'graphql-request'

export const eventUsers = gql`
  query GetUser($id: String!) {
    testnet_events_by_pk(id: $id) {
      id
      users {
        user
      }
    }
  }
`
export const userEvents = gql`
  query GetUser($id: String!) {
    testnet_users_by_pk(id: $id) {
      events {
        event
      }
    }
  }
`
