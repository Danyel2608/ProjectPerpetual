const bcrypt = require("bcrypt");
const Login = require("../Model/loginModel");
const { generateToken } = require("../lib/util");

//Get all Logins
const getAllLogins = async (req, res) => {
  try {
    const logins = await Login.find();
    res.json(logins);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener los logins' });
  }
};
//Get Login by id
const getLoginId = async (req, res) => {
  try {
    const userId = req.body._id;
    const login = await Login.findOne(userId);
    res.json(login);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener login by id' });
  }
};

//POST /auth/signup
const signup = async (req, res) => {
  try {
    //obtener datos del body
    const { name, email, password, lastName, role } = req.body;
    //generar hash de la contraseña
    const passwordHash = await bcrypt.hash(password, 10);

    //crear usuario
    const newUser = new Login({
      name,
      lastName,
      email,
      role,
      password: passwordHash,
    });
    //guardar el usuario en la base de datos
    const user = await newUser.save();
    //generar token incluyendo id,email,role en el payload
    const payload = { id: user._id, email: user.email, role: user.role };
    const token = generateToken(payload, false);
    //generar token de refresco
    const refreshToken = generateToken(payload, true);
    //enviar respuesta
    res.status(201).json({
      status: "Succeeded",
      data: {
        user,
        token,
        refreshToken,
      },
      error: null,
    });

  } catch (error) {
    if (error.code === 11000) {
      return res.status(409).json({
        status: "failed",
        data: null,
        error:
          "You are trying to registrer an existent email.Please choose a new email and try again",
      });
    } else {
      res
        .status(400)
        .json({ status: "failed", data: null, error: error.message });
    }
  }
};
//POST login
const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await Login.findOne({ email });
    !user &&
      res.status(404).json({
        status: "failed",
        data: null,
        error: "Wrong email or password.Please try again.",
      });
    const validPassword = await bcrypt.compare(password, user.password);
    !validPassword &&
      res.status(404).json({
        status: "failed",
        data: null,
        error: "Wrong email or password.Please try again.",
      });
    //si la contraseña y email son correctos generar token
    const payload = { id: user._id, email: user.email };
    const token = generateToken(payload, false);
    //generar token de refresco
    const refreshToken = generateToken(payload, true);
    await user.save();

    //enviar token
    res.status(201).json({
      status: "Succeeded",
      data: {
        user,
        token,
        refreshToken,
      },
      error: null,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: "Succeeded",
      data: null,
      error: error.message,
    });
  }
};

//GET /auth/refresh-token
const refreshToken = async (req, res) => {
  try {
    //si no hay payload desde token de refresco,enviar error
    if (!req.user) {
      res.status(403).json({
        status: "failed",
        data: null,
        error: "Unauthorized",
      });
    }
    //si hay token de refresco y ha expirado,obtener el payload y enviar 2 nuevos token
    const payload = {
      id: req.user.id,
      email: req.user.email,
    };
    res.status(201).json({
      status: "Succeeded",
      data: {
        user: payload,
        token: generateToken(payload, false),
        refreshToken: generateToken(payload, true),
      },
      error: null,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      status: "Succeeded",
      data: null,
      error: err.message,
    });
  }
};
const forgetPassword = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await Login.findOne({ email });

    if (!user) {
      return res.status(404).json({
        status: "failed",
        data: null,
        error: "This email doesn't exist. Please try again.",
      });
    }
    // Hash de la nueva contraseña
    const hashedPassword = await bcrypt.hash(password, 10);

    // Actualizar la contraseña del usuario en la base de datos
    user.password = hashedPassword;
    await user.save();

    // Si necesitas generar token como en tu ejemplo, aquí lo puedes hacer

    // Envío de respuesta exitosa
    res.status(200).json({
      status: "Succeeded",
      data: null,
      error: null,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: "Failed",
      data: null,
      error: error.message,
    });
  }
};
const deleteUser = async (req, res) => {
  try {
    const { email } = req.body;

    // Verificar si el correo está presente en la solicitud
    if (!email) {
      return res.status(400).json({
        status: "failed",
        data: null,
        error: "Correo electrónico no proporcionado en la solicitud.",
      });
    }

    // Buscar al usuario por su correo electrónico
    const user = await Login.findOne({ email });

    // Verificar si el usuario existe
    if (!user) {
      return res.status(404).json({
        status: "failed",
        data: null,
        error: "Usuario no encontrado.",
      });
    }

    // Eliminar el usuario de la base de datos
    await user.deleteOne();

    // Respuesta exitosa
    res.status(200).json({
      status: "succeeded",
      data: null,
      error: null,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: "failed",
      data: null,
      error: "Error al intentar eliminar el usuario.",
    });
  }
}

module.exports = { signup, login, refreshToken, forgetPassword, deleteUser, getAllLogins, getLoginId };
