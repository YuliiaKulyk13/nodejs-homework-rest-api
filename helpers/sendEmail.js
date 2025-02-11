const sgMail = require("@sendgrid/mail");
require("dotenv").config();

const { API_KEY } = process.env;

sgMail.setApiKey(API_KEY);

const sendEmail = async (data) => {
  const email = { ...data, from: "kulyk.yuliia13@gmail.com" };
  await sgMail.send(email);
  return true;
};

module.exports = sendEmail;
