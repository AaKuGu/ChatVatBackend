module.exports.check = () => {
  if (process.env.NODE_ENV !== "production") {
    return {
      PORT: process.env.PORT,
      MONGO_URL: process.env.MONGO_URL,
    };
  } else {
    return {
        PORT : process.env.PORT,
        
    }
  }
};
