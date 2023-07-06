const bcrypt = require("bcryptjs");
const createError = require("http-errors");
const gravatar = require("gravatar");
const { v4 } = require("uuid");
const sendEmail = require("../../helpers/sendEmail");

const { User } = require("../../models");
const { BASE_URL } = process.env;

const register = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw createError(409, { message: "Email in use" });
  }

  const hashPassword = await bcrypt.hashSync(password, bcrypt.genSaltSync(10));
  const verificationToken = v4();
  const avatarURL = gravatar.url(email);

  const newUserData = {
    ...req.body,
    password: hashPassword,
    avatarURL,
    verificationToken,
  };
  const newUser = await User.create(newUserData);

  const verifyEmail = {
    to: email,
    subject: "Verify email",
    html: `<a target="_blank" href="${BASE_URL}/users/verify/${verificationToken}" >Click to verify email</a>`,
  };

  await sendEmail(verifyEmail);

  console.log("newUser", newUser);
  res.status(201).json({
    user: {
      email: newUser.email,
      subscription: newUser.subscription,
    },
  });
};

module.exports = register;
