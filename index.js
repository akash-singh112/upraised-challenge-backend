const express = require("express");
const cors = require("cors");
const { DBConnection } = require("./dbConnect");
const authMiddleware = require("./middleware/authMiddleware.js");
const { RegisterFunction, LoginFunction } = require("./middleware/auth.js");
const {
  getGadgets,
  postGadgets,
  patchGadgets,
  delGadgets,
  selfDestruct,
} = require("./gadgetrequests/utils.js");

const app = express();

// Middleware setup
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

DBConnection();

app.use("/register", RegisterFunction);
app.use("/login", LoginFunction);

app.post("/gadgets/post", authMiddleware, postGadgets);

app.get("/gadgets/get", authMiddleware, getGadgets);

app.patch("/gadgets/patch/:id", authMiddleware, patchGadgets);

app.delete("/gadgets/delete/:id", authMiddleware, delGadgets);

app.post("/gadgets/:id/self-destruct", authMiddleware, selfDestruct);

app.listen(process.env.PORT, () => {
  console.log(`App is listening to port ${process.env.PORT}`);
});
