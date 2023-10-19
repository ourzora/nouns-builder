import { gql } from 'graphql-request'

export const addUserMutation = gql`
  mutation AddUser($userAddress: string) {
    insert_testnet_users_one(object: { id: $userAddress }) {
      id
    }
  }
`
export const addEventMutation = gql`
  mutation AddEvent($eventId: string, $dao: string, $event_type: string) {
    insert_testnet_events_one(
      object: { id: $eventId, dao: $dao, event_type: $event_type }
    ) {
      id
      dao
      event_type
    }
  }
`
export const addEventUserMutation = gql`
  mutation AddEventUser($eventId: string, $userAddress: string) {
    insert_testnet_event_user_one({object: {event: $eventId, user: $userAddress}}) {
      event
      user
    }
  }
`
