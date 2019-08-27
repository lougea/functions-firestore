const functions = require('firebase-functions')
const admin = require('firebase-admin')
const axios = require('axios')

admin.initializeApp()

// exports.daySince = functions.https.onRequest(async (req, res) => {
//   const date = req.query.date
//   const result = parse(date, 'dd/MM/yyyy', new Date())
//   console.log(result)
//   const result2 = differenceInDays(new Date(), result)
//   res.status(200).send(`${result2}`)
// })

// exports.dinero = functions.https.onRequest(async (req, res) => {
//   const price = parseInt(req.query.price)
//   console.log(price)
//   const result = Dinero({ amount: price }).multiply(4)
//   console.log(result)
//   res.send(result)
// })

exports.searchUnsplash = functions.https.onRequest(async (req, res) => {
  try {
    // Unsplash promise
    const CLIENT_ID_unsplash =
      'cf758c425a3fb41422f213728fc6bb6411994446f700c32b1ae70e3639d1effd'
    const PER_PAGE = 20
    const search = req.query.search
    const promise_unsplash = axios.get(
      'https://api.unsplash.com/search/photos/',
      {
        params: {
          query: search,
          per_page: PER_PAGE,
          page: 0
        },
        headers: {
          Authorization: `Client-ID ${CLIENT_ID_unsplash}`
        }
      }
    )

    // giphy promise
    const CLIENT_ID_giphy = 'wpnc5s0fpBBS2FGoripFkdZEPb91HFmY'
    const promise_giphy = axios.get('https://api.giphy.com/v1/gifs/search', {
      params: {
        api_key: CLIENT_ID_giphy,
        q: req.query.search
      }
    })

    // Pexels promise
    const CLIENT_ID_pexels =
      '563492ad6f91700001000001afd9c86217454e1a8f42c752d0179a74'
    const PER_PAGE_pexels = 20
    const query = req.query.search
    const promise_pexels = axios.get('https://api.pexels.com/v1/search', {
      params: {
        query,
        per_page: PER_PAGE_pexels,
        page: 1
      },
      headers: {
        Authorization: CLIENT_ID_pexels
      }
    })

    const [res_giphy, res_pexels, res_unsplash] = await Promise.all([
      promise_giphy,
      promise_pexels,
      promise_unsplash
    ])

    // Unsplash response
    const unsplashs = res_unsplash.data.results
    const unsplashsJson = unsplashs.map((photo) => {
      return {
        id: photo.id,
        width: photo.width,
        height: photo.height,
        urls: { thumb: photo.urls.thumb, full: photo.urls.full }
      }
    })
    // Giphy response

    const giphy = res_giphy.data.data
    const giphyJson = giphy.map((picture) => {
      return {
        id: picture.id,
        width: picture.images.fixed_height_still.width,
        height: picture.images.fixed_height_still.height,
        urls: {
          thumb: picture.images.fixed_height_still.url,
          full: picture.images.original.mp4
        }
      }
    })
    // Pexels response

    const pexels = res_pexels.data.photos

    const pexelsJson = pexels.map((picture) => {
      return {
        id: picture.id,
        width: picture.width,
        height: picture.height,
        urls: {
          thumb: picture.src.small,
          full: picture.src.original
        }
      }
    })

    ///////////////////////

    const allJson = [...unsplashsJson, ...giphyJson, ...pexelsJson]

    res.send(allJson)
  } catch (error) {
    console.error(error.message)
  }
})
