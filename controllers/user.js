
const User = require('../models/user.js');
const bcrypt = require(`bcrypt`)
const {phone} = require(`phone`)

   const validateMail=(email)=>{
    var validRegex =  /^(?=.*[@])(?=.*[.])[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if(!validRegex.test(email)){
        return true
    }
 }

 const validatePhone=(phoneNo)=>{
    return phone(phoneNo);
   }

 const validatePwd=(password)=>{
    const minLength = 8
    const maxLength =16
    const regularExp = (/^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%&*])[A-Za-z0-9!@#$%&*]{8,16}$/)
    if(password.length<minLength || password.length>maxLength){
        return true
    }
    else if(!regularExp.test(password)){
        return true
    }
   }


exports.createUser = async (req, res) => {
    try {
        const {firstName, lastName, password, mobileNumber, country, email, runningBalance} = req.body
      if(!firstName || !lastName || !password || !mobileNumber || !country || !email || !runningBalance){
        return res.status(401).json({success : false , error : "Fill all the Fields"})
    }
    else if(!validatePhone(mobileNumber).isValid){
        return res.status(403).json({success : false, error : "Invalid phone No."})
    }
    else if(validateMail(email)){
        return res.status(401).json({success : false, error : `Invalid Email`})
    }
    else if(validatePwd(password)){
        return res.status(403).json({success : false, error : "Invalid Password parameters"})
      }
      try{
      const foundUser = await User.findOne({email : email})
      if(foundUser != null){
        return res.status(401).json({success : false, error : `User already exists`})
    }
    else if(foundUser==null){
        try{
        const hashPwd = await bcrypt.hash(password,12)
            const storeUser = new User({
                firstName : firstName,
                lastName : lastName,
                password : hashPwd,
                mobileNumber : mobileNumber,
                country : country,
                email : email,
                runningBalance : runningBalance
            })
            try{
            const storedUser = await storeUser.save()
            if(storedUser){
            return res.status(200).json({success : true , message : `User stored successfully in the database`})
            }
            else{
                return res.status(401).json({success : false , message : `User stored does not save in the database`})
            }
        }
        catch(err){
            res.status(500).json({ message: err.message });
        }
        }
        catch(err){
            res.status(500).json({ message: err.message });
        }
    }
      }catch(err){
        res.status(500).json({ message: err.message });
    }
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  