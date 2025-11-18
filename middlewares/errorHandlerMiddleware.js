// middleware/errorHandler.js
const errorHandler = (err, req, res, next) => {
    
  // For custom AppErrors, use their status code, otherwise default to 500

    const statusCode = err.statusCode || 500;
    const status = err.status || 'error';

    res.status(statusCode).json({
      success: false,
      status,
      message: err.message,
      ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
    });
  
  };
  
  export default errorHandler;
  