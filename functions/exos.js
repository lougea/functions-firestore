const functions = require('firebase-functions')
const admin = require('firebase-admin')
// const importFrom = require('import-from')
var differenceInDays = require('date-fns/differenceInDays')
var parse = require('date-fns/parse')
const Dinero = require('dinero.js')
admin.initializeApp()

// exports.helloWorld = functions.https.onRequest(async (req, res) => {
//   var result = differenceInDays(new Date(), new Date(1992, 4, 23, 23, 59))
//   res.send(`${result}`)
// })

exports.daySince = functions.https.onRequest(async (req, res) => {
  const date = req.query.date
  const result = parse(date, 'dd/MM/yyyy', new Date())
  console.log(result)
  const result2 = differenceInDays(new Date(), result)
  res.status(200).send(`${result2}`)
})
///////dinero
exports.dinero = functions.https.onRequest(async (req, res) => {
  const price = parseInt(req.query.price)
  console.log(price)
  const result = Dinero({ amount: price }).multiply(4)
  console.log(result)
  res.send(result)
})

exports.dinero = functions.https.onRequest(async (req, res) => {
  const price = parseInt(req.query.price)

  const result = Dinero({ amount: price })
    .setLocale('fr-FR')
    .toFormat('$0,0')

  // const result2 = Dinero({ amount: price })
  //   .setLocale('fr-FR')
  //   .toFormat('$0,0')

  const result3 = Dinero({ amount: price })
    // .add(Dinero({ amount: price }))
    .multiply(4)
    .setLocale('fr-FR')
    .toFormat('$0,0')

  res.send(`:${price} ${result3}`)
})
