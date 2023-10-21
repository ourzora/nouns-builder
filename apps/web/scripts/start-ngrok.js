require('dotenv').config({ path: '.env.local' })

const ngrok = require('ngrok')

;(async function () {
  try {
    const authtoken = process.env.NGROK_AUTHTOKEN
    const subdomain = process.env.TUNNEL_SUBDOMAIN

    await ngrok.authtoken(authtoken)

    const url = await ngrok.connect({
      addr: 3000,
      subdomain: subdomain,
    })

    console.log('Tunnel Created -> ', url)
    console.log('Tunnel Inspector ->  http://127.0.0.1:4000')
  } catch (error) {
    console.error('Error while connecting Ngrok', error)
  }
})()
