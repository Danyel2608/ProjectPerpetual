const Login = require("../Model/loginModel");
const confirmarEmail = async (req, res) => {
    const token = req.params.token;

    try {
        // Buscar el usuario por el token de confirmación en la base de datos
        const usuario = await Login.findOne({ token: token });

        if (usuario) {
            // Si se encuentra el usuario, marcar su correo electrónico como confirmado
            usuario.emailConfirmed = true;
            await usuario.save();

            // Redireccionar al usuario a una página de confirmación exitosa o mostrar un mensaje de éxito
            res.redirect('/login');
        } else {
            // Si no se encuentra el usuario, redireccionar al usuario a una página de error o mostrar un mensaje de error
            console.log("Algo ha ido mal");
            res.redirect('/*');
        }
    } catch (error) {
        // Manejar cualquier error que pueda ocurrir durante la búsqueda o actualización del usuario
        console.error('Error al confirmar correo electrónico:', error);
        res.redirect('/*');
    }
};


module.exports = { confirmarEmail };