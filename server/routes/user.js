const { request, response, json } = require("express")
const express = require("express")
const db = require("../db")
const utils = require("../utils")
const cryptoJs = require('crypto-js')
const config = require("./config")
const router = express.Router()
const jwt = require('jsonwebtoken')

//POST :: user sign Up
router.post("/user/signup",(request,response)=>{

    const {FirstName,LastName,Email,Mobile,Age,Password} = request.body
    //const encryptedPassword = String(cryptoJs.MD5(Password))
    const statement = `
                        INSERT INTO person(FirstName,LastName,Email,
                          Mobile,Age,Password) VALUES(?,?,?,?,?,?)
    `

    db.pool.query(statement,[FirstName,LastName,Email,Mobile,Age,Password],(error,result)=>{ 

        response.send(utils.createResult(error,result))
    })
})

//GET : All Movie 
router.get("/movie",(request,response)=>{
  
  const statement = `
                      SELECT MovieTitle,MovieLanguage,MovieGenre,ReleseDate,MovieDuration,
                      MovieCertificate,MovieCast,MovieDirector FROM movie;
  `
  db.pool.query(statement,(error,result)=>
  {
      response.send(utils.createResult(error,result))

  })
})

//GET : Get All Theater 
router.get("/theatre",(request,response)=>{
  
  const statement = `

                SELECT t.TheatreName,c.CityName,c.State,
                c.Country,a.AddressLine1,a.PinCode FROM
                theatre t INNER JOIN city c ON t.CityId = c.CityId
                INNER JOIN address a ON t.AddressId = a.AddressId;

  `
  db.pool.query(statement,(error,result)=>
  {
      response.send(utils.createResult(error,result))

  })
})

//DELETE : Delete User Account 
router.delete("/user/account/delete/:PersonId",(request,response)=>{
  const {PersonId} = request.params
  console.log(PersonId)

  const statement = `
                      DELETE FROM person WHERE PersonId = ${PersonId};
  `
  db.pool.query(statement,(error,result)=>
  {
      if(error)
      {
        response.send(error)
        
      }
      else
      {
        response.send(result)
      }

  })
})

//GET : Movie Detail
router.get("/movie/:MovieId",(request,response)=>{

    const {MovieId} = request.params

    const statement = `
                        SELECT MovieId,MovieTitle,MovieLanguage,MovieGenre,ReleseDate,
                        MovieDuration,MovieCertificate,MovieCast,
                        MovieDirector FROM movie Where MovieId = ${MovieId};
    `
    db.pool.query(statement,(error,result)=>
    {
      console.log(result)
        response.send(utils.createResult(error,result))

    })
})

//GET :Get All the Theater Of a perticular city
  router.get('/theatre/:CityId',(request, response) => {
    
    const {CityId} = request.params
  
    const statement = `
                       SELECT TheatreName FROM theatre  WHERE CityId = ${CityId};
    `
  db.pool.query(statement,(error,result)=>{
    response.send(utils.createResult(error,result))
  })
  })

  //GET : ALL City
  router.get("/city",(request, response) => {

    const statement = `
                        SELECT CityId,CityName From city;
    `
  db.pool.query(statement,(error,result)=>{
    response.send(utils.createResult(error,result))
  })
  })

  //GET : Search Movie By MovieTilte
  router.get('/search/movie/:text', async (request, response) => {
    const { text } = request.params
  
    const statement = `
                      SELECT MovieTitle,MovieLanguage,MovieGenre,ReleseDate,
                      MovieDuration,MovieCertificate,MovieCast,MovieDirector
                      FROM movie WHERE MovieTitle like '%${text}%'
      `
    const [result] = await db.poolAsync.execute(statement)
    response.send(utils.createSuccess(result))
  })

  //GET : Search Movie By Language
  router.get('/search/language/:text', async (request, response) => {
    const { text } = request.params
  
    const statement = `
                      SELECT MovieTitle,MovieLanguage,MovieGenre,ReleseDate,
                      MovieDuration,MovieCertificate,MovieCast,MovieDirector 
                      FROM movie WHERE MovieLanguage like '%${text}%'
      `
    const [result] = await db.poolAsync.execute(statement)
    response.send(utils.createSuccess(result))
  })

  //GET : Search Movie By Genere
  router.get('/search/genre/:text', async (request, response) => {
    const { text } = request.params
  
    const statement = `
                        SELECT MovieTitle,MovieLanguage,MovieGenre,ReleseDate
                        ,MovieDuration,MovieCertificate,MovieCast,
                        MovieDirector FROM movie WHERE MovieGenre like '%${text}%'
      `
    const [result] = await db.poolAsync.execute(statement)
    response.send(utils.createSuccess(result))
  })

  //GET : Search City By CityName 
  router.get('/search/city/:text', async (request, response) => {
    const { text } = request.params
  
    const statement = `
                        SELECT CityName,State,Country FROM city WHERE CityName like '%${text}%'
      `
    const [result] = await db.poolAsync.execute(statement)
    response.send(utils.createSuccess(result))
  })

  // //POST : Login
  // router.post('/user/login', (request, response) => {
  //   const { Email, Password } = request.body
  //   const statement = `
  //                       SELECT 
  //                       FirstName,LastName,Email,Mobile,Age
  //                       FROM person
  //                       WHERE
  //                       Email = '${Email}' AND 
  //                       Password = '${Password}'
  //   `
  //   db.pool.query(statement, (error, users) => {
  //     console.log(Email)
  //     console.log(Password)
  //     if (error) {
  //       response.send(error)
  //     } else {
      
  //       if (users.length === 0) {
  //         response.send("error")
  //       } else {
  //         const user = users[0]
  //         response.send(
  //           {
  //           FirstName: user['FirstName'],
  //           LastName: user['LastName'],
  //           Email: user['Email'],
  //           Mobile: user['Mobile'],
  //           Age: user['Age']
  //         })
  //       }
  //     }
  //   })
  // })

  router.post('/user/login', (request, response) => {
    const {Email,Password} = request.body
  console.log(Email)
  console.log(Password)
    //const encryptedPassword = String(cryptoJs.MD5(Password))
   // console.log(encryptedPassword)
    const statement = `
        SELECT PersonId, FirstName, LastName, Email 
        FROM person
        WHERE Email = ? and Password = ?
      `
    db.pool.query(statement, [Email,Password], (error, users) => {
      console.log(`${Email}`)
      console.log(`${Password}`)
      const result = {}
      if (error) {
        result['status'] = 'error'
        result['error'] = error
      } else if (users.length === 0) {
        result['status'] = 'error'
        result['error'] = 'user not found'
      } else {
        // get the first user from the array
        const user = users[0]
        const payload = { PersonId: user['PersonId'] }
        const token = jwt.sign(payload, config.secret)
  
        result['status'] = 'success'
        result['data'] = {
          PersonId: user['PersonId'],
          name: `${user['FirstName']} ${user['LastName']}`,
          Email: user['Email'],
          token,
        }
      }
      console.log(`${JSON.stringify(result)}`)
      console.log(`${JSON.stringify(result.data)}`)
      console.log(`${JSON.stringify(result.data)}`)

      response.send(JSON.stringify(result))
    })
  })

  //GET : VIEW USER PROFILE
  router.get('/user/profile/:PersonId',(request, response) => {

    const { PersonId } = request.params
  
    const statement = `
                        SELECT FirstName,LastName,Email,Mobile,Age FROM person WHERE PersonId = ${PersonId};
    `

    db.pool.query(statement,(error,result)=>{

      response.send(utils.createSuccess(result))

    })
  })

   //PUT : UPDATE USER PROFILE
   router.put('/user/update/:PersonId',(request, response) => {

    const { PersonId } = request.params
    console.log(PersonId)

    const {FirstName,LastName,Email,Mobile,Age} = request.body
console.log(`${FirstName} ${LastName} ${Email} ${Mobile} ${Age}`)
    const statement = `
                        UPDATE person
                        SET 
                        FirstName = "${FirstName}",
                        LastName = "${LastName}",
                        Email = "${Email}",
                        Mobile = "${Mobile}",
                        Age = ${Age}
                        WHERE PersonId = ${PersonId};
    `
    db.pool.query(statement,(error,result) =>{

     
        if(error)
        {
          response.send(error)
          
        }
        else
        {
          response.send(result)
        }
      

    })
  })

  //GET : Get All The Shows in Perticular Location
  router.get("/shows/location/:CityId",(request,response)=>{

    const {CityId} = request.params

    const statement = `
                      SELECT TheatreId,MovieId,StartTime AS 
                      ShowStartTime,EndTime AS ShowEndTime,ScreenId
                      AS SrreenNumber FROM shows WHERE CityId = ${CityId};
    `
    db.pool.query(statement,(error,result)=>{
      response.send(utils.createResult(error,result))
    })
  })

  //GET : All The Shows
  router.get("/shows/:CityId",(request,response)=>
  {
    const {CityId} = request.params
    const statement = `
    SELECT t.TheatreName,m.MovieTitle,m.MovieLanguage,m.MovieGenre,m.MovieCertificate,
    m.MovieDuration,s.StartTime,s.MovieId,s.ShowId,s.TheatreId,s.ScreenId FROM Theatre t INNER JOIN shows s ON s.TheatreId
     = t.TheatreId INNER JOIN Movie m ON s.TheatreId = m.TheatreId where s.CityId = ${CityId};
    `
    db.pool.query(statement,(error,result)=>{
      response.send(utils.createResult(error,result))
    })
  })
  // SELECT TheatreName,MovieTitle,MovieLanguage,MovieGenre,MovieCertificate,
  // MovieDuration,StartTime FROM Theatre INNER JOIN shows  ON TheatreId
  //  = TheatreId INNER JOIN Movie  ON TheatreId = TheatreId where CityId = 1;

  //POST : Book an Show//
  router.post("/book/show",(request,response)=>
  {
    const {TotalSeat,BookingStatus,PersonId,ShowId,TheatreId} = request.body
    const statement = `
                      INSERT INTO booking(TotalSeat,BookingStatus,PersonId,ShowId,TheatreId) VALUES (?,?,?,?,?);
    `
    db.pool.query(statement,[TotalSeat,BookingStatus,PersonId,ShowId,TheatreId],(error,result)=>{
      response.send(utils.createResult(error,result))
    })
  })

  //GET : Booking History
  router.get("/booking/history/:PersonId",(request,response)=>{
    const {PersonId} = request.params

    const statement = `
                    SELECT BookingId,BookingStatus,TotalSeat,CreatedOn AS BookingDateandTime
                    FROM Booking WHERE PersonId = ${PersonId};
    `
    db.pool.query(statement,(error,result)=>{
      response.send(utils.createResult(error,result))
    })
  })

  //GET : Booking id
  router.get("/booking/id/:ShowId",(request,response)=>{
    const {ShowId} = request.params

    const statement = `
                    SELECT BookingId FROM Booking WHERE ShowId = ${ShowId};
    `
    db.pool.query(statement,(error,result)=>{
      response.send(utils.createResult(error,result))
    })
  })

  //get poster
  router.get("/img/:MovieId",(request,response)=>{
    const {MovieId} = request.params

    const statement = `
                    SELECT Poster FROM Movie WHERE MovieId = ${MovieId};
    `
    db.pool.query(statement,(error,result)=>{
      response.send(utils.createResult(error,result))
    })
  })

  //GET : Payment History
  router.get("/payment/history/:PersonId",(request,response)=>{
    const {PersonId} = request.params

    const statement = `
                    SELECT PaymentId,PaymentStatus,PaymentAmount,Taxes,MovieId,BookingId,ScreenId,TheatreId,DateAndTime
                    FROM Payment WHERE PersonId = ${PersonId};
    `
    db.pool.query(statement,(error,result)=>{
      if(error)
      {
        response.send(error)
      }
      else
      {
        response.send(result)
      }
    })
  })

  //POST : Payments
  router.post('/payment',(request,response)=>{
    const {BookingId,PaymentStatus,PaymentAmount,PersonId,MovieId,ScreenId,TheatreId} = request.body
    const statement = `
                      INSERT INTO payment (BookingId,PaymentStatus,PaymentAmount,
                      PersonId,MovieId,ScreenId,TheatreId)VALUES (?,?,?,?,?,?,?);
    `
    db.pool.query(statement,[BookingId,PaymentStatus,PaymentAmount,PersonId,MovieId,ScreenId,TheatreId],(error,result)=>{
      response.send(utils.createResult(error,result))
    })
  })

  //PUT : Reset Password
  router.put('/user/reset/password/:PersonId',(request,response)=>{
    const {PersonId} = request.params
    const {Password} = request.body

    const statement = `
                        UPDATE person
                        SET
                        Password = "${Password}"
                        WHERE
                        PersonId = ${PersonId}
      
    `

    db.pool.query(statement,(error,result)=>{
      response.send(utils.createResult(error,result))
    })
  })

   //PUT : forget Password
   router.post('/user/forget-password',(request,response)=>{

    const {Email,Password} = request.body

    const statement = `
                        UPDATE person
                        SET
                        Password = "${Password}"
                        WHERE
                        Email = ${Email}
      
    `

    db.pool.query(statement,(error,result)=>{
      response.send(utils.createResult(error,result))
    })
  })

module.exports = router