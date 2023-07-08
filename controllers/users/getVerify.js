const createError = require("http-errors");

const { User } = require("../../models");

const getVerify = async (req, res, next) => {
  const { verificationToken } = req.params;
  const user = await User.findOne({ verificationToken });

  if (!user) {
    throw createError(404, { message: "User not found" });
  }
 
  await User.findByIdAndUpdate(user._id, {
    verify: true,
    verificationToken: "",
  });

  res.status(200).json({
    message: "Verification email sent",
  });
};

module.exports = getVerify;
