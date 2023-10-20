import { gql } from 'graphql-request'

export const queryEvent = gql`
  query GetUser($id: String!) {
    testnet_event_by_pk(id: $id) {
      id
      dao
      event_type
    }
  }
`

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

export const queryUser = gql`
  query GetUser($id: String!) {
    testnet_users_by_pk(id: $id) {
      id
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
