export const PUBLIC_MANAGER_ADDRESS =
  {
    1: '0xd310a3041dfcf14def5ccbc508668974b5da7174',
    5: '0x0E9F3382Cf2508E3bc83248B5b4707FbA86D7Ee0',
  }[process.env.NEXT_PUBLIC_CHAIN_ID || 1] || ''

export const PUBLIC_BUILDER_TOKEN = '0xdf9b7d26c8fc806b1ae6273684556761ff02d422'

export const PUBLIC_BUILDER_ADDRESS =
  {
    1: '0xDC9b96Ea4966d063Dd5c8dbaf08fe59062091B6D', // builder treasury address
    5: '0xc2fff40D3e3468fD85dca6B09e41961edd9381cD',
  }[process.env.NEXT_PUBLIC_CHAIN_ID || 1] || ''

export const PUBLIC_NOUNS_ADDRESS =
  {
    1: '0x0BC3807Ec262cB779b38D65b38158acC3bfedE10', // nouns treasury address
    5: '0x0BC3807Ec262cB779b38D65b38158acC3bfedE10',
  }[process.env.NEXT_PUBLIC_CHAIN_ID || 1] || ''

export const NULL_ADDRESS = '0x0000000000000000000000000000000000000000'
