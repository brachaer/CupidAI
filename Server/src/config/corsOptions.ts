import { Request } from "express";

const whitelist = ["http://192.168.15.75:8081", "http://localhost:19006"];

type CorsOptionsCallback = (
  error: Error | null,
  options?: { [key: string]: any }
) => void;

const corsOptionsConfig = (req: Request, callback: CorsOptionsCallback) => {
  let corsOptions;
  if (whitelist.indexOf(req.header("Origin") || "") !== -1) {
    corsOptions = { origin: true };
  } else {
    corsOptions = { origin: false };
  }
  callback(null, corsOptions);
};

export default corsOptionsConfig;
