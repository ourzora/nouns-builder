import { Manager as ManagerContract } from '../../generated/Manager/Manager'
import { MIRROR_TOKEN_INTERFACE_ID } from './constants'
import { Address } from '@graphprotocol/graph-ts'

export enum TokenType {
  Default = 0,
  Mirror = 1,
}

export const getTokenType = (manager: ManagerContract, token: Address): TokenType => {
  if (manager.supportsInterface(token, MIRROR_TOKEN_INTERFACE_ID)) return TokenType.Mirror

  return TokenType.Default
}
