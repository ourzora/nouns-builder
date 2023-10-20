import { gql } from 'graphql-request'

// test to see if event exists
export const queryEvent = gql`
  query EventExists($id: String!) {
    testnet_events_by_pk(id: $id) {
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
// test to see if user exists
export const queryUser = gql`
  query userExists($id: String!) {
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

// Test to see if user/event join exists
export const queryEventUser = gql`
  query UserEventExists($eventId: String!, $userAddress: String!) {
    testnet_event_user_by_pk(event: $eventId, user: $userAddress) {
      event
      user
    }
  }
`
