import { GraphQLClient } from 'graphql-request'
import * as Dom from 'graphql-request/dist/types.dom'
import gql from 'graphql-tag'

export type Maybe<T> = T | null
export type InputMaybe<T> = Maybe<T>
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] }
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>
}
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>
}
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string
  String: string
  Boolean: boolean
  Int: number
  Float: number
}

export type AffectedRowsOutput = {
  __typename?: 'AffectedRowsOutput'
  count: Scalars['Int']
}

export type AggregateAttestation = {
  __typename?: 'AggregateAttestation'
  _avg?: Maybe<AttestationAvgAggregate>
  _count?: Maybe<AttestationCountAggregate>
  _max?: Maybe<AttestationMaxAggregate>
  _min?: Maybe<AttestationMinAggregate>
  _sum?: Maybe<AttestationSumAggregate>
}

export type AggregateEnsName = {
  __typename?: 'AggregateEnsName'
  _avg?: Maybe<EnsNameAvgAggregate>
  _count?: Maybe<EnsNameCountAggregate>
  _max?: Maybe<EnsNameMaxAggregate>
  _min?: Maybe<EnsNameMinAggregate>
  _sum?: Maybe<EnsNameSumAggregate>
}

export type AggregateOffchainRevocation = {
  __typename?: 'AggregateOffchainRevocation'
  _avg?: Maybe<OffchainRevocationAvgAggregate>
  _count?: Maybe<OffchainRevocationCountAggregate>
  _max?: Maybe<OffchainRevocationMaxAggregate>
  _min?: Maybe<OffchainRevocationMinAggregate>
  _sum?: Maybe<OffchainRevocationSumAggregate>
}

export type AggregateSchema = {
  __typename?: 'AggregateSchema'
  _avg?: Maybe<SchemaAvgAggregate>
  _count?: Maybe<SchemaCountAggregate>
  _max?: Maybe<SchemaMaxAggregate>
  _min?: Maybe<SchemaMinAggregate>
  _sum?: Maybe<SchemaSumAggregate>
}

export type AggregateSchemaName = {
  __typename?: 'AggregateSchemaName'
  _avg?: Maybe<SchemaNameAvgAggregate>
  _count?: Maybe<SchemaNameCountAggregate>
  _max?: Maybe<SchemaNameMaxAggregate>
  _min?: Maybe<SchemaNameMinAggregate>
  _sum?: Maybe<SchemaNameSumAggregate>
}

export type AggregateServiceStat = {
  __typename?: 'AggregateServiceStat'
  _count?: Maybe<ServiceStatCountAggregate>
  _max?: Maybe<ServiceStatMaxAggregate>
  _min?: Maybe<ServiceStatMinAggregate>
}

export type AggregateTimestamp = {
  __typename?: 'AggregateTimestamp'
  _avg?: Maybe<TimestampAvgAggregate>
  _count?: Maybe<TimestampCountAggregate>
  _max?: Maybe<TimestampMaxAggregate>
  _min?: Maybe<TimestampMinAggregate>
  _sum?: Maybe<TimestampSumAggregate>
}

export type Attestation = {
  __typename?: 'Attestation'
  attester: Scalars['String']
  data: Scalars['String']
  decodedDataJson: Scalars['String']
  expirationTime: Scalars['Int']
  id: Scalars['String']
  ipfsHash: Scalars['String']
  isOffchain: Scalars['Boolean']
  recipient: Scalars['String']
  refUID: Scalars['String']
  revocable: Scalars['Boolean']
  revocationTime: Scalars['Int']
  revoked: Scalars['Boolean']
  schema: Schema
  schemaId: Scalars['String']
  time: Scalars['Int']
  timeCreated: Scalars['Int']
  txid: Scalars['String']
}

export type AttestationAvgAggregate = {
  __typename?: 'AttestationAvgAggregate'
  expirationTime?: Maybe<Scalars['Float']>
  revocationTime?: Maybe<Scalars['Float']>
  time?: Maybe<Scalars['Float']>
  timeCreated?: Maybe<Scalars['Float']>
}

export type AttestationAvgOrderByAggregateInput = {
  expirationTime?: InputMaybe<SortOrder>
  revocationTime?: InputMaybe<SortOrder>
  time?: InputMaybe<SortOrder>
  timeCreated?: InputMaybe<SortOrder>
}

export type AttestationCountAggregate = {
  __typename?: 'AttestationCountAggregate'
  _all: Scalars['Int']
  attester: Scalars['Int']
  data: Scalars['Int']
  decodedDataJson: Scalars['Int']
  expirationTime: Scalars['Int']
  id: Scalars['Int']
  ipfsHash: Scalars['Int']
  isOffchain: Scalars['Int']
  recipient: Scalars['Int']
  refUID: Scalars['Int']
  revocable: Scalars['Int']
  revocationTime: Scalars['Int']
  revoked: Scalars['Int']
  schemaId: Scalars['Int']
  time: Scalars['Int']
  timeCreated: Scalars['Int']
  txid: Scalars['Int']
}

export type AttestationCountOrderByAggregateInput = {
  attester?: InputMaybe<SortOrder>
  data?: InputMaybe<SortOrder>
  decodedDataJson?: InputMaybe<SortOrder>
  expirationTime?: InputMaybe<SortOrder>
  id?: InputMaybe<SortOrder>
  ipfsHash?: InputMaybe<SortOrder>
  isOffchain?: InputMaybe<SortOrder>
  recipient?: InputMaybe<SortOrder>
  refUID?: InputMaybe<SortOrder>
  revocable?: InputMaybe<SortOrder>
  revocationTime?: InputMaybe<SortOrder>
  revoked?: InputMaybe<SortOrder>
  schemaId?: InputMaybe<SortOrder>
  time?: InputMaybe<SortOrder>
  timeCreated?: InputMaybe<SortOrder>
  txid?: InputMaybe<SortOrder>
}

export type AttestationCreateInput = {
  attester: Scalars['String']
  data: Scalars['String']
  decodedDataJson?: InputMaybe<Scalars['String']>
  expirationTime: Scalars['Int']
  id: Scalars['String']
  ipfsHash: Scalars['String']
  isOffchain: Scalars['Boolean']
  recipient: Scalars['String']
  refUID: Scalars['String']
  revocable: Scalars['Boolean']
  revocationTime: Scalars['Int']
  revoked: Scalars['Boolean']
  schema: SchemaCreateNestedOneWithoutAttestationsInput
  time: Scalars['Int']
  timeCreated: Scalars['Int']
  txid: Scalars['String']
}

export type AttestationCreateManyInput = {
  attester: Scalars['String']
  data: Scalars['String']
  decodedDataJson?: InputMaybe<Scalars['String']>
  expirationTime: Scalars['Int']
  id: Scalars['String']
  ipfsHash: Scalars['String']
  isOffchain: Scalars['Boolean']
  recipient: Scalars['String']
  refUID: Scalars['String']
  revocable: Scalars['Boolean']
  revocationTime: Scalars['Int']
  revoked: Scalars['Boolean']
  schemaId: Scalars['String']
  time: Scalars['Int']
  timeCreated: Scalars['Int']
  txid: Scalars['String']
}

export type AttestationCreateManySchemaInput = {
  attester: Scalars['String']
  data: Scalars['String']
  decodedDataJson?: InputMaybe<Scalars['String']>
  expirationTime: Scalars['Int']
  id: Scalars['String']
  ipfsHash: Scalars['String']
  isOffchain: Scalars['Boolean']
  recipient: Scalars['String']
  refUID: Scalars['String']
  revocable: Scalars['Boolean']
  revocationTime: Scalars['Int']
  revoked: Scalars['Boolean']
  time: Scalars['Int']
  timeCreated: Scalars['Int']
  txid: Scalars['String']
}

export type AttestationCreateManySchemaInputEnvelope = {
  data: Array<AttestationCreateManySchemaInput>
  skipDuplicates?: InputMaybe<Scalars['Boolean']>
}

export type AttestationCreateNestedManyWithoutSchemaInput = {
  connect?: InputMaybe<Array<AttestationWhereUniqueInput>>
  connectOrCreate?: InputMaybe<Array<AttestationCreateOrConnectWithoutSchemaInput>>
  create?: InputMaybe<Array<AttestationCreateWithoutSchemaInput>>
  createMany?: InputMaybe<AttestationCreateManySchemaInputEnvelope>
}

export type AttestationCreateOrConnectWithoutSchemaInput = {
  create: AttestationCreateWithoutSchemaInput
  where: AttestationWhereUniqueInput
}

export type AttestationCreateWithoutSchemaInput = {
  attester: Scalars['String']
  data: Scalars['String']
  decodedDataJson?: InputMaybe<Scalars['String']>
  expirationTime: Scalars['Int']
  id: Scalars['String']
  ipfsHash: Scalars['String']
  isOffchain: Scalars['Boolean']
  recipient: Scalars['String']
  refUID: Scalars['String']
  revocable: Scalars['Boolean']
  revocationTime: Scalars['Int']
  revoked: Scalars['Boolean']
  time: Scalars['Int']
  timeCreated: Scalars['Int']
  txid: Scalars['String']
}

export type AttestationGroupBy = {
  __typename?: 'AttestationGroupBy'
  _avg?: Maybe<AttestationAvgAggregate>
  _count?: Maybe<AttestationCountAggregate>
  _max?: Maybe<AttestationMaxAggregate>
  _min?: Maybe<AttestationMinAggregate>
  _sum?: Maybe<AttestationSumAggregate>
  attester: Scalars['String']
  data: Scalars['String']
  decodedDataJson: Scalars['String']
  expirationTime: Scalars['Int']
  id: Scalars['String']
  ipfsHash: Scalars['String']
  isOffchain: Scalars['Boolean']
  recipient: Scalars['String']
  refUID: Scalars['String']
  revocable: Scalars['Boolean']
  revocationTime: Scalars['Int']
  revoked: Scalars['Boolean']
  schemaId: Scalars['String']
  time: Scalars['Int']
  timeCreated: Scalars['Int']
  txid: Scalars['String']
}

export type AttestationListRelationFilter = {
  every?: InputMaybe<AttestationWhereInput>
  none?: InputMaybe<AttestationWhereInput>
  some?: InputMaybe<AttestationWhereInput>
}

export type AttestationMaxAggregate = {
  __typename?: 'AttestationMaxAggregate'
  attester?: Maybe<Scalars['String']>
  data?: Maybe<Scalars['String']>
  decodedDataJson?: Maybe<Scalars['String']>
  expirationTime?: Maybe<Scalars['Int']>
  id?: Maybe<Scalars['String']>
  ipfsHash?: Maybe<Scalars['String']>
  isOffchain?: Maybe<Scalars['Boolean']>
  recipient?: Maybe<Scalars['String']>
  refUID?: Maybe<Scalars['String']>
  revocable?: Maybe<Scalars['Boolean']>
  revocationTime?: Maybe<Scalars['Int']>
  revoked?: Maybe<Scalars['Boolean']>
  schemaId?: Maybe<Scalars['String']>
  time?: Maybe<Scalars['Int']>
  timeCreated?: Maybe<Scalars['Int']>
  txid?: Maybe<Scalars['String']>
}

export type AttestationMaxOrderByAggregateInput = {
  attester?: InputMaybe<SortOrder>
  data?: InputMaybe<SortOrder>
  decodedDataJson?: InputMaybe<SortOrder>
  expirationTime?: InputMaybe<SortOrder>
  id?: InputMaybe<SortOrder>
  ipfsHash?: InputMaybe<SortOrder>
  isOffchain?: InputMaybe<SortOrder>
  recipient?: InputMaybe<SortOrder>
  refUID?: InputMaybe<SortOrder>
  revocable?: InputMaybe<SortOrder>
  revocationTime?: InputMaybe<SortOrder>
  revoked?: InputMaybe<SortOrder>
  schemaId?: InputMaybe<SortOrder>
  time?: InputMaybe<SortOrder>
  timeCreated?: InputMaybe<SortOrder>
  txid?: InputMaybe<SortOrder>
}

export type AttestationMinAggregate = {
  __typename?: 'AttestationMinAggregate'
  attester?: Maybe<Scalars['String']>
  data?: Maybe<Scalars['String']>
  decodedDataJson?: Maybe<Scalars['String']>
  expirationTime?: Maybe<Scalars['Int']>
  id?: Maybe<Scalars['String']>
  ipfsHash?: Maybe<Scalars['String']>
  isOffchain?: Maybe<Scalars['Boolean']>
  recipient?: Maybe<Scalars['String']>
  refUID?: Maybe<Scalars['String']>
  revocable?: Maybe<Scalars['Boolean']>
  revocationTime?: Maybe<Scalars['Int']>
  revoked?: Maybe<Scalars['Boolean']>
  schemaId?: Maybe<Scalars['String']>
  time?: Maybe<Scalars['Int']>
  timeCreated?: Maybe<Scalars['Int']>
  txid?: Maybe<Scalars['String']>
}

export type AttestationMinOrderByAggregateInput = {
  attester?: InputMaybe<SortOrder>
  data?: InputMaybe<SortOrder>
  decodedDataJson?: InputMaybe<SortOrder>
  expirationTime?: InputMaybe<SortOrder>
  id?: InputMaybe<SortOrder>
  ipfsHash?: InputMaybe<SortOrder>
  isOffchain?: InputMaybe<SortOrder>
  recipient?: InputMaybe<SortOrder>
  refUID?: InputMaybe<SortOrder>
  revocable?: InputMaybe<SortOrder>
  revocationTime?: InputMaybe<SortOrder>
  revoked?: InputMaybe<SortOrder>
  schemaId?: InputMaybe<SortOrder>
  time?: InputMaybe<SortOrder>
  timeCreated?: InputMaybe<SortOrder>
  txid?: InputMaybe<SortOrder>
}

export type AttestationOrderByRelationAggregateInput = {
  _count?: InputMaybe<SortOrder>
}

export type AttestationOrderByWithAggregationInput = {
  _avg?: InputMaybe<AttestationAvgOrderByAggregateInput>
  _count?: InputMaybe<AttestationCountOrderByAggregateInput>
  _max?: InputMaybe<AttestationMaxOrderByAggregateInput>
  _min?: InputMaybe<AttestationMinOrderByAggregateInput>
  _sum?: InputMaybe<AttestationSumOrderByAggregateInput>
  attester?: InputMaybe<SortOrder>
  data?: InputMaybe<SortOrder>
  decodedDataJson?: InputMaybe<SortOrder>
  expirationTime?: InputMaybe<SortOrder>
  id?: InputMaybe<SortOrder>
  ipfsHash?: InputMaybe<SortOrder>
  isOffchain?: InputMaybe<SortOrder>
  recipient?: InputMaybe<SortOrder>
  refUID?: InputMaybe<SortOrder>
  revocable?: InputMaybe<SortOrder>
  revocationTime?: InputMaybe<SortOrder>
  revoked?: InputMaybe<SortOrder>
  schemaId?: InputMaybe<SortOrder>
  time?: InputMaybe<SortOrder>
  timeCreated?: InputMaybe<SortOrder>
  txid?: InputMaybe<SortOrder>
}

export type AttestationOrderByWithRelationInput = {
  attester?: InputMaybe<SortOrder>
  data?: InputMaybe<SortOrder>
  decodedDataJson?: InputMaybe<SortOrder>
  expirationTime?: InputMaybe<SortOrder>
  id?: InputMaybe<SortOrder>
  ipfsHash?: InputMaybe<SortOrder>
  isOffchain?: InputMaybe<SortOrder>
  recipient?: InputMaybe<SortOrder>
  refUID?: InputMaybe<SortOrder>
  revocable?: InputMaybe<SortOrder>
  revocationTime?: InputMaybe<SortOrder>
  revoked?: InputMaybe<SortOrder>
  schema?: InputMaybe<SchemaOrderByWithRelationInput>
  schemaId?: InputMaybe<SortOrder>
  time?: InputMaybe<SortOrder>
  timeCreated?: InputMaybe<SortOrder>
  txid?: InputMaybe<SortOrder>
}

export enum AttestationScalarFieldEnum {
  Attester = 'attester',
  Data = 'data',
  DecodedDataJson = 'decodedDataJson',
  ExpirationTime = 'expirationTime',
  Id = 'id',
  IpfsHash = 'ipfsHash',
  IsOffchain = 'isOffchain',
  Recipient = 'recipient',
  RefUid = 'refUID',
  Revocable = 'revocable',
  RevocationTime = 'revocationTime',
  Revoked = 'revoked',
  SchemaId = 'schemaId',
  Time = 'time',
  TimeCreated = 'timeCreated',
  Txid = 'txid',
}

export type AttestationScalarWhereInput = {
  AND?: InputMaybe<Array<AttestationScalarWhereInput>>
  NOT?: InputMaybe<Array<AttestationScalarWhereInput>>
  OR?: InputMaybe<Array<AttestationScalarWhereInput>>
  attester?: InputMaybe<StringFilter>
  data?: InputMaybe<StringFilter>
  decodedDataJson?: InputMaybe<StringFilter>
  expirationTime?: InputMaybe<IntFilter>
  id?: InputMaybe<StringFilter>
  ipfsHash?: InputMaybe<StringFilter>
  isOffchain?: InputMaybe<BoolFilter>
  recipient?: InputMaybe<StringFilter>
  refUID?: InputMaybe<StringFilter>
  revocable?: InputMaybe<BoolFilter>
  revocationTime?: InputMaybe<IntFilter>
  revoked?: InputMaybe<BoolFilter>
  schemaId?: InputMaybe<StringFilter>
  time?: InputMaybe<IntFilter>
  timeCreated?: InputMaybe<IntFilter>
  txid?: InputMaybe<StringFilter>
}

export type AttestationScalarWhereWithAggregatesInput = {
  AND?: InputMaybe<Array<AttestationScalarWhereWithAggregatesInput>>
  NOT?: InputMaybe<Array<AttestationScalarWhereWithAggregatesInput>>
  OR?: InputMaybe<Array<AttestationScalarWhereWithAggregatesInput>>
  attester?: InputMaybe<StringWithAggregatesFilter>
  data?: InputMaybe<StringWithAggregatesFilter>
  decodedDataJson?: InputMaybe<StringWithAggregatesFilter>
  expirationTime?: InputMaybe<IntWithAggregatesFilter>
  id?: InputMaybe<StringWithAggregatesFilter>
  ipfsHash?: InputMaybe<StringWithAggregatesFilter>
  isOffchain?: InputMaybe<BoolWithAggregatesFilter>
  recipient?: InputMaybe<StringWithAggregatesFilter>
  refUID?: InputMaybe<StringWithAggregatesFilter>
  revocable?: InputMaybe<BoolWithAggregatesFilter>
  revocationTime?: InputMaybe<IntWithAggregatesFilter>
  revoked?: InputMaybe<BoolWithAggregatesFilter>
  schemaId?: InputMaybe<StringWithAggregatesFilter>
  time?: InputMaybe<IntWithAggregatesFilter>
  timeCreated?: InputMaybe<IntWithAggregatesFilter>
  txid?: InputMaybe<StringWithAggregatesFilter>
}

export type AttestationSumAggregate = {
  __typename?: 'AttestationSumAggregate'
  expirationTime?: Maybe<Scalars['Int']>
  revocationTime?: Maybe<Scalars['Int']>
  time?: Maybe<Scalars['Int']>
  timeCreated?: Maybe<Scalars['Int']>
}

export type AttestationSumOrderByAggregateInput = {
  expirationTime?: InputMaybe<SortOrder>
  revocationTime?: InputMaybe<SortOrder>
  time?: InputMaybe<SortOrder>
  timeCreated?: InputMaybe<SortOrder>
}

export type AttestationUpdateInput = {
  attester?: InputMaybe<StringFieldUpdateOperationsInput>
  data?: InputMaybe<StringFieldUpdateOperationsInput>
  decodedDataJson?: InputMaybe<StringFieldUpdateOperationsInput>
  expirationTime?: InputMaybe<IntFieldUpdateOperationsInput>
  id?: InputMaybe<StringFieldUpdateOperationsInput>
  ipfsHash?: InputMaybe<StringFieldUpdateOperationsInput>
  isOffchain?: InputMaybe<BoolFieldUpdateOperationsInput>
  recipient?: InputMaybe<StringFieldUpdateOperationsInput>
  refUID?: InputMaybe<StringFieldUpdateOperationsInput>
  revocable?: InputMaybe<BoolFieldUpdateOperationsInput>
  revocationTime?: InputMaybe<IntFieldUpdateOperationsInput>
  revoked?: InputMaybe<BoolFieldUpdateOperationsInput>
  schema?: InputMaybe<SchemaUpdateOneRequiredWithoutAttestationsNestedInput>
  time?: InputMaybe<IntFieldUpdateOperationsInput>
  timeCreated?: InputMaybe<IntFieldUpdateOperationsInput>
  txid?: InputMaybe<StringFieldUpdateOperationsInput>
}

export type AttestationUpdateManyMutationInput = {
  attester?: InputMaybe<StringFieldUpdateOperationsInput>
  data?: InputMaybe<StringFieldUpdateOperationsInput>
  decodedDataJson?: InputMaybe<StringFieldUpdateOperationsInput>
  expirationTime?: InputMaybe<IntFieldUpdateOperationsInput>
  id?: InputMaybe<StringFieldUpdateOperationsInput>
  ipfsHash?: InputMaybe<StringFieldUpdateOperationsInput>
  isOffchain?: InputMaybe<BoolFieldUpdateOperationsInput>
  recipient?: InputMaybe<StringFieldUpdateOperationsInput>
  refUID?: InputMaybe<StringFieldUpdateOperationsInput>
  revocable?: InputMaybe<BoolFieldUpdateOperationsInput>
  revocationTime?: InputMaybe<IntFieldUpdateOperationsInput>
  revoked?: InputMaybe<BoolFieldUpdateOperationsInput>
  time?: InputMaybe<IntFieldUpdateOperationsInput>
  timeCreated?: InputMaybe<IntFieldUpdateOperationsInput>
  txid?: InputMaybe<StringFieldUpdateOperationsInput>
}

export type AttestationUpdateManyWithWhereWithoutSchemaInput = {
  data: AttestationUpdateManyMutationInput
  where: AttestationScalarWhereInput
}

export type AttestationUpdateManyWithoutSchemaNestedInput = {
  connect?: InputMaybe<Array<AttestationWhereUniqueInput>>
  connectOrCreate?: InputMaybe<Array<AttestationCreateOrConnectWithoutSchemaInput>>
  create?: InputMaybe<Array<AttestationCreateWithoutSchemaInput>>
  createMany?: InputMaybe<AttestationCreateManySchemaInputEnvelope>
  delete?: InputMaybe<Array<AttestationWhereUniqueInput>>
  deleteMany?: InputMaybe<Array<AttestationScalarWhereInput>>
  disconnect?: InputMaybe<Array<AttestationWhereUniqueInput>>
  set?: InputMaybe<Array<AttestationWhereUniqueInput>>
  update?: InputMaybe<Array<AttestationUpdateWithWhereUniqueWithoutSchemaInput>>
  updateMany?: InputMaybe<Array<AttestationUpdateManyWithWhereWithoutSchemaInput>>
  upsert?: InputMaybe<Array<AttestationUpsertWithWhereUniqueWithoutSchemaInput>>
}

export type AttestationUpdateWithWhereUniqueWithoutSchemaInput = {
  data: AttestationUpdateWithoutSchemaInput
  where: AttestationWhereUniqueInput
}

export type AttestationUpdateWithoutSchemaInput = {
  attester?: InputMaybe<StringFieldUpdateOperationsInput>
  data?: InputMaybe<StringFieldUpdateOperationsInput>
  decodedDataJson?: InputMaybe<StringFieldUpdateOperationsInput>
  expirationTime?: InputMaybe<IntFieldUpdateOperationsInput>
  id?: InputMaybe<StringFieldUpdateOperationsInput>
  ipfsHash?: InputMaybe<StringFieldUpdateOperationsInput>
  isOffchain?: InputMaybe<BoolFieldUpdateOperationsInput>
  recipient?: InputMaybe<StringFieldUpdateOperationsInput>
  refUID?: InputMaybe<StringFieldUpdateOperationsInput>
  revocable?: InputMaybe<BoolFieldUpdateOperationsInput>
  revocationTime?: InputMaybe<IntFieldUpdateOperationsInput>
  revoked?: InputMaybe<BoolFieldUpdateOperationsInput>
  time?: InputMaybe<IntFieldUpdateOperationsInput>
  timeCreated?: InputMaybe<IntFieldUpdateOperationsInput>
  txid?: InputMaybe<StringFieldUpdateOperationsInput>
}

export type AttestationUpsertWithWhereUniqueWithoutSchemaInput = {
  create: AttestationCreateWithoutSchemaInput
  update: AttestationUpdateWithoutSchemaInput
  where: AttestationWhereUniqueInput
}

export type AttestationWhereInput = {
  AND?: InputMaybe<Array<AttestationWhereInput>>
  NOT?: InputMaybe<Array<AttestationWhereInput>>
  OR?: InputMaybe<Array<AttestationWhereInput>>
  attester?: InputMaybe<StringFilter>
  data?: InputMaybe<StringFilter>
  decodedDataJson?: InputMaybe<StringFilter>
  expirationTime?: InputMaybe<IntFilter>
  id?: InputMaybe<StringFilter>
  ipfsHash?: InputMaybe<StringFilter>
  isOffchain?: InputMaybe<BoolFilter>
  recipient?: InputMaybe<StringFilter>
  refUID?: InputMaybe<StringFilter>
  revocable?: InputMaybe<BoolFilter>
  revocationTime?: InputMaybe<IntFilter>
  revoked?: InputMaybe<BoolFilter>
  schema?: InputMaybe<SchemaRelationFilter>
  schemaId?: InputMaybe<StringFilter>
  time?: InputMaybe<IntFilter>
  timeCreated?: InputMaybe<IntFilter>
  txid?: InputMaybe<StringFilter>
}

export type AttestationWhereUniqueInput = {
  id?: InputMaybe<Scalars['String']>
}

export type BoolFieldUpdateOperationsInput = {
  set?: InputMaybe<Scalars['Boolean']>
}

export type BoolFilter = {
  equals?: InputMaybe<Scalars['Boolean']>
  not?: InputMaybe<NestedBoolFilter>
}

export type BoolWithAggregatesFilter = {
  _count?: InputMaybe<NestedIntFilter>
  _max?: InputMaybe<NestedBoolFilter>
  _min?: InputMaybe<NestedBoolFilter>
  equals?: InputMaybe<Scalars['Boolean']>
  not?: InputMaybe<NestedBoolWithAggregatesFilter>
}

export type EnsName = {
  __typename?: 'EnsName'
  id: Scalars['String']
  name: Scalars['String']
  timestamp: Scalars['Int']
}

export type EnsNameAvgAggregate = {
  __typename?: 'EnsNameAvgAggregate'
  timestamp?: Maybe<Scalars['Float']>
}

export type EnsNameAvgOrderByAggregateInput = {
  timestamp?: InputMaybe<SortOrder>
}

export type EnsNameCountAggregate = {
  __typename?: 'EnsNameCountAggregate'
  _all: Scalars['Int']
  id: Scalars['Int']
  name: Scalars['Int']
  timestamp: Scalars['Int']
}

export type EnsNameCountOrderByAggregateInput = {
  id?: InputMaybe<SortOrder>
  name?: InputMaybe<SortOrder>
  timestamp?: InputMaybe<SortOrder>
}

export type EnsNameCreateInput = {
  id: Scalars['String']
  name: Scalars['String']
  timestamp: Scalars['Int']
}

export type EnsNameCreateManyInput = {
  id: Scalars['String']
  name: Scalars['String']
  timestamp: Scalars['Int']
}

export type EnsNameGroupBy = {
  __typename?: 'EnsNameGroupBy'
  _avg?: Maybe<EnsNameAvgAggregate>
  _count?: Maybe<EnsNameCountAggregate>
  _max?: Maybe<EnsNameMaxAggregate>
  _min?: Maybe<EnsNameMinAggregate>
  _sum?: Maybe<EnsNameSumAggregate>
  id: Scalars['String']
  name: Scalars['String']
  timestamp: Scalars['Int']
}

export type EnsNameMaxAggregate = {
  __typename?: 'EnsNameMaxAggregate'
  id?: Maybe<Scalars['String']>
  name?: Maybe<Scalars['String']>
  timestamp?: Maybe<Scalars['Int']>
}

export type EnsNameMaxOrderByAggregateInput = {
  id?: InputMaybe<SortOrder>
  name?: InputMaybe<SortOrder>
  timestamp?: InputMaybe<SortOrder>
}

export type EnsNameMinAggregate = {
  __typename?: 'EnsNameMinAggregate'
  id?: Maybe<Scalars['String']>
  name?: Maybe<Scalars['String']>
  timestamp?: Maybe<Scalars['Int']>
}

export type EnsNameMinOrderByAggregateInput = {
  id?: InputMaybe<SortOrder>
  name?: InputMaybe<SortOrder>
  timestamp?: InputMaybe<SortOrder>
}

export type EnsNameOrderByWithAggregationInput = {
  _avg?: InputMaybe<EnsNameAvgOrderByAggregateInput>
  _count?: InputMaybe<EnsNameCountOrderByAggregateInput>
  _max?: InputMaybe<EnsNameMaxOrderByAggregateInput>
  _min?: InputMaybe<EnsNameMinOrderByAggregateInput>
  _sum?: InputMaybe<EnsNameSumOrderByAggregateInput>
  id?: InputMaybe<SortOrder>
  name?: InputMaybe<SortOrder>
  timestamp?: InputMaybe<SortOrder>
}

export type EnsNameOrderByWithRelationInput = {
  id?: InputMaybe<SortOrder>
  name?: InputMaybe<SortOrder>
  timestamp?: InputMaybe<SortOrder>
}

export enum EnsNameScalarFieldEnum {
  Id = 'id',
  Name = 'name',
  Timestamp = 'timestamp',
}

export type EnsNameScalarWhereWithAggregatesInput = {
  AND?: InputMaybe<Array<EnsNameScalarWhereWithAggregatesInput>>
  NOT?: InputMaybe<Array<EnsNameScalarWhereWithAggregatesInput>>
  OR?: InputMaybe<Array<EnsNameScalarWhereWithAggregatesInput>>
  id?: InputMaybe<StringWithAggregatesFilter>
  name?: InputMaybe<StringWithAggregatesFilter>
  timestamp?: InputMaybe<IntWithAggregatesFilter>
}

export type EnsNameSumAggregate = {
  __typename?: 'EnsNameSumAggregate'
  timestamp?: Maybe<Scalars['Int']>
}

export type EnsNameSumOrderByAggregateInput = {
  timestamp?: InputMaybe<SortOrder>
}

export type EnsNameUpdateInput = {
  id?: InputMaybe<StringFieldUpdateOperationsInput>
  name?: InputMaybe<StringFieldUpdateOperationsInput>
  timestamp?: InputMaybe<IntFieldUpdateOperationsInput>
}

export type EnsNameUpdateManyMutationInput = {
  id?: InputMaybe<StringFieldUpdateOperationsInput>
  name?: InputMaybe<StringFieldUpdateOperationsInput>
  timestamp?: InputMaybe<IntFieldUpdateOperationsInput>
}

export type EnsNameWhereInput = {
  AND?: InputMaybe<Array<EnsNameWhereInput>>
  NOT?: InputMaybe<Array<EnsNameWhereInput>>
  OR?: InputMaybe<Array<EnsNameWhereInput>>
  id?: InputMaybe<StringFilter>
  name?: InputMaybe<StringFilter>
  timestamp?: InputMaybe<IntFilter>
}

export type EnsNameWhereUniqueInput = {
  id?: InputMaybe<Scalars['String']>
}

export type IntFieldUpdateOperationsInput = {
  decrement?: InputMaybe<Scalars['Int']>
  divide?: InputMaybe<Scalars['Int']>
  increment?: InputMaybe<Scalars['Int']>
  multiply?: InputMaybe<Scalars['Int']>
  set?: InputMaybe<Scalars['Int']>
}

export type IntFilter = {
  equals?: InputMaybe<Scalars['Int']>
  gt?: InputMaybe<Scalars['Int']>
  gte?: InputMaybe<Scalars['Int']>
  in?: InputMaybe<Array<Scalars['Int']>>
  lt?: InputMaybe<Scalars['Int']>
  lte?: InputMaybe<Scalars['Int']>
  not?: InputMaybe<NestedIntFilter>
  notIn?: InputMaybe<Array<Scalars['Int']>>
}

export type IntWithAggregatesFilter = {
  _avg?: InputMaybe<NestedFloatFilter>
  _count?: InputMaybe<NestedIntFilter>
  _max?: InputMaybe<NestedIntFilter>
  _min?: InputMaybe<NestedIntFilter>
  _sum?: InputMaybe<NestedIntFilter>
  equals?: InputMaybe<Scalars['Int']>
  gt?: InputMaybe<Scalars['Int']>
  gte?: InputMaybe<Scalars['Int']>
  in?: InputMaybe<Array<Scalars['Int']>>
  lt?: InputMaybe<Scalars['Int']>
  lte?: InputMaybe<Scalars['Int']>
  not?: InputMaybe<NestedIntWithAggregatesFilter>
  notIn?: InputMaybe<Array<Scalars['Int']>>
}

export type Mutation = {
  __typename?: 'Mutation'
  createManyAttestation: AffectedRowsOutput
  createManyEnsName: AffectedRowsOutput
  createManyOffchainRevocation: AffectedRowsOutput
  createManySchema: AffectedRowsOutput
  createManySchemaName: AffectedRowsOutput
  createManyServiceStat: AffectedRowsOutput
  createManyTimestamp: AffectedRowsOutput
  createOneAttestation: Attestation
  createOneEnsName: EnsName
  createOneOffchainRevocation: OffchainRevocation
  createOneSchema: Schema
  createOneSchemaName: SchemaName
  createOneServiceStat: ServiceStat
  createOneTimestamp: Timestamp
  deleteManyAttestation: AffectedRowsOutput
  deleteManyEnsName: AffectedRowsOutput
  deleteManyOffchainRevocation: AffectedRowsOutput
  deleteManySchema: AffectedRowsOutput
  deleteManySchemaName: AffectedRowsOutput
  deleteManyServiceStat: AffectedRowsOutput
  deleteManyTimestamp: AffectedRowsOutput
  deleteOneAttestation?: Maybe<Attestation>
  deleteOneEnsName?: Maybe<EnsName>
  deleteOneOffchainRevocation?: Maybe<OffchainRevocation>
  deleteOneSchema?: Maybe<Schema>
  deleteOneSchemaName?: Maybe<SchemaName>
  deleteOneServiceStat?: Maybe<ServiceStat>
  deleteOneTimestamp?: Maybe<Timestamp>
  updateManyAttestation: AffectedRowsOutput
  updateManyEnsName: AffectedRowsOutput
  updateManyOffchainRevocation: AffectedRowsOutput
  updateManySchema: AffectedRowsOutput
  updateManySchemaName: AffectedRowsOutput
  updateManyServiceStat: AffectedRowsOutput
  updateManyTimestamp: AffectedRowsOutput
  updateOneAttestation?: Maybe<Attestation>
  updateOneEnsName?: Maybe<EnsName>
  updateOneOffchainRevocation?: Maybe<OffchainRevocation>
  updateOneSchema?: Maybe<Schema>
  updateOneSchemaName?: Maybe<SchemaName>
  updateOneServiceStat?: Maybe<ServiceStat>
  updateOneTimestamp?: Maybe<Timestamp>
  upsertOneAttestation: Attestation
  upsertOneEnsName: EnsName
  upsertOneOffchainRevocation: OffchainRevocation
  upsertOneSchema: Schema
  upsertOneSchemaName: SchemaName
  upsertOneServiceStat: ServiceStat
  upsertOneTimestamp: Timestamp
}

export type MutationCreateManyAttestationArgs = {
  data: Array<AttestationCreateManyInput>
  skipDuplicates?: InputMaybe<Scalars['Boolean']>
}

export type MutationCreateManyEnsNameArgs = {
  data: Array<EnsNameCreateManyInput>
  skipDuplicates?: InputMaybe<Scalars['Boolean']>
}

export type MutationCreateManyOffchainRevocationArgs = {
  data: Array<OffchainRevocationCreateManyInput>
  skipDuplicates?: InputMaybe<Scalars['Boolean']>
}

export type MutationCreateManySchemaArgs = {
  data: Array<SchemaCreateManyInput>
  skipDuplicates?: InputMaybe<Scalars['Boolean']>
}

export type MutationCreateManySchemaNameArgs = {
  data: Array<SchemaNameCreateManyInput>
  skipDuplicates?: InputMaybe<Scalars['Boolean']>
}

export type MutationCreateManyServiceStatArgs = {
  data: Array<ServiceStatCreateManyInput>
  skipDuplicates?: InputMaybe<Scalars['Boolean']>
}

export type MutationCreateManyTimestampArgs = {
  data: Array<TimestampCreateManyInput>
  skipDuplicates?: InputMaybe<Scalars['Boolean']>
}

export type MutationCreateOneAttestationArgs = {
  data: AttestationCreateInput
}

export type MutationCreateOneEnsNameArgs = {
  data: EnsNameCreateInput
}

export type MutationCreateOneOffchainRevocationArgs = {
  data: OffchainRevocationCreateInput
}

export type MutationCreateOneSchemaArgs = {
  data: SchemaCreateInput
}

export type MutationCreateOneSchemaNameArgs = {
  data: SchemaNameCreateInput
}

export type MutationCreateOneServiceStatArgs = {
  data: ServiceStatCreateInput
}

export type MutationCreateOneTimestampArgs = {
  data: TimestampCreateInput
}

export type MutationDeleteManyAttestationArgs = {
  where?: InputMaybe<AttestationWhereInput>
}

export type MutationDeleteManyEnsNameArgs = {
  where?: InputMaybe<EnsNameWhereInput>
}

export type MutationDeleteManyOffchainRevocationArgs = {
  where?: InputMaybe<OffchainRevocationWhereInput>
}

export type MutationDeleteManySchemaArgs = {
  where?: InputMaybe<SchemaWhereInput>
}

export type MutationDeleteManySchemaNameArgs = {
  where?: InputMaybe<SchemaNameWhereInput>
}

export type MutationDeleteManyServiceStatArgs = {
  where?: InputMaybe<ServiceStatWhereInput>
}

export type MutationDeleteManyTimestampArgs = {
  where?: InputMaybe<TimestampWhereInput>
}

export type MutationDeleteOneAttestationArgs = {
  where: AttestationWhereUniqueInput
}

export type MutationDeleteOneEnsNameArgs = {
  where: EnsNameWhereUniqueInput
}

export type MutationDeleteOneOffchainRevocationArgs = {
  where: OffchainRevocationWhereUniqueInput
}

export type MutationDeleteOneSchemaArgs = {
  where: SchemaWhereUniqueInput
}

export type MutationDeleteOneSchemaNameArgs = {
  where: SchemaNameWhereUniqueInput
}

export type MutationDeleteOneServiceStatArgs = {
  where: ServiceStatWhereUniqueInput
}

export type MutationDeleteOneTimestampArgs = {
  where: TimestampWhereUniqueInput
}

export type MutationUpdateManyAttestationArgs = {
  data: AttestationUpdateManyMutationInput
  where?: InputMaybe<AttestationWhereInput>
}

export type MutationUpdateManyEnsNameArgs = {
  data: EnsNameUpdateManyMutationInput
  where?: InputMaybe<EnsNameWhereInput>
}

export type MutationUpdateManyOffchainRevocationArgs = {
  data: OffchainRevocationUpdateManyMutationInput
  where?: InputMaybe<OffchainRevocationWhereInput>
}

export type MutationUpdateManySchemaArgs = {
  data: SchemaUpdateManyMutationInput
  where?: InputMaybe<SchemaWhereInput>
}

export type MutationUpdateManySchemaNameArgs = {
  data: SchemaNameUpdateManyMutationInput
  where?: InputMaybe<SchemaNameWhereInput>
}

export type MutationUpdateManyServiceStatArgs = {
  data: ServiceStatUpdateManyMutationInput
  where?: InputMaybe<ServiceStatWhereInput>
}

export type MutationUpdateManyTimestampArgs = {
  data: TimestampUpdateManyMutationInput
  where?: InputMaybe<TimestampWhereInput>
}

export type MutationUpdateOneAttestationArgs = {
  data: AttestationUpdateInput
  where: AttestationWhereUniqueInput
}

export type MutationUpdateOneEnsNameArgs = {
  data: EnsNameUpdateInput
  where: EnsNameWhereUniqueInput
}

export type MutationUpdateOneOffchainRevocationArgs = {
  data: OffchainRevocationUpdateInput
  where: OffchainRevocationWhereUniqueInput
}

export type MutationUpdateOneSchemaArgs = {
  data: SchemaUpdateInput
  where: SchemaWhereUniqueInput
}

export type MutationUpdateOneSchemaNameArgs = {
  data: SchemaNameUpdateInput
  where: SchemaNameWhereUniqueInput
}

export type MutationUpdateOneServiceStatArgs = {
  data: ServiceStatUpdateInput
  where: ServiceStatWhereUniqueInput
}

export type MutationUpdateOneTimestampArgs = {
  data: TimestampUpdateInput
  where: TimestampWhereUniqueInput
}

export type MutationUpsertOneAttestationArgs = {
  create: AttestationCreateInput
  update: AttestationUpdateInput
  where: AttestationWhereUniqueInput
}

export type MutationUpsertOneEnsNameArgs = {
  create: EnsNameCreateInput
  update: EnsNameUpdateInput
  where: EnsNameWhereUniqueInput
}

export type MutationUpsertOneOffchainRevocationArgs = {
  create: OffchainRevocationCreateInput
  update: OffchainRevocationUpdateInput
  where: OffchainRevocationWhereUniqueInput
}

export type MutationUpsertOneSchemaArgs = {
  create: SchemaCreateInput
  update: SchemaUpdateInput
  where: SchemaWhereUniqueInput
}

export type MutationUpsertOneSchemaNameArgs = {
  create: SchemaNameCreateInput
  update: SchemaNameUpdateInput
  where: SchemaNameWhereUniqueInput
}

export type MutationUpsertOneServiceStatArgs = {
  create: ServiceStatCreateInput
  update: ServiceStatUpdateInput
  where: ServiceStatWhereUniqueInput
}

export type MutationUpsertOneTimestampArgs = {
  create: TimestampCreateInput
  update: TimestampUpdateInput
  where: TimestampWhereUniqueInput
}

export type NestedBoolFilter = {
  equals?: InputMaybe<Scalars['Boolean']>
  not?: InputMaybe<NestedBoolFilter>
}

export type NestedBoolWithAggregatesFilter = {
  _count?: InputMaybe<NestedIntFilter>
  _max?: InputMaybe<NestedBoolFilter>
  _min?: InputMaybe<NestedBoolFilter>
  equals?: InputMaybe<Scalars['Boolean']>
  not?: InputMaybe<NestedBoolWithAggregatesFilter>
}

export type NestedFloatFilter = {
  equals?: InputMaybe<Scalars['Float']>
  gt?: InputMaybe<Scalars['Float']>
  gte?: InputMaybe<Scalars['Float']>
  in?: InputMaybe<Array<Scalars['Float']>>
  lt?: InputMaybe<Scalars['Float']>
  lte?: InputMaybe<Scalars['Float']>
  not?: InputMaybe<NestedFloatFilter>
  notIn?: InputMaybe<Array<Scalars['Float']>>
}

export type NestedIntFilter = {
  equals?: InputMaybe<Scalars['Int']>
  gt?: InputMaybe<Scalars['Int']>
  gte?: InputMaybe<Scalars['Int']>
  in?: InputMaybe<Array<Scalars['Int']>>
  lt?: InputMaybe<Scalars['Int']>
  lte?: InputMaybe<Scalars['Int']>
  not?: InputMaybe<NestedIntFilter>
  notIn?: InputMaybe<Array<Scalars['Int']>>
}

export type NestedIntWithAggregatesFilter = {
  _avg?: InputMaybe<NestedFloatFilter>
  _count?: InputMaybe<NestedIntFilter>
  _max?: InputMaybe<NestedIntFilter>
  _min?: InputMaybe<NestedIntFilter>
  _sum?: InputMaybe<NestedIntFilter>
  equals?: InputMaybe<Scalars['Int']>
  gt?: InputMaybe<Scalars['Int']>
  gte?: InputMaybe<Scalars['Int']>
  in?: InputMaybe<Array<Scalars['Int']>>
  lt?: InputMaybe<Scalars['Int']>
  lte?: InputMaybe<Scalars['Int']>
  not?: InputMaybe<NestedIntWithAggregatesFilter>
  notIn?: InputMaybe<Array<Scalars['Int']>>
}

export type NestedStringFilter = {
  contains?: InputMaybe<Scalars['String']>
  endsWith?: InputMaybe<Scalars['String']>
  equals?: InputMaybe<Scalars['String']>
  gt?: InputMaybe<Scalars['String']>
  gte?: InputMaybe<Scalars['String']>
  in?: InputMaybe<Array<Scalars['String']>>
  lt?: InputMaybe<Scalars['String']>
  lte?: InputMaybe<Scalars['String']>
  not?: InputMaybe<NestedStringFilter>
  notIn?: InputMaybe<Array<Scalars['String']>>
  startsWith?: InputMaybe<Scalars['String']>
}

export type NestedStringWithAggregatesFilter = {
  _count?: InputMaybe<NestedIntFilter>
  _max?: InputMaybe<NestedStringFilter>
  _min?: InputMaybe<NestedStringFilter>
  contains?: InputMaybe<Scalars['String']>
  endsWith?: InputMaybe<Scalars['String']>
  equals?: InputMaybe<Scalars['String']>
  gt?: InputMaybe<Scalars['String']>
  gte?: InputMaybe<Scalars['String']>
  in?: InputMaybe<Array<Scalars['String']>>
  lt?: InputMaybe<Scalars['String']>
  lte?: InputMaybe<Scalars['String']>
  not?: InputMaybe<NestedStringWithAggregatesFilter>
  notIn?: InputMaybe<Array<Scalars['String']>>
  startsWith?: InputMaybe<Scalars['String']>
}

export type OffchainRevocation = {
  __typename?: 'OffchainRevocation'
  from: Scalars['String']
  id: Scalars['String']
  timestamp: Scalars['Int']
  txid: Scalars['String']
  uid: Scalars['String']
}

export type OffchainRevocationAvgAggregate = {
  __typename?: 'OffchainRevocationAvgAggregate'
  timestamp?: Maybe<Scalars['Float']>
}

export type OffchainRevocationAvgOrderByAggregateInput = {
  timestamp?: InputMaybe<SortOrder>
}

export type OffchainRevocationCountAggregate = {
  __typename?: 'OffchainRevocationCountAggregate'
  _all: Scalars['Int']
  from: Scalars['Int']
  id: Scalars['Int']
  timestamp: Scalars['Int']
  txid: Scalars['Int']
  uid: Scalars['Int']
}

export type OffchainRevocationCountOrderByAggregateInput = {
  from?: InputMaybe<SortOrder>
  id?: InputMaybe<SortOrder>
  timestamp?: InputMaybe<SortOrder>
  txid?: InputMaybe<SortOrder>
  uid?: InputMaybe<SortOrder>
}

export type OffchainRevocationCreateInput = {
  from: Scalars['String']
  id?: InputMaybe<Scalars['String']>
  timestamp: Scalars['Int']
  txid: Scalars['String']
  uid: Scalars['String']
}

export type OffchainRevocationCreateManyInput = {
  from: Scalars['String']
  id?: InputMaybe<Scalars['String']>
  timestamp: Scalars['Int']
  txid: Scalars['String']
  uid: Scalars['String']
}

export type OffchainRevocationGroupBy = {
  __typename?: 'OffchainRevocationGroupBy'
  _avg?: Maybe<OffchainRevocationAvgAggregate>
  _count?: Maybe<OffchainRevocationCountAggregate>
  _max?: Maybe<OffchainRevocationMaxAggregate>
  _min?: Maybe<OffchainRevocationMinAggregate>
  _sum?: Maybe<OffchainRevocationSumAggregate>
  from: Scalars['String']
  id: Scalars['String']
  timestamp: Scalars['Int']
  txid: Scalars['String']
  uid: Scalars['String']
}

export type OffchainRevocationMaxAggregate = {
  __typename?: 'OffchainRevocationMaxAggregate'
  from?: Maybe<Scalars['String']>
  id?: Maybe<Scalars['String']>
  timestamp?: Maybe<Scalars['Int']>
  txid?: Maybe<Scalars['String']>
  uid?: Maybe<Scalars['String']>
}

export type OffchainRevocationMaxOrderByAggregateInput = {
  from?: InputMaybe<SortOrder>
  id?: InputMaybe<SortOrder>
  timestamp?: InputMaybe<SortOrder>
  txid?: InputMaybe<SortOrder>
  uid?: InputMaybe<SortOrder>
}

export type OffchainRevocationMinAggregate = {
  __typename?: 'OffchainRevocationMinAggregate'
  from?: Maybe<Scalars['String']>
  id?: Maybe<Scalars['String']>
  timestamp?: Maybe<Scalars['Int']>
  txid?: Maybe<Scalars['String']>
  uid?: Maybe<Scalars['String']>
}

export type OffchainRevocationMinOrderByAggregateInput = {
  from?: InputMaybe<SortOrder>
  id?: InputMaybe<SortOrder>
  timestamp?: InputMaybe<SortOrder>
  txid?: InputMaybe<SortOrder>
  uid?: InputMaybe<SortOrder>
}

export type OffchainRevocationOrderByWithAggregationInput = {
  _avg?: InputMaybe<OffchainRevocationAvgOrderByAggregateInput>
  _count?: InputMaybe<OffchainRevocationCountOrderByAggregateInput>
  _max?: InputMaybe<OffchainRevocationMaxOrderByAggregateInput>
  _min?: InputMaybe<OffchainRevocationMinOrderByAggregateInput>
  _sum?: InputMaybe<OffchainRevocationSumOrderByAggregateInput>
  from?: InputMaybe<SortOrder>
  id?: InputMaybe<SortOrder>
  timestamp?: InputMaybe<SortOrder>
  txid?: InputMaybe<SortOrder>
  uid?: InputMaybe<SortOrder>
}

export type OffchainRevocationOrderByWithRelationInput = {
  from?: InputMaybe<SortOrder>
  id?: InputMaybe<SortOrder>
  timestamp?: InputMaybe<SortOrder>
  txid?: InputMaybe<SortOrder>
  uid?: InputMaybe<SortOrder>
}

export enum OffchainRevocationScalarFieldEnum {
  From = 'from',
  Id = 'id',
  Timestamp = 'timestamp',
  Txid = 'txid',
  Uid = 'uid',
}

export type OffchainRevocationScalarWhereWithAggregatesInput = {
  AND?: InputMaybe<Array<OffchainRevocationScalarWhereWithAggregatesInput>>
  NOT?: InputMaybe<Array<OffchainRevocationScalarWhereWithAggregatesInput>>
  OR?: InputMaybe<Array<OffchainRevocationScalarWhereWithAggregatesInput>>
  from?: InputMaybe<StringWithAggregatesFilter>
  id?: InputMaybe<StringWithAggregatesFilter>
  timestamp?: InputMaybe<IntWithAggregatesFilter>
  txid?: InputMaybe<StringWithAggregatesFilter>
  uid?: InputMaybe<StringWithAggregatesFilter>
}

export type OffchainRevocationSumAggregate = {
  __typename?: 'OffchainRevocationSumAggregate'
  timestamp?: Maybe<Scalars['Int']>
}

export type OffchainRevocationSumOrderByAggregateInput = {
  timestamp?: InputMaybe<SortOrder>
}

export type OffchainRevocationUpdateInput = {
  from?: InputMaybe<StringFieldUpdateOperationsInput>
  id?: InputMaybe<StringFieldUpdateOperationsInput>
  timestamp?: InputMaybe<IntFieldUpdateOperationsInput>
  txid?: InputMaybe<StringFieldUpdateOperationsInput>
  uid?: InputMaybe<StringFieldUpdateOperationsInput>
}

export type OffchainRevocationUpdateManyMutationInput = {
  from?: InputMaybe<StringFieldUpdateOperationsInput>
  id?: InputMaybe<StringFieldUpdateOperationsInput>
  timestamp?: InputMaybe<IntFieldUpdateOperationsInput>
  txid?: InputMaybe<StringFieldUpdateOperationsInput>
  uid?: InputMaybe<StringFieldUpdateOperationsInput>
}

export type OffchainRevocationWhereInput = {
  AND?: InputMaybe<Array<OffchainRevocationWhereInput>>
  NOT?: InputMaybe<Array<OffchainRevocationWhereInput>>
  OR?: InputMaybe<Array<OffchainRevocationWhereInput>>
  from?: InputMaybe<StringFilter>
  id?: InputMaybe<StringFilter>
  timestamp?: InputMaybe<IntFilter>
  txid?: InputMaybe<StringFilter>
  uid?: InputMaybe<StringFilter>
}

export type OffchainRevocationWhereUniqueInput = {
  id?: InputMaybe<Scalars['String']>
}

export type Query = {
  __typename?: 'Query'
  aggregateAttestation: AggregateAttestation
  aggregateEnsName: AggregateEnsName
  aggregateOffchainRevocation: AggregateOffchainRevocation
  aggregateSchema: AggregateSchema
  aggregateSchemaName: AggregateSchemaName
  aggregateServiceStat: AggregateServiceStat
  aggregateTimestamp: AggregateTimestamp
  attestation?: Maybe<Attestation>
  attestations: Array<Attestation>
  ensName?: Maybe<EnsName>
  ensNames: Array<EnsName>
  findFirstAttestation?: Maybe<Attestation>
  findFirstAttestationOrThrow?: Maybe<Attestation>
  findFirstEnsName?: Maybe<EnsName>
  findFirstEnsNameOrThrow?: Maybe<EnsName>
  findFirstOffchainRevocation?: Maybe<OffchainRevocation>
  findFirstOffchainRevocationOrThrow?: Maybe<OffchainRevocation>
  findFirstSchema?: Maybe<Schema>
  findFirstSchemaName?: Maybe<SchemaName>
  findFirstSchemaNameOrThrow?: Maybe<SchemaName>
  findFirstSchemaOrThrow?: Maybe<Schema>
  findFirstServiceStat?: Maybe<ServiceStat>
  findFirstServiceStatOrThrow?: Maybe<ServiceStat>
  findFirstTimestamp?: Maybe<Timestamp>
  findFirstTimestampOrThrow?: Maybe<Timestamp>
  getAttestation?: Maybe<Attestation>
  getEnsName?: Maybe<EnsName>
  getOffchainRevocation?: Maybe<OffchainRevocation>
  getSchema?: Maybe<Schema>
  getSchemaName?: Maybe<SchemaName>
  getServiceStat?: Maybe<ServiceStat>
  getTimestamp?: Maybe<Timestamp>
  groupByAttestation: Array<AttestationGroupBy>
  groupByEnsName: Array<EnsNameGroupBy>
  groupByOffchainRevocation: Array<OffchainRevocationGroupBy>
  groupBySchema: Array<SchemaGroupBy>
  groupBySchemaName: Array<SchemaNameGroupBy>
  groupByServiceStat: Array<ServiceStatGroupBy>
  groupByTimestamp: Array<TimestampGroupBy>
  offchainRevocation?: Maybe<OffchainRevocation>
  offchainRevocations: Array<OffchainRevocation>
  schema?: Maybe<Schema>
  schemaName?: Maybe<SchemaName>
  schemaNames: Array<SchemaName>
  schemata: Array<Schema>
  serviceStat?: Maybe<ServiceStat>
  serviceStats: Array<ServiceStat>
  timestamp?: Maybe<Timestamp>
  timestamps: Array<Timestamp>
}

export type QueryAggregateAttestationArgs = {
  cursor?: InputMaybe<AttestationWhereUniqueInput>
  orderBy?: InputMaybe<Array<AttestationOrderByWithRelationInput>>
  skip?: InputMaybe<Scalars['Int']>
  take?: InputMaybe<Scalars['Int']>
  where?: InputMaybe<AttestationWhereInput>
}

export type QueryAggregateEnsNameArgs = {
  cursor?: InputMaybe<EnsNameWhereUniqueInput>
  orderBy?: InputMaybe<Array<EnsNameOrderByWithRelationInput>>
  skip?: InputMaybe<Scalars['Int']>
  take?: InputMaybe<Scalars['Int']>
  where?: InputMaybe<EnsNameWhereInput>
}

export type QueryAggregateOffchainRevocationArgs = {
  cursor?: InputMaybe<OffchainRevocationWhereUniqueInput>
  orderBy?: InputMaybe<Array<OffchainRevocationOrderByWithRelationInput>>
  skip?: InputMaybe<Scalars['Int']>
  take?: InputMaybe<Scalars['Int']>
  where?: InputMaybe<OffchainRevocationWhereInput>
}

export type QueryAggregateSchemaArgs = {
  cursor?: InputMaybe<SchemaWhereUniqueInput>
  orderBy?: InputMaybe<Array<SchemaOrderByWithRelationInput>>
  skip?: InputMaybe<Scalars['Int']>
  take?: InputMaybe<Scalars['Int']>
  where?: InputMaybe<SchemaWhereInput>
}

export type QueryAggregateSchemaNameArgs = {
  cursor?: InputMaybe<SchemaNameWhereUniqueInput>
  orderBy?: InputMaybe<Array<SchemaNameOrderByWithRelationInput>>
  skip?: InputMaybe<Scalars['Int']>
  take?: InputMaybe<Scalars['Int']>
  where?: InputMaybe<SchemaNameWhereInput>
}

export type QueryAggregateServiceStatArgs = {
  cursor?: InputMaybe<ServiceStatWhereUniqueInput>
  orderBy?: InputMaybe<Array<ServiceStatOrderByWithRelationInput>>
  skip?: InputMaybe<Scalars['Int']>
  take?: InputMaybe<Scalars['Int']>
  where?: InputMaybe<ServiceStatWhereInput>
}

export type QueryAggregateTimestampArgs = {
  cursor?: InputMaybe<TimestampWhereUniqueInput>
  orderBy?: InputMaybe<Array<TimestampOrderByWithRelationInput>>
  skip?: InputMaybe<Scalars['Int']>
  take?: InputMaybe<Scalars['Int']>
  where?: InputMaybe<TimestampWhereInput>
}

export type QueryAttestationArgs = {
  where: AttestationWhereUniqueInput
}

export type QueryAttestationsArgs = {
  cursor?: InputMaybe<AttestationWhereUniqueInput>
  distinct?: InputMaybe<Array<AttestationScalarFieldEnum>>
  orderBy?: InputMaybe<Array<AttestationOrderByWithRelationInput>>
  skip?: InputMaybe<Scalars['Int']>
  take?: InputMaybe<Scalars['Int']>
  where?: InputMaybe<AttestationWhereInput>
}

export type QueryEnsNameArgs = {
  where: EnsNameWhereUniqueInput
}

export type QueryEnsNamesArgs = {
  cursor?: InputMaybe<EnsNameWhereUniqueInput>
  distinct?: InputMaybe<Array<EnsNameScalarFieldEnum>>
  orderBy?: InputMaybe<Array<EnsNameOrderByWithRelationInput>>
  skip?: InputMaybe<Scalars['Int']>
  take?: InputMaybe<Scalars['Int']>
  where?: InputMaybe<EnsNameWhereInput>
}

export type QueryFindFirstAttestationArgs = {
  cursor?: InputMaybe<AttestationWhereUniqueInput>
  distinct?: InputMaybe<Array<AttestationScalarFieldEnum>>
  orderBy?: InputMaybe<Array<AttestationOrderByWithRelationInput>>
  skip?: InputMaybe<Scalars['Int']>
  take?: InputMaybe<Scalars['Int']>
  where?: InputMaybe<AttestationWhereInput>
}

export type QueryFindFirstAttestationOrThrowArgs = {
  cursor?: InputMaybe<AttestationWhereUniqueInput>
  distinct?: InputMaybe<Array<AttestationScalarFieldEnum>>
  orderBy?: InputMaybe<Array<AttestationOrderByWithRelationInput>>
  skip?: InputMaybe<Scalars['Int']>
  take?: InputMaybe<Scalars['Int']>
  where?: InputMaybe<AttestationWhereInput>
}

export type QueryFindFirstEnsNameArgs = {
  cursor?: InputMaybe<EnsNameWhereUniqueInput>
  distinct?: InputMaybe<Array<EnsNameScalarFieldEnum>>
  orderBy?: InputMaybe<Array<EnsNameOrderByWithRelationInput>>
  skip?: InputMaybe<Scalars['Int']>
  take?: InputMaybe<Scalars['Int']>
  where?: InputMaybe<EnsNameWhereInput>
}

export type QueryFindFirstEnsNameOrThrowArgs = {
  cursor?: InputMaybe<EnsNameWhereUniqueInput>
  distinct?: InputMaybe<Array<EnsNameScalarFieldEnum>>
  orderBy?: InputMaybe<Array<EnsNameOrderByWithRelationInput>>
  skip?: InputMaybe<Scalars['Int']>
  take?: InputMaybe<Scalars['Int']>
  where?: InputMaybe<EnsNameWhereInput>
}

export type QueryFindFirstOffchainRevocationArgs = {
  cursor?: InputMaybe<OffchainRevocationWhereUniqueInput>
  distinct?: InputMaybe<Array<OffchainRevocationScalarFieldEnum>>
  orderBy?: InputMaybe<Array<OffchainRevocationOrderByWithRelationInput>>
  skip?: InputMaybe<Scalars['Int']>
  take?: InputMaybe<Scalars['Int']>
  where?: InputMaybe<OffchainRevocationWhereInput>
}

export type QueryFindFirstOffchainRevocationOrThrowArgs = {
  cursor?: InputMaybe<OffchainRevocationWhereUniqueInput>
  distinct?: InputMaybe<Array<OffchainRevocationScalarFieldEnum>>
  orderBy?: InputMaybe<Array<OffchainRevocationOrderByWithRelationInput>>
  skip?: InputMaybe<Scalars['Int']>
  take?: InputMaybe<Scalars['Int']>
  where?: InputMaybe<OffchainRevocationWhereInput>
}

export type QueryFindFirstSchemaArgs = {
  cursor?: InputMaybe<SchemaWhereUniqueInput>
  distinct?: InputMaybe<Array<SchemaScalarFieldEnum>>
  orderBy?: InputMaybe<Array<SchemaOrderByWithRelationInput>>
  skip?: InputMaybe<Scalars['Int']>
  take?: InputMaybe<Scalars['Int']>
  where?: InputMaybe<SchemaWhereInput>
}

export type QueryFindFirstSchemaNameArgs = {
  cursor?: InputMaybe<SchemaNameWhereUniqueInput>
  distinct?: InputMaybe<Array<SchemaNameScalarFieldEnum>>
  orderBy?: InputMaybe<Array<SchemaNameOrderByWithRelationInput>>
  skip?: InputMaybe<Scalars['Int']>
  take?: InputMaybe<Scalars['Int']>
  where?: InputMaybe<SchemaNameWhereInput>
}

export type QueryFindFirstSchemaNameOrThrowArgs = {
  cursor?: InputMaybe<SchemaNameWhereUniqueInput>
  distinct?: InputMaybe<Array<SchemaNameScalarFieldEnum>>
  orderBy?: InputMaybe<Array<SchemaNameOrderByWithRelationInput>>
  skip?: InputMaybe<Scalars['Int']>
  take?: InputMaybe<Scalars['Int']>
  where?: InputMaybe<SchemaNameWhereInput>
}

export type QueryFindFirstSchemaOrThrowArgs = {
  cursor?: InputMaybe<SchemaWhereUniqueInput>
  distinct?: InputMaybe<Array<SchemaScalarFieldEnum>>
  orderBy?: InputMaybe<Array<SchemaOrderByWithRelationInput>>
  skip?: InputMaybe<Scalars['Int']>
  take?: InputMaybe<Scalars['Int']>
  where?: InputMaybe<SchemaWhereInput>
}

export type QueryFindFirstServiceStatArgs = {
  cursor?: InputMaybe<ServiceStatWhereUniqueInput>
  distinct?: InputMaybe<Array<ServiceStatScalarFieldEnum>>
  orderBy?: InputMaybe<Array<ServiceStatOrderByWithRelationInput>>
  skip?: InputMaybe<Scalars['Int']>
  take?: InputMaybe<Scalars['Int']>
  where?: InputMaybe<ServiceStatWhereInput>
}

export type QueryFindFirstServiceStatOrThrowArgs = {
  cursor?: InputMaybe<ServiceStatWhereUniqueInput>
  distinct?: InputMaybe<Array<ServiceStatScalarFieldEnum>>
  orderBy?: InputMaybe<Array<ServiceStatOrderByWithRelationInput>>
  skip?: InputMaybe<Scalars['Int']>
  take?: InputMaybe<Scalars['Int']>
  where?: InputMaybe<ServiceStatWhereInput>
}

export type QueryFindFirstTimestampArgs = {
  cursor?: InputMaybe<TimestampWhereUniqueInput>
  distinct?: InputMaybe<Array<TimestampScalarFieldEnum>>
  orderBy?: InputMaybe<Array<TimestampOrderByWithRelationInput>>
  skip?: InputMaybe<Scalars['Int']>
  take?: InputMaybe<Scalars['Int']>
  where?: InputMaybe<TimestampWhereInput>
}

export type QueryFindFirstTimestampOrThrowArgs = {
  cursor?: InputMaybe<TimestampWhereUniqueInput>
  distinct?: InputMaybe<Array<TimestampScalarFieldEnum>>
  orderBy?: InputMaybe<Array<TimestampOrderByWithRelationInput>>
  skip?: InputMaybe<Scalars['Int']>
  take?: InputMaybe<Scalars['Int']>
  where?: InputMaybe<TimestampWhereInput>
}

export type QueryGetAttestationArgs = {
  where: AttestationWhereUniqueInput
}

export type QueryGetEnsNameArgs = {
  where: EnsNameWhereUniqueInput
}

export type QueryGetOffchainRevocationArgs = {
  where: OffchainRevocationWhereUniqueInput
}

export type QueryGetSchemaArgs = {
  where: SchemaWhereUniqueInput
}

export type QueryGetSchemaNameArgs = {
  where: SchemaNameWhereUniqueInput
}

export type QueryGetServiceStatArgs = {
  where: ServiceStatWhereUniqueInput
}

export type QueryGetTimestampArgs = {
  where: TimestampWhereUniqueInput
}

export type QueryGroupByAttestationArgs = {
  by: Array<AttestationScalarFieldEnum>
  having?: InputMaybe<AttestationScalarWhereWithAggregatesInput>
  orderBy?: InputMaybe<Array<AttestationOrderByWithAggregationInput>>
  skip?: InputMaybe<Scalars['Int']>
  take?: InputMaybe<Scalars['Int']>
  where?: InputMaybe<AttestationWhereInput>
}

export type QueryGroupByEnsNameArgs = {
  by: Array<EnsNameScalarFieldEnum>
  having?: InputMaybe<EnsNameScalarWhereWithAggregatesInput>
  orderBy?: InputMaybe<Array<EnsNameOrderByWithAggregationInput>>
  skip?: InputMaybe<Scalars['Int']>
  take?: InputMaybe<Scalars['Int']>
  where?: InputMaybe<EnsNameWhereInput>
}

export type QueryGroupByOffchainRevocationArgs = {
  by: Array<OffchainRevocationScalarFieldEnum>
  having?: InputMaybe<OffchainRevocationScalarWhereWithAggregatesInput>
  orderBy?: InputMaybe<Array<OffchainRevocationOrderByWithAggregationInput>>
  skip?: InputMaybe<Scalars['Int']>
  take?: InputMaybe<Scalars['Int']>
  where?: InputMaybe<OffchainRevocationWhereInput>
}

export type QueryGroupBySchemaArgs = {
  by: Array<SchemaScalarFieldEnum>
  having?: InputMaybe<SchemaScalarWhereWithAggregatesInput>
  orderBy?: InputMaybe<Array<SchemaOrderByWithAggregationInput>>
  skip?: InputMaybe<Scalars['Int']>
  take?: InputMaybe<Scalars['Int']>
  where?: InputMaybe<SchemaWhereInput>
}

export type QueryGroupBySchemaNameArgs = {
  by: Array<SchemaNameScalarFieldEnum>
  having?: InputMaybe<SchemaNameScalarWhereWithAggregatesInput>
  orderBy?: InputMaybe<Array<SchemaNameOrderByWithAggregationInput>>
  skip?: InputMaybe<Scalars['Int']>
  take?: InputMaybe<Scalars['Int']>
  where?: InputMaybe<SchemaNameWhereInput>
}

export type QueryGroupByServiceStatArgs = {
  by: Array<ServiceStatScalarFieldEnum>
  having?: InputMaybe<ServiceStatScalarWhereWithAggregatesInput>
  orderBy?: InputMaybe<Array<ServiceStatOrderByWithAggregationInput>>
  skip?: InputMaybe<Scalars['Int']>
  take?: InputMaybe<Scalars['Int']>
  where?: InputMaybe<ServiceStatWhereInput>
}

export type QueryGroupByTimestampArgs = {
  by: Array<TimestampScalarFieldEnum>
  having?: InputMaybe<TimestampScalarWhereWithAggregatesInput>
  orderBy?: InputMaybe<Array<TimestampOrderByWithAggregationInput>>
  skip?: InputMaybe<Scalars['Int']>
  take?: InputMaybe<Scalars['Int']>
  where?: InputMaybe<TimestampWhereInput>
}

export type QueryOffchainRevocationArgs = {
  where: OffchainRevocationWhereUniqueInput
}

export type QueryOffchainRevocationsArgs = {
  cursor?: InputMaybe<OffchainRevocationWhereUniqueInput>
  distinct?: InputMaybe<Array<OffchainRevocationScalarFieldEnum>>
  orderBy?: InputMaybe<Array<OffchainRevocationOrderByWithRelationInput>>
  skip?: InputMaybe<Scalars['Int']>
  take?: InputMaybe<Scalars['Int']>
  where?: InputMaybe<OffchainRevocationWhereInput>
}

export type QuerySchemaArgs = {
  where: SchemaWhereUniqueInput
}

export type QuerySchemaNameArgs = {
  where: SchemaNameWhereUniqueInput
}

export type QuerySchemaNamesArgs = {
  cursor?: InputMaybe<SchemaNameWhereUniqueInput>
  distinct?: InputMaybe<Array<SchemaNameScalarFieldEnum>>
  orderBy?: InputMaybe<Array<SchemaNameOrderByWithRelationInput>>
  skip?: InputMaybe<Scalars['Int']>
  take?: InputMaybe<Scalars['Int']>
  where?: InputMaybe<SchemaNameWhereInput>
}

export type QuerySchemataArgs = {
  cursor?: InputMaybe<SchemaWhereUniqueInput>
  distinct?: InputMaybe<Array<SchemaScalarFieldEnum>>
  orderBy?: InputMaybe<Array<SchemaOrderByWithRelationInput>>
  skip?: InputMaybe<Scalars['Int']>
  take?: InputMaybe<Scalars['Int']>
  where?: InputMaybe<SchemaWhereInput>
}

export type QueryServiceStatArgs = {
  where: ServiceStatWhereUniqueInput
}

export type QueryServiceStatsArgs = {
  cursor?: InputMaybe<ServiceStatWhereUniqueInput>
  distinct?: InputMaybe<Array<ServiceStatScalarFieldEnum>>
  orderBy?: InputMaybe<Array<ServiceStatOrderByWithRelationInput>>
  skip?: InputMaybe<Scalars['Int']>
  take?: InputMaybe<Scalars['Int']>
  where?: InputMaybe<ServiceStatWhereInput>
}

export type QueryTimestampArgs = {
  where: TimestampWhereUniqueInput
}

export type QueryTimestampsArgs = {
  cursor?: InputMaybe<TimestampWhereUniqueInput>
  distinct?: InputMaybe<Array<TimestampScalarFieldEnum>>
  orderBy?: InputMaybe<Array<TimestampOrderByWithRelationInput>>
  skip?: InputMaybe<Scalars['Int']>
  take?: InputMaybe<Scalars['Int']>
  where?: InputMaybe<TimestampWhereInput>
}

export enum QueryMode {
  Default = 'default',
  Insensitive = 'insensitive',
}

export type Schema = {
  __typename?: 'Schema'
  _count?: Maybe<SchemaCount>
  attestations: Array<Attestation>
  creator: Scalars['String']
  id: Scalars['String']
  index: Scalars['String']
  resolver: Scalars['String']
  revocable: Scalars['Boolean']
  schema: Scalars['String']
  schemaNames: Array<SchemaName>
  time: Scalars['Int']
  txid: Scalars['String']
}

export type SchemaAttestationsArgs = {
  cursor?: InputMaybe<AttestationWhereUniqueInput>
  distinct?: InputMaybe<Array<AttestationScalarFieldEnum>>
  orderBy?: InputMaybe<Array<AttestationOrderByWithRelationInput>>
  skip?: InputMaybe<Scalars['Int']>
  take?: InputMaybe<Scalars['Int']>
  where?: InputMaybe<AttestationWhereInput>
}

export type SchemaSchemaNamesArgs = {
  cursor?: InputMaybe<SchemaNameWhereUniqueInput>
  distinct?: InputMaybe<Array<SchemaNameScalarFieldEnum>>
  orderBy?: InputMaybe<Array<SchemaNameOrderByWithRelationInput>>
  skip?: InputMaybe<Scalars['Int']>
  take?: InputMaybe<Scalars['Int']>
  where?: InputMaybe<SchemaNameWhereInput>
}

export type SchemaAvgAggregate = {
  __typename?: 'SchemaAvgAggregate'
  time?: Maybe<Scalars['Float']>
}

export type SchemaAvgOrderByAggregateInput = {
  time?: InputMaybe<SortOrder>
}

export type SchemaCount = {
  __typename?: 'SchemaCount'
  attestations: Scalars['Int']
  schemaNames: Scalars['Int']
}

export type SchemaCountAggregate = {
  __typename?: 'SchemaCountAggregate'
  _all: Scalars['Int']
  creator: Scalars['Int']
  id: Scalars['Int']
  index: Scalars['Int']
  resolver: Scalars['Int']
  revocable: Scalars['Int']
  schema: Scalars['Int']
  time: Scalars['Int']
  txid: Scalars['Int']
}

export type SchemaCountOrderByAggregateInput = {
  creator?: InputMaybe<SortOrder>
  id?: InputMaybe<SortOrder>
  index?: InputMaybe<SortOrder>
  resolver?: InputMaybe<SortOrder>
  revocable?: InputMaybe<SortOrder>
  schema?: InputMaybe<SortOrder>
  time?: InputMaybe<SortOrder>
  txid?: InputMaybe<SortOrder>
}

export type SchemaCreateInput = {
  attestations?: InputMaybe<AttestationCreateNestedManyWithoutSchemaInput>
  creator: Scalars['String']
  id: Scalars['String']
  index: Scalars['String']
  resolver: Scalars['String']
  revocable: Scalars['Boolean']
  schema: Scalars['String']
  schemaNames?: InputMaybe<SchemaNameCreateNestedManyWithoutSchemaInput>
  time: Scalars['Int']
  txid: Scalars['String']
}

export type SchemaCreateManyInput = {
  creator: Scalars['String']
  id: Scalars['String']
  index: Scalars['String']
  resolver: Scalars['String']
  revocable: Scalars['Boolean']
  schema: Scalars['String']
  time: Scalars['Int']
  txid: Scalars['String']
}

export type SchemaCreateNestedOneWithoutAttestationsInput = {
  connect?: InputMaybe<SchemaWhereUniqueInput>
  connectOrCreate?: InputMaybe<SchemaCreateOrConnectWithoutAttestationsInput>
  create?: InputMaybe<SchemaCreateWithoutAttestationsInput>
}

export type SchemaCreateNestedOneWithoutSchemaNamesInput = {
  connect?: InputMaybe<SchemaWhereUniqueInput>
  connectOrCreate?: InputMaybe<SchemaCreateOrConnectWithoutSchemaNamesInput>
  create?: InputMaybe<SchemaCreateWithoutSchemaNamesInput>
}

export type SchemaCreateOrConnectWithoutAttestationsInput = {
  create: SchemaCreateWithoutAttestationsInput
  where: SchemaWhereUniqueInput
}

export type SchemaCreateOrConnectWithoutSchemaNamesInput = {
  create: SchemaCreateWithoutSchemaNamesInput
  where: SchemaWhereUniqueInput
}

export type SchemaCreateWithoutAttestationsInput = {
  creator: Scalars['String']
  id: Scalars['String']
  index: Scalars['String']
  resolver: Scalars['String']
  revocable: Scalars['Boolean']
  schema: Scalars['String']
  schemaNames?: InputMaybe<SchemaNameCreateNestedManyWithoutSchemaInput>
  time: Scalars['Int']
  txid: Scalars['String']
}

export type SchemaCreateWithoutSchemaNamesInput = {
  attestations?: InputMaybe<AttestationCreateNestedManyWithoutSchemaInput>
  creator: Scalars['String']
  id: Scalars['String']
  index: Scalars['String']
  resolver: Scalars['String']
  revocable: Scalars['Boolean']
  schema: Scalars['String']
  time: Scalars['Int']
  txid: Scalars['String']
}

export type SchemaGroupBy = {
  __typename?: 'SchemaGroupBy'
  _avg?: Maybe<SchemaAvgAggregate>
  _count?: Maybe<SchemaCountAggregate>
  _max?: Maybe<SchemaMaxAggregate>
  _min?: Maybe<SchemaMinAggregate>
  _sum?: Maybe<SchemaSumAggregate>
  creator: Scalars['String']
  id: Scalars['String']
  index: Scalars['String']
  resolver: Scalars['String']
  revocable: Scalars['Boolean']
  schema: Scalars['String']
  time: Scalars['Int']
  txid: Scalars['String']
}

export type SchemaMaxAggregate = {
  __typename?: 'SchemaMaxAggregate'
  creator?: Maybe<Scalars['String']>
  id?: Maybe<Scalars['String']>
  index?: Maybe<Scalars['String']>
  resolver?: Maybe<Scalars['String']>
  revocable?: Maybe<Scalars['Boolean']>
  schema?: Maybe<Scalars['String']>
  time?: Maybe<Scalars['Int']>
  txid?: Maybe<Scalars['String']>
}

export type SchemaMaxOrderByAggregateInput = {
  creator?: InputMaybe<SortOrder>
  id?: InputMaybe<SortOrder>
  index?: InputMaybe<SortOrder>
  resolver?: InputMaybe<SortOrder>
  revocable?: InputMaybe<SortOrder>
  schema?: InputMaybe<SortOrder>
  time?: InputMaybe<SortOrder>
  txid?: InputMaybe<SortOrder>
}

export type SchemaMinAggregate = {
  __typename?: 'SchemaMinAggregate'
  creator?: Maybe<Scalars['String']>
  id?: Maybe<Scalars['String']>
  index?: Maybe<Scalars['String']>
  resolver?: Maybe<Scalars['String']>
  revocable?: Maybe<Scalars['Boolean']>
  schema?: Maybe<Scalars['String']>
  time?: Maybe<Scalars['Int']>
  txid?: Maybe<Scalars['String']>
}

export type SchemaMinOrderByAggregateInput = {
  creator?: InputMaybe<SortOrder>
  id?: InputMaybe<SortOrder>
  index?: InputMaybe<SortOrder>
  resolver?: InputMaybe<SortOrder>
  revocable?: InputMaybe<SortOrder>
  schema?: InputMaybe<SortOrder>
  time?: InputMaybe<SortOrder>
  txid?: InputMaybe<SortOrder>
}

export type SchemaName = {
  __typename?: 'SchemaName'
  attesterAddress: Scalars['String']
  id: Scalars['String']
  isCreator: Scalars['Boolean']
  name: Scalars['String']
  schema: Schema
  schemaId: Scalars['String']
  time: Scalars['Int']
}

export type SchemaNameAvgAggregate = {
  __typename?: 'SchemaNameAvgAggregate'
  time?: Maybe<Scalars['Float']>
}

export type SchemaNameAvgOrderByAggregateInput = {
  time?: InputMaybe<SortOrder>
}

export type SchemaNameCountAggregate = {
  __typename?: 'SchemaNameCountAggregate'
  _all: Scalars['Int']
  attesterAddress: Scalars['Int']
  id: Scalars['Int']
  isCreator: Scalars['Int']
  name: Scalars['Int']
  schemaId: Scalars['Int']
  time: Scalars['Int']
}

export type SchemaNameCountOrderByAggregateInput = {
  attesterAddress?: InputMaybe<SortOrder>
  id?: InputMaybe<SortOrder>
  isCreator?: InputMaybe<SortOrder>
  name?: InputMaybe<SortOrder>
  schemaId?: InputMaybe<SortOrder>
  time?: InputMaybe<SortOrder>
}

export type SchemaNameCreateInput = {
  attesterAddress: Scalars['String']
  id?: InputMaybe<Scalars['String']>
  isCreator: Scalars['Boolean']
  name: Scalars['String']
  schema: SchemaCreateNestedOneWithoutSchemaNamesInput
  time: Scalars['Int']
}

export type SchemaNameCreateManyInput = {
  attesterAddress: Scalars['String']
  id?: InputMaybe<Scalars['String']>
  isCreator: Scalars['Boolean']
  name: Scalars['String']
  schemaId: Scalars['String']
  time: Scalars['Int']
}

export type SchemaNameCreateManySchemaInput = {
  attesterAddress: Scalars['String']
  id?: InputMaybe<Scalars['String']>
  isCreator: Scalars['Boolean']
  name: Scalars['String']
  time: Scalars['Int']
}

export type SchemaNameCreateManySchemaInputEnvelope = {
  data: Array<SchemaNameCreateManySchemaInput>
  skipDuplicates?: InputMaybe<Scalars['Boolean']>
}

export type SchemaNameCreateNestedManyWithoutSchemaInput = {
  connect?: InputMaybe<Array<SchemaNameWhereUniqueInput>>
  connectOrCreate?: InputMaybe<Array<SchemaNameCreateOrConnectWithoutSchemaInput>>
  create?: InputMaybe<Array<SchemaNameCreateWithoutSchemaInput>>
  createMany?: InputMaybe<SchemaNameCreateManySchemaInputEnvelope>
}

export type SchemaNameCreateOrConnectWithoutSchemaInput = {
  create: SchemaNameCreateWithoutSchemaInput
  where: SchemaNameWhereUniqueInput
}

export type SchemaNameCreateWithoutSchemaInput = {
  attesterAddress: Scalars['String']
  id?: InputMaybe<Scalars['String']>
  isCreator: Scalars['Boolean']
  name: Scalars['String']
  time: Scalars['Int']
}

export type SchemaNameGroupBy = {
  __typename?: 'SchemaNameGroupBy'
  _avg?: Maybe<SchemaNameAvgAggregate>
  _count?: Maybe<SchemaNameCountAggregate>
  _max?: Maybe<SchemaNameMaxAggregate>
  _min?: Maybe<SchemaNameMinAggregate>
  _sum?: Maybe<SchemaNameSumAggregate>
  attesterAddress: Scalars['String']
  id: Scalars['String']
  isCreator: Scalars['Boolean']
  name: Scalars['String']
  schemaId: Scalars['String']
  time: Scalars['Int']
}

export type SchemaNameListRelationFilter = {
  every?: InputMaybe<SchemaNameWhereInput>
  none?: InputMaybe<SchemaNameWhereInput>
  some?: InputMaybe<SchemaNameWhereInput>
}

export type SchemaNameMaxAggregate = {
  __typename?: 'SchemaNameMaxAggregate'
  attesterAddress?: Maybe<Scalars['String']>
  id?: Maybe<Scalars['String']>
  isCreator?: Maybe<Scalars['Boolean']>
  name?: Maybe<Scalars['String']>
  schemaId?: Maybe<Scalars['String']>
  time?: Maybe<Scalars['Int']>
}

export type SchemaNameMaxOrderByAggregateInput = {
  attesterAddress?: InputMaybe<SortOrder>
  id?: InputMaybe<SortOrder>
  isCreator?: InputMaybe<SortOrder>
  name?: InputMaybe<SortOrder>
  schemaId?: InputMaybe<SortOrder>
  time?: InputMaybe<SortOrder>
}

export type SchemaNameMinAggregate = {
  __typename?: 'SchemaNameMinAggregate'
  attesterAddress?: Maybe<Scalars['String']>
  id?: Maybe<Scalars['String']>
  isCreator?: Maybe<Scalars['Boolean']>
  name?: Maybe<Scalars['String']>
  schemaId?: Maybe<Scalars['String']>
  time?: Maybe<Scalars['Int']>
}

export type SchemaNameMinOrderByAggregateInput = {
  attesterAddress?: InputMaybe<SortOrder>
  id?: InputMaybe<SortOrder>
  isCreator?: InputMaybe<SortOrder>
  name?: InputMaybe<SortOrder>
  schemaId?: InputMaybe<SortOrder>
  time?: InputMaybe<SortOrder>
}

export type SchemaNameOrderByRelationAggregateInput = {
  _count?: InputMaybe<SortOrder>
}

export type SchemaNameOrderByWithAggregationInput = {
  _avg?: InputMaybe<SchemaNameAvgOrderByAggregateInput>
  _count?: InputMaybe<SchemaNameCountOrderByAggregateInput>
  _max?: InputMaybe<SchemaNameMaxOrderByAggregateInput>
  _min?: InputMaybe<SchemaNameMinOrderByAggregateInput>
  _sum?: InputMaybe<SchemaNameSumOrderByAggregateInput>
  attesterAddress?: InputMaybe<SortOrder>
  id?: InputMaybe<SortOrder>
  isCreator?: InputMaybe<SortOrder>
  name?: InputMaybe<SortOrder>
  schemaId?: InputMaybe<SortOrder>
  time?: InputMaybe<SortOrder>
}

export type SchemaNameOrderByWithRelationInput = {
  attesterAddress?: InputMaybe<SortOrder>
  id?: InputMaybe<SortOrder>
  isCreator?: InputMaybe<SortOrder>
  name?: InputMaybe<SortOrder>
  schema?: InputMaybe<SchemaOrderByWithRelationInput>
  schemaId?: InputMaybe<SortOrder>
  time?: InputMaybe<SortOrder>
}

export enum SchemaNameScalarFieldEnum {
  AttesterAddress = 'attesterAddress',
  Id = 'id',
  IsCreator = 'isCreator',
  Name = 'name',
  SchemaId = 'schemaId',
  Time = 'time',
}

export type SchemaNameScalarWhereInput = {
  AND?: InputMaybe<Array<SchemaNameScalarWhereInput>>
  NOT?: InputMaybe<Array<SchemaNameScalarWhereInput>>
  OR?: InputMaybe<Array<SchemaNameScalarWhereInput>>
  attesterAddress?: InputMaybe<StringFilter>
  id?: InputMaybe<StringFilter>
  isCreator?: InputMaybe<BoolFilter>
  name?: InputMaybe<StringFilter>
  schemaId?: InputMaybe<StringFilter>
  time?: InputMaybe<IntFilter>
}

export type SchemaNameScalarWhereWithAggregatesInput = {
  AND?: InputMaybe<Array<SchemaNameScalarWhereWithAggregatesInput>>
  NOT?: InputMaybe<Array<SchemaNameScalarWhereWithAggregatesInput>>
  OR?: InputMaybe<Array<SchemaNameScalarWhereWithAggregatesInput>>
  attesterAddress?: InputMaybe<StringWithAggregatesFilter>
  id?: InputMaybe<StringWithAggregatesFilter>
  isCreator?: InputMaybe<BoolWithAggregatesFilter>
  name?: InputMaybe<StringWithAggregatesFilter>
  schemaId?: InputMaybe<StringWithAggregatesFilter>
  time?: InputMaybe<IntWithAggregatesFilter>
}

export type SchemaNameSumAggregate = {
  __typename?: 'SchemaNameSumAggregate'
  time?: Maybe<Scalars['Int']>
}

export type SchemaNameSumOrderByAggregateInput = {
  time?: InputMaybe<SortOrder>
}

export type SchemaNameUpdateInput = {
  attesterAddress?: InputMaybe<StringFieldUpdateOperationsInput>
  id?: InputMaybe<StringFieldUpdateOperationsInput>
  isCreator?: InputMaybe<BoolFieldUpdateOperationsInput>
  name?: InputMaybe<StringFieldUpdateOperationsInput>
  schema?: InputMaybe<SchemaUpdateOneRequiredWithoutSchemaNamesNestedInput>
  time?: InputMaybe<IntFieldUpdateOperationsInput>
}

export type SchemaNameUpdateManyMutationInput = {
  attesterAddress?: InputMaybe<StringFieldUpdateOperationsInput>
  id?: InputMaybe<StringFieldUpdateOperationsInput>
  isCreator?: InputMaybe<BoolFieldUpdateOperationsInput>
  name?: InputMaybe<StringFieldUpdateOperationsInput>
  time?: InputMaybe<IntFieldUpdateOperationsInput>
}

export type SchemaNameUpdateManyWithWhereWithoutSchemaInput = {
  data: SchemaNameUpdateManyMutationInput
  where: SchemaNameScalarWhereInput
}

export type SchemaNameUpdateManyWithoutSchemaNestedInput = {
  connect?: InputMaybe<Array<SchemaNameWhereUniqueInput>>
  connectOrCreate?: InputMaybe<Array<SchemaNameCreateOrConnectWithoutSchemaInput>>
  create?: InputMaybe<Array<SchemaNameCreateWithoutSchemaInput>>
  createMany?: InputMaybe<SchemaNameCreateManySchemaInputEnvelope>
  delete?: InputMaybe<Array<SchemaNameWhereUniqueInput>>
  deleteMany?: InputMaybe<Array<SchemaNameScalarWhereInput>>
  disconnect?: InputMaybe<Array<SchemaNameWhereUniqueInput>>
  set?: InputMaybe<Array<SchemaNameWhereUniqueInput>>
  update?: InputMaybe<Array<SchemaNameUpdateWithWhereUniqueWithoutSchemaInput>>
  updateMany?: InputMaybe<Array<SchemaNameUpdateManyWithWhereWithoutSchemaInput>>
  upsert?: InputMaybe<Array<SchemaNameUpsertWithWhereUniqueWithoutSchemaInput>>
}

export type SchemaNameUpdateWithWhereUniqueWithoutSchemaInput = {
  data: SchemaNameUpdateWithoutSchemaInput
  where: SchemaNameWhereUniqueInput
}

export type SchemaNameUpdateWithoutSchemaInput = {
  attesterAddress?: InputMaybe<StringFieldUpdateOperationsInput>
  id?: InputMaybe<StringFieldUpdateOperationsInput>
  isCreator?: InputMaybe<BoolFieldUpdateOperationsInput>
  name?: InputMaybe<StringFieldUpdateOperationsInput>
  time?: InputMaybe<IntFieldUpdateOperationsInput>
}

export type SchemaNameUpsertWithWhereUniqueWithoutSchemaInput = {
  create: SchemaNameCreateWithoutSchemaInput
  update: SchemaNameUpdateWithoutSchemaInput
  where: SchemaNameWhereUniqueInput
}

export type SchemaNameWhereInput = {
  AND?: InputMaybe<Array<SchemaNameWhereInput>>
  NOT?: InputMaybe<Array<SchemaNameWhereInput>>
  OR?: InputMaybe<Array<SchemaNameWhereInput>>
  attesterAddress?: InputMaybe<StringFilter>
  id?: InputMaybe<StringFilter>
  isCreator?: InputMaybe<BoolFilter>
  name?: InputMaybe<StringFilter>
  schema?: InputMaybe<SchemaRelationFilter>
  schemaId?: InputMaybe<StringFilter>
  time?: InputMaybe<IntFilter>
}

export type SchemaNameWhereUniqueInput = {
  id?: InputMaybe<Scalars['String']>
}

export type SchemaOrderByWithAggregationInput = {
  _avg?: InputMaybe<SchemaAvgOrderByAggregateInput>
  _count?: InputMaybe<SchemaCountOrderByAggregateInput>
  _max?: InputMaybe<SchemaMaxOrderByAggregateInput>
  _min?: InputMaybe<SchemaMinOrderByAggregateInput>
  _sum?: InputMaybe<SchemaSumOrderByAggregateInput>
  creator?: InputMaybe<SortOrder>
  id?: InputMaybe<SortOrder>
  index?: InputMaybe<SortOrder>
  resolver?: InputMaybe<SortOrder>
  revocable?: InputMaybe<SortOrder>
  schema?: InputMaybe<SortOrder>
  time?: InputMaybe<SortOrder>
  txid?: InputMaybe<SortOrder>
}

export type SchemaOrderByWithRelationInput = {
  attestations?: InputMaybe<AttestationOrderByRelationAggregateInput>
  creator?: InputMaybe<SortOrder>
  id?: InputMaybe<SortOrder>
  index?: InputMaybe<SortOrder>
  resolver?: InputMaybe<SortOrder>
  revocable?: InputMaybe<SortOrder>
  schema?: InputMaybe<SortOrder>
  schemaNames?: InputMaybe<SchemaNameOrderByRelationAggregateInput>
  time?: InputMaybe<SortOrder>
  txid?: InputMaybe<SortOrder>
}

export type SchemaRelationFilter = {
  is?: InputMaybe<SchemaWhereInput>
  isNot?: InputMaybe<SchemaWhereInput>
}

export enum SchemaScalarFieldEnum {
  Creator = 'creator',
  Id = 'id',
  Index = 'index',
  Resolver = 'resolver',
  Revocable = 'revocable',
  Schema = 'schema',
  Time = 'time',
  Txid = 'txid',
}

export type SchemaScalarWhereWithAggregatesInput = {
  AND?: InputMaybe<Array<SchemaScalarWhereWithAggregatesInput>>
  NOT?: InputMaybe<Array<SchemaScalarWhereWithAggregatesInput>>
  OR?: InputMaybe<Array<SchemaScalarWhereWithAggregatesInput>>
  creator?: InputMaybe<StringWithAggregatesFilter>
  id?: InputMaybe<StringWithAggregatesFilter>
  index?: InputMaybe<StringWithAggregatesFilter>
  resolver?: InputMaybe<StringWithAggregatesFilter>
  revocable?: InputMaybe<BoolWithAggregatesFilter>
  schema?: InputMaybe<StringWithAggregatesFilter>
  time?: InputMaybe<IntWithAggregatesFilter>
  txid?: InputMaybe<StringWithAggregatesFilter>
}

export type SchemaSumAggregate = {
  __typename?: 'SchemaSumAggregate'
  time?: Maybe<Scalars['Int']>
}

export type SchemaSumOrderByAggregateInput = {
  time?: InputMaybe<SortOrder>
}

export type SchemaUpdateInput = {
  attestations?: InputMaybe<AttestationUpdateManyWithoutSchemaNestedInput>
  creator?: InputMaybe<StringFieldUpdateOperationsInput>
  id?: InputMaybe<StringFieldUpdateOperationsInput>
  index?: InputMaybe<StringFieldUpdateOperationsInput>
  resolver?: InputMaybe<StringFieldUpdateOperationsInput>
  revocable?: InputMaybe<BoolFieldUpdateOperationsInput>
  schema?: InputMaybe<StringFieldUpdateOperationsInput>
  schemaNames?: InputMaybe<SchemaNameUpdateManyWithoutSchemaNestedInput>
  time?: InputMaybe<IntFieldUpdateOperationsInput>
  txid?: InputMaybe<StringFieldUpdateOperationsInput>
}

export type SchemaUpdateManyMutationInput = {
  creator?: InputMaybe<StringFieldUpdateOperationsInput>
  id?: InputMaybe<StringFieldUpdateOperationsInput>
  index?: InputMaybe<StringFieldUpdateOperationsInput>
  resolver?: InputMaybe<StringFieldUpdateOperationsInput>
  revocable?: InputMaybe<BoolFieldUpdateOperationsInput>
  schema?: InputMaybe<StringFieldUpdateOperationsInput>
  time?: InputMaybe<IntFieldUpdateOperationsInput>
  txid?: InputMaybe<StringFieldUpdateOperationsInput>
}

export type SchemaUpdateOneRequiredWithoutAttestationsNestedInput = {
  connect?: InputMaybe<SchemaWhereUniqueInput>
  connectOrCreate?: InputMaybe<SchemaCreateOrConnectWithoutAttestationsInput>
  create?: InputMaybe<SchemaCreateWithoutAttestationsInput>
  update?: InputMaybe<SchemaUpdateWithoutAttestationsInput>
  upsert?: InputMaybe<SchemaUpsertWithoutAttestationsInput>
}

export type SchemaUpdateOneRequiredWithoutSchemaNamesNestedInput = {
  connect?: InputMaybe<SchemaWhereUniqueInput>
  connectOrCreate?: InputMaybe<SchemaCreateOrConnectWithoutSchemaNamesInput>
  create?: InputMaybe<SchemaCreateWithoutSchemaNamesInput>
  update?: InputMaybe<SchemaUpdateWithoutSchemaNamesInput>
  upsert?: InputMaybe<SchemaUpsertWithoutSchemaNamesInput>
}

export type SchemaUpdateWithoutAttestationsInput = {
  creator?: InputMaybe<StringFieldUpdateOperationsInput>
  id?: InputMaybe<StringFieldUpdateOperationsInput>
  index?: InputMaybe<StringFieldUpdateOperationsInput>
  resolver?: InputMaybe<StringFieldUpdateOperationsInput>
  revocable?: InputMaybe<BoolFieldUpdateOperationsInput>
  schema?: InputMaybe<StringFieldUpdateOperationsInput>
  schemaNames?: InputMaybe<SchemaNameUpdateManyWithoutSchemaNestedInput>
  time?: InputMaybe<IntFieldUpdateOperationsInput>
  txid?: InputMaybe<StringFieldUpdateOperationsInput>
}

export type SchemaUpdateWithoutSchemaNamesInput = {
  attestations?: InputMaybe<AttestationUpdateManyWithoutSchemaNestedInput>
  creator?: InputMaybe<StringFieldUpdateOperationsInput>
  id?: InputMaybe<StringFieldUpdateOperationsInput>
  index?: InputMaybe<StringFieldUpdateOperationsInput>
  resolver?: InputMaybe<StringFieldUpdateOperationsInput>
  revocable?: InputMaybe<BoolFieldUpdateOperationsInput>
  schema?: InputMaybe<StringFieldUpdateOperationsInput>
  time?: InputMaybe<IntFieldUpdateOperationsInput>
  txid?: InputMaybe<StringFieldUpdateOperationsInput>
}

export type SchemaUpsertWithoutAttestationsInput = {
  create: SchemaCreateWithoutAttestationsInput
  update: SchemaUpdateWithoutAttestationsInput
}

export type SchemaUpsertWithoutSchemaNamesInput = {
  create: SchemaCreateWithoutSchemaNamesInput
  update: SchemaUpdateWithoutSchemaNamesInput
}

export type SchemaWhereInput = {
  AND?: InputMaybe<Array<SchemaWhereInput>>
  NOT?: InputMaybe<Array<SchemaWhereInput>>
  OR?: InputMaybe<Array<SchemaWhereInput>>
  attestations?: InputMaybe<AttestationListRelationFilter>
  creator?: InputMaybe<StringFilter>
  id?: InputMaybe<StringFilter>
  index?: InputMaybe<StringFilter>
  resolver?: InputMaybe<StringFilter>
  revocable?: InputMaybe<BoolFilter>
  schema?: InputMaybe<StringFilter>
  schemaNames?: InputMaybe<SchemaNameListRelationFilter>
  time?: InputMaybe<IntFilter>
  txid?: InputMaybe<StringFilter>
}

export type SchemaWhereUniqueInput = {
  id?: InputMaybe<Scalars['String']>
}

export type ServiceStat = {
  __typename?: 'ServiceStat'
  name: Scalars['String']
  value: Scalars['String']
}

export type ServiceStatCountAggregate = {
  __typename?: 'ServiceStatCountAggregate'
  _all: Scalars['Int']
  name: Scalars['Int']
  value: Scalars['Int']
}

export type ServiceStatCountOrderByAggregateInput = {
  name?: InputMaybe<SortOrder>
  value?: InputMaybe<SortOrder>
}

export type ServiceStatCreateInput = {
  name: Scalars['String']
  value: Scalars['String']
}

export type ServiceStatCreateManyInput = {
  name: Scalars['String']
  value: Scalars['String']
}

export type ServiceStatGroupBy = {
  __typename?: 'ServiceStatGroupBy'
  _count?: Maybe<ServiceStatCountAggregate>
  _max?: Maybe<ServiceStatMaxAggregate>
  _min?: Maybe<ServiceStatMinAggregate>
  name: Scalars['String']
  value: Scalars['String']
}

export type ServiceStatMaxAggregate = {
  __typename?: 'ServiceStatMaxAggregate'
  name?: Maybe<Scalars['String']>
  value?: Maybe<Scalars['String']>
}

export type ServiceStatMaxOrderByAggregateInput = {
  name?: InputMaybe<SortOrder>
  value?: InputMaybe<SortOrder>
}

export type ServiceStatMinAggregate = {
  __typename?: 'ServiceStatMinAggregate'
  name?: Maybe<Scalars['String']>
  value?: Maybe<Scalars['String']>
}

export type ServiceStatMinOrderByAggregateInput = {
  name?: InputMaybe<SortOrder>
  value?: InputMaybe<SortOrder>
}

export type ServiceStatOrderByWithAggregationInput = {
  _count?: InputMaybe<ServiceStatCountOrderByAggregateInput>
  _max?: InputMaybe<ServiceStatMaxOrderByAggregateInput>
  _min?: InputMaybe<ServiceStatMinOrderByAggregateInput>
  name?: InputMaybe<SortOrder>
  value?: InputMaybe<SortOrder>
}

export type ServiceStatOrderByWithRelationInput = {
  name?: InputMaybe<SortOrder>
  value?: InputMaybe<SortOrder>
}

export enum ServiceStatScalarFieldEnum {
  Name = 'name',
  Value = 'value',
}

export type ServiceStatScalarWhereWithAggregatesInput = {
  AND?: InputMaybe<Array<ServiceStatScalarWhereWithAggregatesInput>>
  NOT?: InputMaybe<Array<ServiceStatScalarWhereWithAggregatesInput>>
  OR?: InputMaybe<Array<ServiceStatScalarWhereWithAggregatesInput>>
  name?: InputMaybe<StringWithAggregatesFilter>
  value?: InputMaybe<StringWithAggregatesFilter>
}

export type ServiceStatUpdateInput = {
  name?: InputMaybe<StringFieldUpdateOperationsInput>
  value?: InputMaybe<StringFieldUpdateOperationsInput>
}

export type ServiceStatUpdateManyMutationInput = {
  name?: InputMaybe<StringFieldUpdateOperationsInput>
  value?: InputMaybe<StringFieldUpdateOperationsInput>
}

export type ServiceStatWhereInput = {
  AND?: InputMaybe<Array<ServiceStatWhereInput>>
  NOT?: InputMaybe<Array<ServiceStatWhereInput>>
  OR?: InputMaybe<Array<ServiceStatWhereInput>>
  name?: InputMaybe<StringFilter>
  value?: InputMaybe<StringFilter>
}

export type ServiceStatWhereUniqueInput = {
  name?: InputMaybe<Scalars['String']>
}

export enum SortOrder {
  Asc = 'asc',
  Desc = 'desc',
}

export type StringFieldUpdateOperationsInput = {
  set?: InputMaybe<Scalars['String']>
}

export type StringFilter = {
  contains?: InputMaybe<Scalars['String']>
  endsWith?: InputMaybe<Scalars['String']>
  equals?: InputMaybe<Scalars['String']>
  gt?: InputMaybe<Scalars['String']>
  gte?: InputMaybe<Scalars['String']>
  in?: InputMaybe<Array<Scalars['String']>>
  lt?: InputMaybe<Scalars['String']>
  lte?: InputMaybe<Scalars['String']>
  mode?: InputMaybe<QueryMode>
  not?: InputMaybe<NestedStringFilter>
  notIn?: InputMaybe<Array<Scalars['String']>>
  startsWith?: InputMaybe<Scalars['String']>
}

export type StringWithAggregatesFilter = {
  _count?: InputMaybe<NestedIntFilter>
  _max?: InputMaybe<NestedStringFilter>
  _min?: InputMaybe<NestedStringFilter>
  contains?: InputMaybe<Scalars['String']>
  endsWith?: InputMaybe<Scalars['String']>
  equals?: InputMaybe<Scalars['String']>
  gt?: InputMaybe<Scalars['String']>
  gte?: InputMaybe<Scalars['String']>
  in?: InputMaybe<Array<Scalars['String']>>
  lt?: InputMaybe<Scalars['String']>
  lte?: InputMaybe<Scalars['String']>
  mode?: InputMaybe<QueryMode>
  not?: InputMaybe<NestedStringWithAggregatesFilter>
  notIn?: InputMaybe<Array<Scalars['String']>>
  startsWith?: InputMaybe<Scalars['String']>
}

export type Timestamp = {
  __typename?: 'Timestamp'
  from: Scalars['String']
  id: Scalars['String']
  timestamp: Scalars['Int']
  tree: Scalars['String']
  txid: Scalars['String']
}

export type TimestampAvgAggregate = {
  __typename?: 'TimestampAvgAggregate'
  timestamp?: Maybe<Scalars['Float']>
}

export type TimestampAvgOrderByAggregateInput = {
  timestamp?: InputMaybe<SortOrder>
}

export type TimestampCountAggregate = {
  __typename?: 'TimestampCountAggregate'
  _all: Scalars['Int']
  from: Scalars['Int']
  id: Scalars['Int']
  timestamp: Scalars['Int']
  tree: Scalars['Int']
  txid: Scalars['Int']
}

export type TimestampCountOrderByAggregateInput = {
  from?: InputMaybe<SortOrder>
  id?: InputMaybe<SortOrder>
  timestamp?: InputMaybe<SortOrder>
  tree?: InputMaybe<SortOrder>
  txid?: InputMaybe<SortOrder>
}

export type TimestampCreateInput = {
  from: Scalars['String']
  id: Scalars['String']
  timestamp: Scalars['Int']
  tree?: InputMaybe<Scalars['String']>
  txid: Scalars['String']
}

export type TimestampCreateManyInput = {
  from: Scalars['String']
  id: Scalars['String']
  timestamp: Scalars['Int']
  tree?: InputMaybe<Scalars['String']>
  txid: Scalars['String']
}

export type TimestampGroupBy = {
  __typename?: 'TimestampGroupBy'
  _avg?: Maybe<TimestampAvgAggregate>
  _count?: Maybe<TimestampCountAggregate>
  _max?: Maybe<TimestampMaxAggregate>
  _min?: Maybe<TimestampMinAggregate>
  _sum?: Maybe<TimestampSumAggregate>
  from: Scalars['String']
  id: Scalars['String']
  timestamp: Scalars['Int']
  tree: Scalars['String']
  txid: Scalars['String']
}

export type TimestampMaxAggregate = {
  __typename?: 'TimestampMaxAggregate'
  from?: Maybe<Scalars['String']>
  id?: Maybe<Scalars['String']>
  timestamp?: Maybe<Scalars['Int']>
  tree?: Maybe<Scalars['String']>
  txid?: Maybe<Scalars['String']>
}

export type TimestampMaxOrderByAggregateInput = {
  from?: InputMaybe<SortOrder>
  id?: InputMaybe<SortOrder>
  timestamp?: InputMaybe<SortOrder>
  tree?: InputMaybe<SortOrder>
  txid?: InputMaybe<SortOrder>
}

export type TimestampMinAggregate = {
  __typename?: 'TimestampMinAggregate'
  from?: Maybe<Scalars['String']>
  id?: Maybe<Scalars['String']>
  timestamp?: Maybe<Scalars['Int']>
  tree?: Maybe<Scalars['String']>
  txid?: Maybe<Scalars['String']>
}

export type TimestampMinOrderByAggregateInput = {
  from?: InputMaybe<SortOrder>
  id?: InputMaybe<SortOrder>
  timestamp?: InputMaybe<SortOrder>
  tree?: InputMaybe<SortOrder>
  txid?: InputMaybe<SortOrder>
}

export type TimestampOrderByWithAggregationInput = {
  _avg?: InputMaybe<TimestampAvgOrderByAggregateInput>
  _count?: InputMaybe<TimestampCountOrderByAggregateInput>
  _max?: InputMaybe<TimestampMaxOrderByAggregateInput>
  _min?: InputMaybe<TimestampMinOrderByAggregateInput>
  _sum?: InputMaybe<TimestampSumOrderByAggregateInput>
  from?: InputMaybe<SortOrder>
  id?: InputMaybe<SortOrder>
  timestamp?: InputMaybe<SortOrder>
  tree?: InputMaybe<SortOrder>
  txid?: InputMaybe<SortOrder>
}

export type TimestampOrderByWithRelationInput = {
  from?: InputMaybe<SortOrder>
  id?: InputMaybe<SortOrder>
  timestamp?: InputMaybe<SortOrder>
  tree?: InputMaybe<SortOrder>
  txid?: InputMaybe<SortOrder>
}

export enum TimestampScalarFieldEnum {
  From = 'from',
  Id = 'id',
  Timestamp = 'timestamp',
  Tree = 'tree',
  Txid = 'txid',
}

export type TimestampScalarWhereWithAggregatesInput = {
  AND?: InputMaybe<Array<TimestampScalarWhereWithAggregatesInput>>
  NOT?: InputMaybe<Array<TimestampScalarWhereWithAggregatesInput>>
  OR?: InputMaybe<Array<TimestampScalarWhereWithAggregatesInput>>
  from?: InputMaybe<StringWithAggregatesFilter>
  id?: InputMaybe<StringWithAggregatesFilter>
  timestamp?: InputMaybe<IntWithAggregatesFilter>
  tree?: InputMaybe<StringWithAggregatesFilter>
  txid?: InputMaybe<StringWithAggregatesFilter>
}

export type TimestampSumAggregate = {
  __typename?: 'TimestampSumAggregate'
  timestamp?: Maybe<Scalars['Int']>
}

export type TimestampSumOrderByAggregateInput = {
  timestamp?: InputMaybe<SortOrder>
}

export type TimestampUpdateInput = {
  from?: InputMaybe<StringFieldUpdateOperationsInput>
  id?: InputMaybe<StringFieldUpdateOperationsInput>
  timestamp?: InputMaybe<IntFieldUpdateOperationsInput>
  tree?: InputMaybe<StringFieldUpdateOperationsInput>
  txid?: InputMaybe<StringFieldUpdateOperationsInput>
}

export type TimestampUpdateManyMutationInput = {
  from?: InputMaybe<StringFieldUpdateOperationsInput>
  id?: InputMaybe<StringFieldUpdateOperationsInput>
  timestamp?: InputMaybe<IntFieldUpdateOperationsInput>
  tree?: InputMaybe<StringFieldUpdateOperationsInput>
  txid?: InputMaybe<StringFieldUpdateOperationsInput>
}

export type TimestampWhereInput = {
  AND?: InputMaybe<Array<TimestampWhereInput>>
  NOT?: InputMaybe<Array<TimestampWhereInput>>
  OR?: InputMaybe<Array<TimestampWhereInput>>
  from?: InputMaybe<StringFilter>
  id?: InputMaybe<StringFilter>
  timestamp?: InputMaybe<IntFilter>
  tree?: InputMaybe<StringFilter>
  txid?: InputMaybe<StringFilter>
}

export type TimestampWhereUniqueInput = {
  id?: InputMaybe<Scalars['String']>
}

export type AttestationFragment = {
  __typename?: 'Attestation'
  id: string
  attester: string
  recipient: string
  decodedDataJson: string
  timeCreated: number
  txid: string
}

export type EscrowDelegatesQueryVariables = Exact<{
  schemaId: Scalars['String']
  recipient: Scalars['String']
  attesters: Array<Scalars['String']> | Scalars['String']
}>

export type EscrowDelegatesQuery = {
  __typename?: 'Query'
  attestations: Array<{
    __typename?: 'Attestation'
    id: string
    attester: string
    recipient: string
    decodedDataJson: string
    timeCreated: number
    txid: string
  }>
}

export type PropdatesQueryVariables = Exact<{
  schemaId: Scalars['String']
  recipient: Scalars['String']
}>

export type PropdatesQuery = {
  __typename?: 'Query'
  attestations: Array<{
    __typename?: 'Attestation'
    id: string
    attester: string
    recipient: string
    decodedDataJson: string
    timeCreated: number
    txid: string
  }>
}

export const AttestationFragmentDoc = gql`
  fragment Attestation on Attestation {
    id
    attester
    recipient
    decodedDataJson
    timeCreated
    txid
  }
`
export const EscrowDelegatesDocument = gql`
  query escrowDelegates($schemaId: String!, $recipient: String!, $attesters: [String!]!) {
    attestations(
      where: {
        schemaId: { equals: $schemaId }
        recipient: { equals: $recipient }
        attester: { in: $attesters }
      }
    ) {
      ...Attestation
    }
  }
  ${AttestationFragmentDoc}
`
export const PropdatesDocument = gql`
  query propdates($schemaId: String!, $recipient: String!) {
    attestations(
      where: { schemaId: { equals: $schemaId }, recipient: { equals: $recipient } }
    ) {
      ...Attestation
    }
  }
  ${AttestationFragmentDoc}
`

export type SdkFunctionWrapper = <T>(
  action: (requestHeaders?: Record<string, string>) => Promise<T>,
  operationName: string,
  operationType?: string
) => Promise<T>

const defaultWrapper: SdkFunctionWrapper = (action, _operationName, _operationType) =>
  action()

export function getSdk(
  client: GraphQLClient,
  withWrapper: SdkFunctionWrapper = defaultWrapper
) {
  return {
    escrowDelegates(
      variables: EscrowDelegatesQueryVariables,
      requestHeaders?: Dom.RequestInit['headers']
    ): Promise<EscrowDelegatesQuery> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<EscrowDelegatesQuery>(EscrowDelegatesDocument, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'escrowDelegates',
        'query'
      )
    },
    propdates(
      variables: PropdatesQueryVariables,
      requestHeaders?: Dom.RequestInit['headers']
    ): Promise<PropdatesQuery> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<PropdatesQuery>(PropdatesDocument, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'propdates',
        'query'
      )
    },
  }
}
export type Sdk = ReturnType<typeof getSdk>
