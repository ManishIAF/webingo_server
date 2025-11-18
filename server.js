import 'dotenv/config';
import express from "express";
import cookieParser from 'cookie-parser';

import isDataBaseConnected from './DataBase/DB_Connection.js';

import errorHandler from './middlewares/errorHandlerMiddleware.js';

import cors from 'cors';

import morgan from 'morgan';


const app = express();

//-------------------------------------------------Middleware to parse incoming requests data---------------------------------------------------------

    // Middleware to parse JSON
    app.use(express.json());

    // Middleware to parse URL-encoded form data
    app.use(express.urlencoded({ extended: true }));

// ---------------------------------------------------------------------------------------------------------------------------------------------------

// -------------------------------------------------------Request logger------------------------------------------------------------------

    app.use(
        morgan("dev", {
            skip: (req, res) => req.method === "OPTIONS",
        })
    );

// ----------------------------------------------------------------------------------------------------------------------------------------

// ----------------------------------------------Cookie Parser Middleware------------------------------------------------------------
    app.use(cookieParser());
// ----------------------------------------------------------------------------------------------------------------------------------

// ----------------------------------------------CORS Middleware------------------------------------------------------------
 

    app.use(cors(
        {
            origin: [process.env.CLIENT_URI],
            methods: ["GET", "POST", "PUT","PATCH", "DELETE", "OPTIONS"],
            allowedHeaders: ["Content-Type", "Authorization","authorization"],
            credentials: true
        }
    ));
// ----------------------------------------------------------------------------------------------------------------------------------

//---------------------------------------------------- Test Route ----------------------------------------------------------------

    app.get("/", (req, res) => {
        res.send("Server is up and running");
    });

// --------------------------------------------------------------------------------------------------------------------------------


// ----------------------------------------------Importing Routers---------------------------------------------------------
    import authenticateRoute from './Routers/AuthenticateRoute.js';
    import usersRoute from './Routers/usersRoute.js';
    import taskRoute from './Routers/taskRoute.js';
// ------------------------------------------------------------------------------------------------------------------------

// ---------------------------------Implimenting Route Middleware For Controlles-------------------------------------------
    app.use('/api/v1/auth', usersRoute);
    app.use('/api/v1', authenticateRoute);
    app.use('/api/v1/task', taskRoute);
// ------------------------------------------------------------------------------------------------------------------------


// ---------------------------------Error Handler Middleware-----------------------------------------------------------

    app.use(errorHandler);

// ------------------------------------------------------------------------------------------------------------------------


//--------------------------------------Starting the Server----------------------------------------------------------------

    const PORT = process.env.PORT || 5000;


    app.listen(PORT, async() => {
        try {
            const {status,message} = await isDataBaseConnected();
            console.log(message);
            console.log(`Server is running on port ${PORT}`);
        } catch (error) {
            console.log("Error starting the server: ", error.message);
        }
    });

// -------------------------------------------------------------------------------------------------------------------------