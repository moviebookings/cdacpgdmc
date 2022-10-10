const express = require("express")
const jwt = require('jsonwebtoken')
const cors = require("cors")
const utils = require("./utils")
const app = express()

app.use(cors())

app.use(express.json())
// app.use((request, response, next) => {
//         if (request.url === '/user/login' || request.url === '/user/signup') {
//           next()
//         } else {
//           const token = request.headers['token']
//           if (!token || token.length === 0) {
//             response.send(utils.createResult('token is missing'))
//           } else {
//             try {
//               // extract the user id from token
//               const payload = jwt.verify(token, config.secret)
      
//               // add the userid to the request so that
//               // all the other requests can use it
//               request.PersonId = payload.PersonId
      
//               next()
//             } catch (ex) {
//               response.send(utils.createResult('invalid token'))
//             }
//           }
//         }
//       })
const userRouter = require("./routes/user")
app.use(userRouter)

//app.use(express.json())
app.listen(4000,'0.0.0.0',()=>{
        console.log("Server Started Listening On PORT : 4000")
})