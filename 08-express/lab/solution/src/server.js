import express from "express";
import userRoutes from "./routes/user.routes.js";
import pino from "express-pino-logger";
import errorHandling from "./middleware/errorHandling.js";
import apiKeyAuth from "./middleware/apiKeyAuth.js";
import requestTimingMiddleware from "./middleware/requestTimingMiddleware.js";
import rateLimitingMiddleware from "./middleware/rateLimit.js";
import redisRateLimiting from "./middleware/rateLimitRedis.js"
const app = express();
const port = process.env.PORT || 3000;

app.use(requestTimingMiddleware);
app.use(redisRateLimiting);
app.disable("x-powered-by");
app.use("/api/v1/users", userRoutes);

app.get("/", apiKeyAuth, (req, res) => {
  res.json({ message: "Hello world!" });
});

app.use((req, res, next) => {
  const error = new Error(`Route not found: ${req.originalUrl}`);
  res.status(404);
  next(error); // Pass the error to the error-handling middleware
});

app.use(errorHandling);

app.listen(port, () => {
  console.log(`Server is running on port http://localhost:${port}`);
});
