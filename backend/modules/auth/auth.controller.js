import authService from "./auth.service.js";
import bcrypt from "bcrypt";
import { signAccessToken } from "./auth.token.js";
import { loginSchema, registerSchema } from "./auth.validation.js";

export const registerUser = async (req, res) => {
  try {
    const parsed = registerSchema.safeParse(req.body);
    if(!parsed.success){
        return res.status(400).json({
            success:false,
            message: 'Validaiton failed'
        })
    }

    const {fullName, email, password} =  parsed.data

    const existingUser = await authService.findByEmail(email);

    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: "Email already exists",
      });
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const user = await authService.createUser({
      fullName: fullName,
      email: email,
      passwordHash,
      role: 'customer',
      status: 'active'
    });

    return res.status(201).json({
      success: true,
      message: "User registered successfully",
      data: {
        id: user.id,
        fullName: user.fullName,
        email: user.email,
      },
    });
  } catch (error) {
    console.error("Register user error:", {
      message: error.message,
      stack: error.stack,
    });

    return res.status(error.statusCode || 500).json({
      success: false,
      message: error.message || "Internal server error",
    });
  }
};

export const login = async (req, res) => {
  const parsed = loginSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({
      success: false,
      message: "Validation failed",
      error: parsed.flattenError(parsed.error),
    })
  }

  const {email, password} = parsed.data

  const user = await authService.findByEmail(email)
  if(!user){
    return res.status(401).json({
        success: false,
        message: "Invalid email or password"
    })
  }

  if(user.status !== 'active'){
    return res.status(403).json({
        success: false,
        message: "Account in not active"
    })
  }

  const hashPassword = user.passwordHash

  const isPasswordValid = await bcrypt.compare(password, hashPassword);
  if(!isPasswordValid){
    return res.status(401).json({
        success: false,
        message: "Invalid email or password"
    })
  }

  const accessToken = signAccessToken({
    id: user.id,
    email: user.email,
    role: user.role,
  })

  return res.status(200).json({
    success: true,
    message: "Login successfully",
    data: {
        accessToken,
        id: user.id,
        fullName: user.fullName,
        email: user.email,
        role: user.role,
        status: user.status
    }
  })

};

export default registerUser;
