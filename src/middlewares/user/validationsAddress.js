// Requiring Libraries
const { body } = require("express-validator");
const db = require("../../database/models");

// Placing abbreviations of Models
const Address = db.Address;
const Order = db.Order;
const OrderDetail = db.OrderDetail;
const Product = db.Product;
const ProductTier = db.ProductTier;
const Tier = db.Tier;
const Universe = db.Universe;
const User = db.User;
const UserAddress = db.UserAddress;

// Requiring Scripts & Declaring Variables

const validations = [];

module.exports = validations;
