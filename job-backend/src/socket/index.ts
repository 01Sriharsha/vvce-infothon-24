import express from "express";
import http from "http";
import { Server, Socket } from "socket.io";

export const socket = async ({ app }: { app: express.Application }) => {
  const server = http.createServer(app);
  const io = new Server(server);

  io.on("connection", (socket: Socket) => {
    console.log("user connected");

    socket.on("message", () => {
      io.emit("message", "hello world");
    });

    socket.on("disconnect", () => {
      console.log("User connected");
    });

    socket.on("chat", (data) => {
        
    });
  });
};
