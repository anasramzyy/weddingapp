// import authRouter from './modules/user.router.js'
import mohafzaRouter from './modules/mohafza/mohafza.router.js'
import morgan from 'morgan'


export const appRouter = (app, express) => {

  // morgan 
  if (process.env.NODE_ENV === "dev" ) {
    app.use(morgan("common"))
  }
  
  // Global Middleware 
  app.use(express.json())
  // Routes

  // auth
  // app.use("/auth", authRouter)

  // category
  app.use("/mohafza", mohafzaRouter)

 
  
  // not found page router
  app.all("*", (req, res, next) => {
    return next(new Error('Page Not Found', {cause: 404}))
  })

  // global error handler
  app.use((error, req, res, next) => {
    return res.status(error.cause || 500).json({success: false, message: error.message, stack: error.stack})
  })
}


// import morgan from 'morgan'

// export const appRouter = (app, express) => {

//   // morgan 
//   if (process.env.NODE_ENV === "dev" ) {
//     app.use(morgan("common"))
//   }
  
//   // Global Middleware 
//   app.use(express.json())
//   // Routes

//   // app.use("/category", categoryRouter)


//   // not found page router
//   app.all("*", (req, res, next) => {
//     return next(new Error('Page Not Found', {cause: 404}))
//   })

//   // global error handler
//   app.use((error, req, res, next) => {
//     return res.status(error.cause || 500).json({success: false, message: error.message, stack: error.stack})
//   })
// }