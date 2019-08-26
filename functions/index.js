const functions = require('firebase-functions')
const admin = require('firebase-admin')
// const importFrom = require('import-from')
var differenceInDays = require('date-fns/differenceInDays')
var parse = require('date-fns/parse')
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
