import jwt from "jsonwebtoken";

const isAuthenticated = async (req, res, next) => {
    try {
        const token = req.cookies.token;
        if (!token) {
            return res.status(401).json({
                message: "Authentication token is missing",
                success: false
            });
        }

        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        req.user = decoded;
        next();
    } catch (error) {
        console.log(error);
        let message = "Invalid or expired token";
        if (error.name === "TokenExpiredError") {
            message = "Token has expired";
        } else if (error.name === "JsonWebTokenError") {
            message = "Invalid token";
        }
        return res.status(401).json({
            message,
            success: false
        });
    }
};

export default isAuthenticated;
