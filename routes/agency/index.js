const express = require('express');
const router = express.Router();
const User = require('../../models/User');
const Destination = require("../../models/Destination");
const Package = require("../../models/Package");
const Agency = require("../../models/Agency");
const Book = require("../../models/Book");
const Includes = require("../../models/Includes");
const Itenary = require("../../models/Itenary");
const Excludes = require("../../models/Excludes");
const {isEmpty, uploadDir} = require('../../helpers/upload-helper');
const fs = require('fs');

