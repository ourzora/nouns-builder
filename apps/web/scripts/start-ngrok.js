require('dotenv').config({ path: '.env.local' })

const ngrok = require('ngrok')

;(async function () {
  try {
    // Specify your authtoken here; you could also store it in an environment variable or a config file
    const authtoken = '2X5Qbw9X0rg4nf1EsdYTEAA0TNu_7LqpzppGaaaDqkwdmuekL'

    // Set your desired custom subdomain
    const subdomain = 'nouns-webhook-test'

    // Connect your ngrok with the authtoken (this is required for reserved domains)
    await ngrok.authtoken(authtoken)

    // Creating the tunnel
    const url = await ngrok.connect({
      addr: 3000, // your local server port
      subdomain: subdomain, // your reserved subdomain
      // Add more options here if required
    })

    console.log('Tunnel Created -> ', url)
    console.log('Tunnel Inspector ->  http://127.0.0.1:4000')
  } catch (error) {
    console.error('Error while connecting Ngrok', error)
  }
})()
