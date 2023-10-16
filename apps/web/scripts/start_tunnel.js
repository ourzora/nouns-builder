require('dotenv').config({ path: '.env.local' })

const { spawn } = require('child_process')
const subdomain = process.env.TUNNEL_SUBDOMAIN

const lt = spawn('./node_modules/.bin/lt', ['--port', '3000', '--subdomain', subdomain])

lt.stdout.pipe(process.stdout)
lt.stderr.pipe(process.stderr)
