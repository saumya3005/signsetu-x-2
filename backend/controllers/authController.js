const User = require("../models/User")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

// SIGNUP
exports.signup = async (req,res)=>{

try{

const {name,email,password} = req.body

if(!name || !email || !password){
return res.status(400).json({
message:"All fields are required"
})
}

// check user exist
const existingUser = await User.findOne({email})

if(existingUser){
return res.status(400).json({
message:"User already exists"
})
}

// password hash
const hashedPassword = await bcrypt.hash(password,10)

const user = new User({
name,
email,
password:hashedPassword
})

await user.save()

res.json({
message:"User registered successfully"
})

}catch(error){

res.status(500).json({
error:error.message
})

}

}


// LOGIN

exports.login = async (req,res)=>{
const token = jwt.sign(
  { id: user._id },
  process.env.JWT_SECRET,
  { expiresIn: "71" }
);

try{

const {email,password} = req.body

// validation
if(!email || !password){
return res.status(400).json({
message:"Email and password required"
})
}

const user = await User.findOne({email})

if(!user){
return res.status(400).json({
message:"User not found"
})
}

const isMatch = await bcrypt.compare(password,user.password)

if(!isMatch){
return res.status(400).json({
message:"Invalid credentials"
})
}


res.json({
  message:"Login successful",
  token
})

}catch(error){

res.status(500).json({
error:error.message
})

}

}