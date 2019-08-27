const functions = require('firebase-functions')
const admin = require('firebase-admin')
const axios = require('axios')

admin.initializeApp()

exports.searchUnsplash = functions.https.onRequest(async (req, res) => {
  try {
    //////////////////////////////// Unsplash
    const CLIENT_ID_unsplash =
      'cf758c425a3fb41422f213728fc6bb6411994446f700c32b1ae70e3639d1effd'
    const PER_PAGE = 20
    const search = req.query.search
    const res_unsplash = await axios.get(
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
    const unsplashs = res_unsplash.data.results
    const unsplashsJson = unsplashs.map((photo) => {
      return {
        id: photo.id,
        width: photo.width,
        height: photo.height,
        urls: { thumb: photo.urls.thumb, full: photo.urls.full }
      }
    })
    ///////////////////////////////////// Giphy
    const CLIENT_ID_giphy = 'wpnc5s0fpBBS2FGoripFkdZEPb91HFmY'
    const res_giphy = await axios.get('https://api.giphy.com/v1/gifs/search', {
      params: {
        api_key: CLIENT_ID_giphy,
        q: req.query.search
      }
    })
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
    //////////////////////////////////////////// Pexels
    const CLIENT_ID_pexels =
      '563492ad6f91700001000001afd9c86217454e1a8f42c752d0179a74'
    const PER_PAGE_pexels = 20
    const query = req.query.search
    const res_pexels = await axios.get('https://api.pexels.com/v1/search', {
      params: {
        query,
        per_page: PER_PAGE_pexels,
        page: 1
      },
      headers: {
        Authorization: CLIENT_ID_pexels
      }
    })
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

    const allJson = [...unsplashsJson, ...pexelsJson]

    res.send(allJson)
  } catch (error) {
    console.error(error.message)
  }
})
