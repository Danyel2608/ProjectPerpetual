const nodemailer = require('nodemailer');

const enviarMail = async (user,token) => {
    const config = {
        host: "smtp.gmail.com",
        port: 587,
        auth: {
            user: "consultaskoke@gmail.com",
            pass: "dlit kryb yzju ohdv"
        },

    }

    const mensaje = {
        from: "consultaskoke@gmail.com",
        to: user.email,
        subject: "Correo de verificacion ✔ ",
        text: `<h3>Verificacion de registro en Perpetual Tattoo</h3>
        <a href="http://http://localhost:3000/confirmar/${token}">Confirmar</a>`
    }

    const transporter = nodemailer.createTransport(config);

    const info = await transporter.sendMail(mensaje)

    console.log(info);
}

module.exports = { enviarMail };