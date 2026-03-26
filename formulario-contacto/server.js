const express = require("express");

const nodemailer = require("nodemailer");

const app = express();

//ESTO ES CLAVE
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Carpeta pública
app.use(express.static("public"));

// Ruta para recibir datos del formulario
app.post("/enviar", async (req, res) => {

    console.log(req.body);

    const { nombre, email, telefono, mensaje } = req.body;

    // Configuración del correo
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: "tusitiowebhoy.es@gmail.com",
            pass: "wpwdrjbxqxdoggxk"
        }
    });

    const mailOptions = {
        from: "tusitiowebhoy.es@gmail.com",
        to: "tusitiowebhoy.es@gmail.com",
        subject: "Nuevo mensaje de formulario",
        text: `
Nombre: ${nombre}
Email: ${email}
Teléfono: ${telefono}
Mensaje: ${mensaje}
        `,
    replyTo: email 
    };

    try {
        await transporter.sendMail(mailOptions);
        res.send("Mensaje enviado correctamente");
        
    } catch (error) {
    console.log("ERROR REAL:", error); // 
    res.send("Error al enviar el mensaje");
    }
});




// Levantar servidor
app.listen(3000, () => {
    console.log("Servidor corriendo en http://localhost:3000");
});