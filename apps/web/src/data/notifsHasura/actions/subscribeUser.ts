import { CHAIN_ID } from 'src/typings'

export const subscribeUser = async (
  userId: string,
  eventId: string,
  chainId: CHAIN_ID,
  eventType: string
) => {
  // validate data
  // create event Id
  // check if event exists
  // if yes, skip
  // if no, batch addUser call
  // check if user exists
  // if yes, skip
  // if no, batch addEvent call
  // chack if user is subscribed to event
  // if yes, return error('a'ready subscribed')
  // if no, batch addEventUser call
}
