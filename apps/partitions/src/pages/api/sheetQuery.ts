import { google } from 'googleapis'
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { sheetName } = req.query

  if (!sheetName) {
    throw new Error('sheetName is required')
  }

  const sheets = google.sheets('v4')

  const clientEmail = process.env.GOOGLE_CLIENT_EMAIL
  const privateKey = process.env.GOOGLE_PRIVATE_KEY

  if (!clientEmail || !privateKey) {
    throw new Error('Missing Google credentials!')
  }

  const credentials = {
    client_email: clientEmail,
    private_key: privateKey.replace(/\\n/g, '\n'),
  }
  const jwt = new google.auth.JWT(
    credentials.client_email,
    undefined,
    credentials.private_key,
    ['https://www.googleapis.com/auth/spreadsheets.readonly']
  )

  try {
    await jwt.authorize()

    const sheetId = process.env.GOOGLE_PROJECT_ID
    const range = `${sheetName}!A1:Z1000`
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: sheetId,
      range: range,
      auth: jwt,
    })

    return res.json(response.data)
  } catch (error) {
    throw error
  }
}
