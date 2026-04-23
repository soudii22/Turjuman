const express = require("express");
const translateController = require("../Controllers/translateController");
const authController = require("../Controllers/authController");
const { transcribeAudioHandler } = require("../utils/speehToText");
const cardController = require("../Controllers/flashCardController");
const upload = require("../utils/uploadHandler");

const router = express.Router({ mergeParams: true });

