import { Router } from "express";
import upload from "../../middleware/file-middleware";
import { speechToText } from "./generate.controller";

const generateRouter = () => {
  const router = Router();
  router.post("/", upload.single("audio"), speechToText);
  return router;
};

export default generateRouter;
