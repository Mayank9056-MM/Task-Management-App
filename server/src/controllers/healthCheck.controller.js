import { getDBStatus } from "../db/db.js";

export const healthCheck = async (req, res) => {
  try {
    const healthStatus = {
      status: "ok",
      timeStamp: new Date().toISOString(),
      services: {
        database: {
          status:
            getReadyStateText(getDBStatus()) === "connected"
              ? "healthy"
              : "unhealthy",
        },
        server: {
          status: "healthy",
          uptime: process.uptime(),
          memoryUsage: process.memoryUsage(),
        },
      },
    };
    const httpStatusCode =
      healthStatus.services.database.status === "healthy" ? 200 : 503;

    res.status(httpStatusCode).json(healthStatus);
  } catch (error) {
    console.error("Health check failed", error);
    res.status(500).json({
      status: "ERROR",
      timestamp: new Date().toISOString(),
      error: error.message,
    });
  }
};

function getReadyStateText(state) {
  switch (state) {
    case 0:
      return "disconnected";
    case 1:
      return "connected";
    case 2:
      return "connecting";
    case 3:
      return "disconnecting";

    default:
      return "unknown";
  }
}
