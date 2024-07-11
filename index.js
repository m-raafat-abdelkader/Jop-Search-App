import express from 'express'
import { config } from 'dotenv'
import path from 'path'

import connection_db from './DB/connection.js'
import userRouter from './src/Modules/User/user.routes.js'
import companyRouter from './src/Modules/Company/company.routes.js'
import jobRouter from './src/Modules/Job/job.routes.js'
import { globalResponse } from './src/Middlewares/error-handling.middleware.js'

if(process.env.NODE_ENV === "dev"){
    config({path: path.resolve(".dev.env")})
}

else if(process.env.NODE_ENV === "prod"){
    config({path: path.resolve( ".prod.env")})
}

else {config()}

const PORT = process.env.PORT

const app = express() 


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})


app.use(express.json())

app.use('/user', userRouter)

app.use('/company', companyRouter)

app.use('/job', jobRouter)

app.use(globalResponse)

connection_db()


