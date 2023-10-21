// require('dotenv').config({ path: '.env.local' })

// const path = require('path')
// const ltPath = path.resolve(__dirname, 'node_modules', '.bin', 'lt')

// const { spawn } = require('child_process')
// const subdomain = process.env.TUNNEL_SUBDOMAIN
// console.log('process.cwd()', process.cwd())
// const lt = spawn(ltPath, ['--port', '3000', '--subdomain', 'nouns-webhook-test'])
// console.log('lt', lt)

// lt.stdout.pipe(process.stdout)
// lt.stderr.pipe(process.stderr)

// lt.on('error', (err) => {
//   console.error('Failed to start subprocess.', err)
// })
// lt.stdout.on('data', (data) => {
//   console.log(`stdout: ${data}`)
// })

// lt.stderr.on('data', (data) => {
//   console.error(`stderr: ${data}`)
// })

// // Listen for any errors from the streaming
// lt.on('error', (error) => {
//   console.error(`Failed to start subprocess: ${error}`)
// })

// // Handle the closing of the process
// lt.on('close', (code) => {
//   console.log(`child process exited with code ${code}`)
// })

// // Optionally, handle the process exit event
// lt.on('exit', (code) => {
//   console.log(`child process exited with code ${code}`)
// })
const localtunnel = require('localtunnel')

// Load environment variables from .env.local
require('dotenv').config({ path: '.env.local' })

// Read the subdomain from environment variables
const subdomain = process.env.TUNNEL_SUBDOMAIN

console.log('Starting script...') // Initial log to confirm the script execution starts
console.log('Subdomain is:', subdomain) // Log the subdomain to check if it's being loaded

// Function to create a tunnel
async function createTunnel() {
  console.log('Creating tunnel...') // Confirm that the function is called

  try {
    console.log('Attempting to open tunnel...') // Confirm it reaches this point
    const tunnel = await localtunnel({ port: 3000, subdomain })

    // Log the public URL for your tunnel
    console.log('Tunnel URL:', tunnel.url)

    tunnel.on('close', () => {
      // Respond to the tunnel being closed
      console.log('Tunnel has been closed.')
    })
  } catch (error) {
    // Handle errors when creating the tunnel
    console.error('Error occurred while attempting to create tunnel:', error)
  }
}

// Create the tunnel
createTunnel()
