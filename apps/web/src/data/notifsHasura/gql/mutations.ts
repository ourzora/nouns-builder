import { gql } from 'graphql-request'

export const addUserMutation = gql`
  mutation AddUser($userAddress: String) {
    insert_testnet_users_one(object: { id: $userAddress }) {
      id
    }
  }
`
export const addEventMutation = gql`
  mutation AddEvent($eventId: String, $dao: String, $eventType: String) {
    insert_testnet_events_one(
      object: { id: $eventId, dao: $dao, event_type: $eventType }
    ) {
      id
      dao
      event_type
    }
  }
`
export const addEventUserMutation = gql`
  mutation AddEventUser($eventId: String, $userAddress: String) {
    insert_testnet_event_user_one(object: { event: $eventId, user: $userAddress }) {
      event
      user
    }
  }
`
