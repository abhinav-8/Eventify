import { User , PostMessage } from "../models/index.js";
import { z } from "zod";
import { hashPassword, verifyPassword } from "../utils/authUtil.js";
import jwt from "jsonwebtoken";
import { fromZodError } from "zod-validation-error";
const JWT_KEY = "eventify"

const signup = async (req, res) => {
  try {
    console.log("signupBody", req.body);
    const signupBody = z.object({
      userName: z.string().email().trim().min(3).max(50),
      firstName: z.string().trim().max(50),
      lastName: z.string().trim().max(50),
      password: z.string().trim().min(6),
    });

    const { success } = signupBody.safeParse(req.body);
    console.log("success",success)
    if (!success) {
      return res.status(400).json({
        data: {},
        message: "Validation error",
        success: false,
      });
    }

    const existingUser = await User.findOne({
      userName: req.body.userName,
    });
    if (existingUser) {
      return res.status(400).json({
        data: {},
        message: "Email already in use",
        success: false,
      });
    }

    const response = await User.create({
      userName: req.body.userName,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      password: hashPassword(req.body.password),
    });

    const userId = response._id;
    const userName = req.body.userName;
    const firstName = req.body.firstName;
    //create account

    const token = jwt.sign(
      {
        userId: userId,
        userName: userName,
        firstName: firstName,
        time: Date(),
      },
      JWT_KEY
    );

    return res.status(200).json({
      data: {
        userName: response.userName,
        firstName: response.firstName,
        lastName: response.lastName,
        _id: response._id,
        token: token,
      },
      success: true,
      message: "Successfully created user",
    });
  } catch (error) {
    return res.status(500).json({
      data: {},
      msg: "some error occurred",
      success: false,
    });
  }
};

const signin = async (req, res) => {
  try {
    const signinBody = z.object({
      userName: z.string().email().trim().min(3).max(50),
      password: z.string().trim().min(6),
    });

    const { success } = signinBody.safeParse(req.body);

    if (!success) {
      return res.status(400).json({
        data: {},
        message: "Validation error",
        success: false,
      });
    }

    const response = await User.findOne({
      userName: req.body.userName,
    });

    if (!response) {
      return res.status(400).json({
        data: {},
        message: "User doesn't exist,please signup!",
        success: false,
      });
    }

    if (verifyPassword(req.body.password, response.password) === true) {
      let userId = response._id;
      const token = jwt.sign(
        {
          userId: userId,
          time: Date(),
        },
        JWT_KEY
      );

      return res.status(200).json({
        data: {
          userName: response.userName,
          firstName: response.firstName,
          lastName: response.lastName,
          _id: response._id,
          token: token,
        },
        success: true,
        message: "Successfully created user",
      });
    } else {
      return res.status(401).json({
        data: {},
        msg: "Invalid credentials!",
        success: false,
      });
    }
  } catch (error) {
    return res.status(500).json({
      data: {},
      msg: "Some error occurred",
      success: false,
    });
  }
};

const update = async (req, res) => {
  try {
    const updateSchema = z
      .object({
        firstName: z.string().trim().max(50),
        lastName: z.string().trim().max(50),
        password: z.string().trim().min(6),
      })
      .partial()
      .refine(
        (data) => !!(data.firstName || data.lastName || data.password),
        "Update something"
      );

    const result = updateSchema.safeParse(req.body);

    if (!result.success) {
      return res.status(400).json({
        data: {},
        msg: fromZodError(result.error).toString(),
        success: false,
      });
    }

    //If in return we don't need the modified data in return,we can go with the UpdateOne method too
    const response = await User.findOneAndUpdate(
      { _id: req.body.userId },
      req.body
    );

    return res.status(200).json({
      data: {
        userName: response.userName,
        firstName: response.firstName,
        lastName: response.lastName,
        _id: response._id,
      },
      msg: "Successfully updated user data",
      success: true,
    });
  } catch (error) {
    return res.status(500).json({
      data: {},
      msg: "Some error occurred",
      success: false,
    });
  }
};

const search = async (req, res) => {
  try {
    const filter = req.query.filter || "";

    const data = await User.find({
      $or: [
        {
          firstName: {
            $regex: filter,
          },
        },
        {
          lastName: {
            $regex: filter,
          },
        },
      ],
    });

    return res.status(200).json({
      data: data.map((u) => ({
        username: u.userName,
        firstName: u.firstName,
        lastName: u.lastName,
        _id: u._id,
      })),
      msg: "successfully fetched users",
      success: true,
    });
  } catch (error) {
    res.status(500).json({
      msg: "There is some internal error!",
      success: false,
    });
  }
};


const isAuthenticated = (req, res, next) => {
  const headerToken = req.headers.authorization;

  if (!headerToken || !headerToken.startsWith("Bearer ")) {
    return res.status(403).json({
      data: {},
      msg: "You don't have permission to access this resource",
      success: false,
    });
  }

  let token = headerToken.split(" ")[1];
  try {
    const decoded = jwt.verify(token, JWT_KEY);
    console.log(decoded);
    return res.status(200).json({
      data: decoded,
      msg:"JWT verified",
      success: true
    })
  } catch (error) {
    return res.status(403).json({
      data: {},
      msg: "Invalid token",
      success: false,
    });
  }
};


export { signup, signin, update, search, isAuthenticated };
