const express = require("express");
const userController = require("./../Controllers/userController");
const adminController = require("../Controllers/adminController");
const authController = require("./../Controllers/authController");
const Email = require("../utils/email");

const router = express.Router();

router.get("/test-invoice", async (req, res) => {
  const user = {
    name: "Mohamed",
    email: "Mohamedelshesheny62@gmail.com",
  };

  try {
    await new Email(user).sendInvoice([
      { name: "Translation Package - 10K words", amount: 299 },
      { name: "AI Summary Feature", amount: 50 },
    ]);

    res.send("Invoice sent successfully!");
  } catch (err) {
    console.error(err);
    res.status(500).send("Error sending invoice");
  }
});

