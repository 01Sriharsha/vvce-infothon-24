import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import apiRouter from "../api";
import { config } from "../util/constant";

export const loaders = async ({ app }: { app: express.Application }) => {
  app.use(cors());
  app.use(express.json());
  app.use(cookieParser());
  app.use(config.api.prefix, apiRouter());
};
