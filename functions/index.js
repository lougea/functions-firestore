const functions = require('firebase-functions')
const admin = require('firebase-admin')
const axios = require('axios')

admin.initializeApp()

exports.daySince = functions.https.onRequest(async (req, res) => {
  const date = req.query.date
  const result = parse(date, 'dd/MM/yyyy', new Date())
  console.log(result)
  const result2 = differenceInDays(new Date(), result)
  res.status(200).send(`${result2}`)
})

exports.dinero = functions.https.onRequest(async (req, res) => {
  const price = parseInt(req.query.price)
  console.log(price)
  const result = Dinero({ amount: price }).multiply(4)
  console.log(result)
  res.send(result)
})

exports.searchUnsplash = functions.https.onRequest(async (req, res) => {
  try {
    const CLIENT_ID =
      'cf758c425a3fb41422f213728fc6bb6411994446f700c32b1ae70e3639d1effd'
    const PER_PAGE = 20
    const search = req.query.search

    const response = await axios.get(
      'https://api.unsplash.com/search/photos/',
      {
        params: {
          query: search,
          per_page: PER_PAGE,
          page: 0
        },
        headers: {
          Authorization: `Client-ID ${CLIENT_ID}`
        }
      }
    )
    const unsplashs = response.data.results
    res.json(unsplashs)
  } catch (error) {
    console.error(error.message)
  }
})
