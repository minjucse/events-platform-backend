import { Server } from "http";
import app from "./app";
import { startEventStatusScheduler } from "./app/utils/eventStatusScheduler";
import logger from "./app/utils/logger";
import config from "./config";

async function bootstrap() {
  let server: Server;

  try {
    server = app.listen(config.port, () => {
      logger.info(
        `🚀 Event Management Server is running on http://localhost:${config.port}`
      );
    });

    startEventStatusScheduler();

    const exitHandler = () => {
      if (server) {
        server.close(() => {
          logger.info("Server closed gracefully.");
          process.exit(1);
        });
      } else {
        process.exit(1);
      }
    };

    process.on("unhandledRejection", (error) => {
      logger.error(
        "Unhandled Rejection is detected, we are closing our server..."
      );
      logger.error(error);
     
    });
  } catch (error: any) {
    logger.error("Error during server startup:", error);
    process.exit(1);
  }
}

bootstrap();
