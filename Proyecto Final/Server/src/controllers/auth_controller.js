const userSchema = require('../models/user_model')
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const { sendEmail } = require('../services/emailService')
const { generarTokenRestablecimiento } = require('../services/authService')

const authController = {
  checkProtected: (req, res) => {
    res.status(200).json({ message: "Acceso permitido", username: req.username })
  },
  register: async (req, res) => {
    try {
      const newUser = userSchema(req.body)
      await newUser.save()
      res.status(201).json({"mensaje":"Usuario registrado con Exito","ok":"ok"})
    } catch (error) {
      res.status(400).send(error)
    }
  },
  login: async (req, res) => {
    console.log("iniciando login")
    try {
      const user = await userSchema.findOne({ email: req.body.email })
      const isValidatedPassword = await bcrypt.compare(req.body.password, user.password)

      if (!user || !isValidatedPassword) {
        // throw new Error("Credenciales invalidas")
        return  res.status(401).json({ message: "Credenciales invalidas","ok":"fail" })
      }
      console.log("credenciales correctas")
      const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
        expiresIn: "1h"
      })
      res.status(200).send({ token })
    } catch (error) {
      console.log(error)
      res.status(400).send(error)
    }
  },
  solicitudResetPass: async (req, res) => {
    try {
      const token = await generarTokenRestablecimiento(req.body.email)
      const resetLink = `${process.env.SERVER_URL}/auth/recuperacion/${token}`;
      sendEmail(
        req.body.email,
        "Restablecimiento de contraseña",
        `<p>Haz clic en el siguiente enlace para restablecer tu contraseña:</p>
        <a href="${resetLink}">${resetLink}</a>`,
      );
      res.json({ "mensaje": "se ha enviado un enlace de restablecimiento de contraseña" })
    }
    catch (error) {
      res.status(500).send(error.message)
    }
  },
  resetPasswordToken: async (req, res) => {
    try {
      console.log("mireset")
      const user = await userSchema.findOne({
        resetPasswordToken: req.params.token,
        resetPasswordExpires: { $gt: Date.now() }
      })
      console.log("mireset verificando user")
      if (!user) {
        return res.status(400).json({ mensaje: "Token de restablecimiento invalido o expirado" })
      }
      console.log("mireset", req.body.password)
      // const hashedPassword = await bcrypt.hash(req.body.password, 12)
      user.password = req.body.password;
      user.resetPasswordToken = undefined;
      user.resetPasswordExpires = undefined;
      console.log("mireset preparado para guardar")
      await user.save()
      console.log("mireset guardado listo para enviar respuesta")
      res.json({ "mensaje": "Contraseña actualizada correctamente", "ok": "ok" })
    } catch (error) {
      res.status(500).json({ "mensaje": "error al restablecer la contraseña" })
    }
  },

  recuperacionWeb: (req, res) => {
    const resetForm = `
    <form id="resetPasswordForm" style="max-width: 300px; margin: auto; padding: 20px; border: 1px solid #ccc; border-radius: 8px; background-color: #f9f9f9;">
      <label for="newPassword" style="display: block; margin-bottom: 8px;">Nueva Contraseña:</label>
      <input type="password" id="newPassword" name="password" required style="width: 100%; padding: 8px; margin-bottom: 16px; box-sizing: border-box;">
      <br>
      <input type="button" value="Restablecer Contraseña" onclick="submitForm()" style="background-color: #4caf50; color: white; padding: 10px 15px; border: none; border-radius: 4px; cursor: pointer;">
    </form>

    <script>
    function submitForm() {
      const newPassword = document.getElementById('newPassword').value;

      const formData = { password: newPassword };

      fetch('${process.env.SERVER_URL}/auth/resetPassword/${req.params.token}', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })
      .then(response => response.json())
      .then(data => {
        console.log(data);
        if(data.ok=="ok"){
          alert('Contraseña actualizada correctamente')
        }else{
          alert(data.mensaje)
        }
      })
      .catch(error => {
        console.error('Error:', error);
        alert(error.mensaje)
      });
    }
    </script>
    `;

    res.send(resetForm);
  }
};
module.exports = authController