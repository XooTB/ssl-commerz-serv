import express from "express";

const router = express.Router();

router.get("/", (req, res, next) => {
  res.status(404).json({
    message: "You are not An Authorized Merchant",
  });
});

export default router;
