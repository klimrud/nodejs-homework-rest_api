const createError = require("http-errors");

const { User } = require("../../models");
const sendEmail = require("../../helpers/sendEmail");
const { BASE_URL } = process.env;


const resendVerify = async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({email});

  if (!user){
    throw createError(400,{ message: "Missing required field email" });
  }
     
   if(user.verify) {
    throw createError(400, { message: "Verification has already been passed" });
  }
  
  const verifyEmail = {
    to: email,
    subject: "Verify email",
    html: `<a target="_blank" href="${BASE_URL}/users/verify/${user.verificationToken}" >Click to verify email</a>`,
  };

  await sendEmail(verifyEmail);

  res.status(200).json({
    message: "Verification email sent",
  });
}

module.exports= resendVerify;