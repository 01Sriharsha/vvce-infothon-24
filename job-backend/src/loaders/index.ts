import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import apiRouter from "../api";
import { config } from "../util/constant";

export const loaders = async ({ app }: { app: express.Application }) => {
  app.use(cors({ credentials: true, origin: config.client.url }));
  app.use(express.json({ limit: "50mb" }));
  app.use(express.urlencoded({ limit: "50mb", extended: true }));
  app.use(cookieParser());
  app.use(config.api.prefix, apiRouter());
};
