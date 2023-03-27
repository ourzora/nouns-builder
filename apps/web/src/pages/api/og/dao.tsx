import { ImageResponse } from '@vercel/og'
import { getFetchableUrl } from 'ipfs-service/src/gateway'
import { NextRequest } from 'next/server'

import { DaoOgMetadata } from 'src/data/contract/requests/getDaoOgMetadata'
import NogglesLogo from 'src/layouts/assets/builder-framed.svg'

export const config = {
  runtime: 'edge',
}

const ptRootRegular = fetch(
  new URL('public/fonts/pt-root-ui_regular.ttf', import.meta.url)
).then((res) => res.arrayBuffer())

const ptRootMedium = fetch(
  new URL('public/fonts/pt-root-ui_medium.ttf', import.meta.url)
).then((res) => res.arrayBuffer())

const ptRootBold = fetch(
  new URL('public/fonts/pt-root-ui_bold.ttf', import.meta.url)
).then((res) => res.arrayBuffer())

export default async function handler(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const rawData = searchParams.get('data')

  if (!rawData) return new Response(undefined, { status: 400 })

  const data: DaoOgMetadata = JSON.parse(rawData)

  const [ptRootRegularData, ptRootMediumData, ptRootBoldData] = await Promise.all([
    ptRootRegular,
    ptRootMedium,
    ptRootBold,
  ])

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
            src={getFetchableUrl(data.daoImage)}
            style={{
              height: '180px',
              width: '180px',
              borderRadius: '9999px',
              marginRight: '50px',
              objectFit: 'cover',
              objectPosition: 'center',
            }}
          />
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <p style={{ fontSize: '28px', fontWeight: 700 }}>{data.name}</p>
            <div style={{ display: 'flex' }}>
              {daoDataWithLabel('Treasury', data.treasuryBalance)}
              {daoDataWithLabel('Owners', data.ownerCount.toString())}
              {daoDataWithLabel('Total supply', data.totalSupply || '0')}
              {daoDataWithLabel('Proposals', data.proposalCount.toString())}
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
