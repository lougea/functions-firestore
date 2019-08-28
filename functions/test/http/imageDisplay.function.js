const functions = require('firebase-functions')
const axios = require('axios')
const fs = require('fs')
const os = require('os')
const path = require('path')

exports = module.exports = functions.https.onRequest(async (req, res) => {
  const url = req.query.url
  const temp = path.join(os.tmpdir(), 'file.jpg')
  console.log(url)
  const response = await axios({
    url: url,
    method: 'get',
    responseType: 'arraybuffer'
  })
  const file = Buffer.from(response.data)
  fs.writeFileSync(temp, file)
  res.sendFile(temp)
})
