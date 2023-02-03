import pino from "pino";

export const logger = pino({
     transport: process.env.NODE_ENV === "development" ? {
          target: "pino-pretty",
          options: {
               colorize: true
          }
     } : void(0)
});