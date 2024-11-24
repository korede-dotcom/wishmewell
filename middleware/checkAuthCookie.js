const jwt = require('jsonwebtoken');
const User = require("../models/User")
async function checkAuthCookie(req, res, next) {
    // Ensure cookies are being parsed
    if (!req.cookies) {
        return res.redirect('/portal');
        // return res.status(500).json({
        //     status: false,
        //     title: "Server Error",
        //     message: "Cookies are not being parsed correctly."
        // });
    }

    const token = req.cookies.jwtToken;

    if (!token) {
        // No token found, redirect to login
        return res.redirect('/portal');
    }

    try {
        // Verify the token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; // Attach the decoded user data to the request object
        const findOne = await User.findOne({where:{_id:req.user._id}})
        console.log("🚀 ~ checkAuthCookie ~ findOne:", findOne)
        if (!findOne.status) {
            return res.redirect('/portal');
        }
        next(); // Proceed to the next middleware/route handler
    } catch (err) {
        // Token verification failed, redirect to login
        return res.redirect('/portal');
    }
}

module.exports = checkAuthCookie;
