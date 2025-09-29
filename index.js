const express = require("express");
const path = require("path");
const { createServer } = require("http");

const usersRouter = require("./server/routes/users.router");
const screen1EventsRouter = require("./server/routes/screen1Events.router");
const productsRouter = require("./server/routes/products.router");
const ordersRouter = require("./server/routes/orders.router");
const postsRouter = require("./server/routes/posts.router");
const { initSocketInstance } = require("./server/services/socket.service");

const PORT = 5050;

const app = express();
const httpServer = createServer(app);

app.use(express.json());
app.use("/app1", express.static(path.join(__dirname, "app1")));
app.use("/app2", express.static(path.join(__dirname, "app2")));

app.use("/", usersRouter);
app.use("/", screen1EventsRouter);
app.use("/", productsRouter);
app.use("/", ordersRouter);
app.use("/", postsRouter);

initSocketInstance(httpServer);

httpServer.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);

  console.log("\n Aplicaciones disponibles:");
  console.log(`App 1 http://localhost:${PORT}/app1`);
  console.log(`App 2 http://localhost:${PORT}/app2`);
});
