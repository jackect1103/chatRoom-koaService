import { createServer } from "http";
import { Server } from 'socket.io'

const socketIo = (app) => {
  const httpServer = createServer(app.callback());
  const io = new Server(httpServer, {
    //配置cors，解决同源策略问题
    cors: {
      origin: "*",
      methods: ['GET', 'POST']
    }
  });

  io.on("connect", (socket) => {
    console.log('socket连接成功')

    // 加入房间并通知
    socket.on("join", ({ roomid }) => {
      console.log(`${roomid}进入房间,socket.id：${socket.id}`);
      socket.join(roomid);
      io.in(roomid).emit("say", `${socket.id}加入了`);
    });

    // 离开房间并通知
    socket.on("leave", ({ roomid }) => {
      console.log(`${roomid}离开房间,socket.id：${socket.id}`);
      io.in(roomid).emit("say", `${socket.id}离开了`);
      socket.leave(roomid);
    });

    // 通过房间号发送消息
    socket.on("sendMsgByRoom", ({ roomid, msg }) => {
      console.log("通过房间号发送消息", roomid, msg);
      io.in(roomid).emit("receiveMsg", msg, socket.id);
    });

  });

  return httpServer
}


export default socketIo