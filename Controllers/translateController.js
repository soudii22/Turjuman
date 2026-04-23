const APIfeatures = require("../utils/ApiFeaturs");
const catchAsync = require("express-async-handler");

const savedtransModel = require("../Models/savedtransModel");

const { translateAndSave } = require("./Translate/translateService");
const { getTranslationHistory } = require("./Translate/statsService");
const { checkTranslationLimit } = require("./Translate/translationLimiter");
const { ocrTranslateImage } = require("./Translate/ocrService");
const { translateFile } = require("./Translate/fileTranslateService");
const {
  searchAndFilterTranslations,
  userTanslations,
  getFavoritesInOrder,
  markAsFavoriteById,
  unMakrFavoriteById,
  GetSingleTranslate,
} = require("./Translate/translationQueries");

const factory = require("../Controllers/handerController");


exports.checkTranslationLimit = checkTranslationLimit;

exports.getUserTranslation = catchAsync(async (req, res, next) => {
  const userId = req.user.id;

  const features = new APIfeatures(savedtransModel.find({ userId }), req.query)
    .filter()
    .sort()
    .limitFields()
    .pagination();

  const savedTrans = await features.mongoesquery;
  const totalCount = await features.getTotalCount();

  const translations = savedTrans.map((trans) => ({
    id: trans.id,
    isFavorite: trans.isFavorite,
    original: trans.word,
    translation: trans.translation,
    srcLang: trans.srcLang,
    targetLang: trans.targetLang,
    definition: trans.definition,
    synonyms_src: trans.synonyms_src,
    synonyms_target: trans.synonyms_target,
    examples: trans.examples,
  }));

  res.status(200).json({
    status: "success",
    count: translations.length,
    totalCount,
    data: translations,
  });
});


exports.getFavorites = catchAsync(async (req, res, next) => {
  const userId = req.user.id;

  const features = new APIfeatures(
    savedtransModel.find({ userId, isFavorite: true }),
    req.query
  )
    .filter()
    .sort()
    .limitFields()
    .pagination();

  const favorites = await features.mongoesquery;
  const totalCount = await features.getTotalCount();

  const favoriteTranslations = favorites.map((trans) => ({
    id: trans.id,
    original: trans.word,
    translation: trans.translation,
    srcLang: trans.srcLang,
    targetLang: trans.targetLang,
    isFavorite: trans.isFavorite,
    createdAt: trans.createdAt,
    definition: trans.definition,
    synonyms_src: trans.synonyms_src,
    synonyms_target: trans.synonyms_target,
    examples: trans.examples,
  }));

  res.status(200).json({
    status: "success",
    count: favoriteTranslations.length,
    totalCount,
    data: favoriteTranslations,
  });
});


exports.translateFile = translateFile;


exports.ocrTranslateImage = ocrTranslateImage;


exports.getFavoritesInOrder = getFavoritesInOrder;
exports.markAsFavoriteById = markAsFavoriteById;
exports.unMakrFavoriteById = unMakrFavoriteById;
exports.GetSingleTranslate = GetSingleTranslate;
exports.searchAndFilterTranslations = searchAndFilterTranslations;
exports.userTanslations = userTanslations;


exports.deleteTranslationById = factory.deleteOne(savedtransModel);
exports.getalltranslations = factory.getAll(savedtransModel);


exports.translateAndSave = translateAndSave;
exports.getTranslationHistory = getTranslationHistory;
