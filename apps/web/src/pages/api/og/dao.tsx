import { ImageResponse } from '@vercel/og'

import NogglesLogo from '../../../../src/layouts/assets/builder-framed.svg'

export const config = {
  runtime: 'edge',
}

const ptRootRegular = fetch(
  new URL('../../../../public/fonts/pt-root-ui_regular.ttf', import.meta.url)
).then((res) => res.arrayBuffer())

const ptRootMedium = fetch(
  new URL('../../../../public/fonts/pt-root-ui_medium.ttf', import.meta.url)
).then((res) => res.arrayBuffer())

const ptRootBold = fetch(
  new URL('../../../../public/fonts/pt-root-ui_bold.ttf', import.meta.url)
).then((res) => res.arrayBuffer())

export default async function handler() {
  const data = {
    name: 'the park dao',
    image:
      'https://nouns.build/_next/image?url=https%3A%2F%2Fipfs.decentralized-content.com%2Fipfs%2Fbafybeibarawmcql724nufftadir52qwj36t7bwycrq7seuajaugxfdriwu%2Fdall__e_2022-09-26_15.05.42_-_golden_gate_park_black_and_white_photo_san_francisco_.png&w=128&q=75',
    treasury: '24.7 ETH',
    owners: '76',
    totalSupply: '159',
    proposals: '19',
  }

  const ptRootRegularData = await ptRootRegular
  const ptRootMediumData = await ptRootMedium
  const ptRootBoldData = await ptRootBold

  console.log('ptRootRegularData', ptRootRegularData)

  const daoDataWithLabel = (label: string, data: string) => {
    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          border: '2px solid #f2f2f2',
          justifyItems: 'center',
          padding: '20px',
          paddingTop: '0px',
          paddingBottom: '0px',
          marginRight: '15px',
          borderRadius: '12px',
        }}
      >
        <p style={{ marginBottom: 10, fontSize: '16px', color: '#808080' }}>{label}</p>
        <p style={{ fontSize: '28px', fontWeight: 700, marginTop: 0 }}>{data}</p>
      </div>
    )
  }

  return new ImageResponse(
    (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          position: 'relative',
          justifyContent: 'space-around',
          backgroundColor: 'white',
          padding: '100px',
          width: '100%',
          height: '100%',
          fontFamily: 'PT Root UI',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            position: 'absolute',
            top: 50,
            left: 95,
          }}
        >
          <NogglesLogo
            fill={'white'}
            width="90"
            style={{ objectFit: 'contain', paddingRight: '2px' }}
            alt="logo"
          />
          <p style={{ marginLeft: '10px', fontWeight: 500 }}>Builder</p>
        </div>
        <div style={{ display: 'flex', position: 'absolute', bottom: 50, right: 95 }}>
          <p style={{ fontSize: '28px', color: '#808080' }}>nouns.build</p>
        </div>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <img
            alt="user image"
            src={data.image}
            style={{ height: '180px', borderRadius: '9999px', marginRight: '50px' }}
          />
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <p style={{ fontSize: '28px', fontWeight: 700 }}>{data.name}</p>
            <div style={{ display: 'flex' }}>
              {daoDataWithLabel('Treasury', data.treasury)}
              {daoDataWithLabel('Owners', data.owners)}
              {daoDataWithLabel('Total supply', data.totalSupply)}
              {daoDataWithLabel('Proposals', data.proposals)}
            </div>
          </div>
        </div>
      </div>
    ),
    {
      fonts: [
        {
          name: 'PT Root UI',
          data: ptRootRegularData,
          style: 'normal',
          weight: 400,
        },
        {
          name: 'PT Root UI',
          data: ptRootMediumData,
          style: 'normal',
          weight: 500,
        },
        {
          name: 'PT Root UI',
          data: ptRootBoldData,
          style: 'normal',
          weight: 700,
        },
      ],
    }
  )
}
