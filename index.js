import express from "express";
import sgMail from "@sendgrid/mail";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

app.post("/enviar", async (req, res) => {
  try {
    const { nombre, email, telefono, seguro, aseguradora, mensaje } = req.body;

    const msg = {
      to: "TU_CORREO@gmail.com",      // Aquí pones tu correo donde quieres recibir los datos
      from: "TU_CORREO@gmail.com",    // Debe ser un correo verificado en SendGrid
      subject: `Nueva solicitud de seguro: ${seguro}`,
      html: `
        <h2>Solicitud de Contratación</h2>
        <p><b>Nombre:</b> ${nombre}</p>
        <p><b>Email:</b> ${email}</p>
        <p><b>Teléfono:</b> ${telefono}</p>
        <p><b>Seguro:</b> ${seguro}</p>
        <p><b>Aseguradora:</b> ${aseguradora}</p>
        <p><b>Mensaje:</b> ${mensaje}</p>
      `,
    };

    await sgMail.send(msg);

    res.status(200).send("Correo enviado correctamente ✅");
  } catch (error) {
    console.error("Error enviando correo:", error);
    res.status(500).send("Error al enviar correo ❌");
  }
});

app.get("/", (req, res) => {
  res.send("Servidor SEINGUR activo 🚀");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor escuchando en puerto ${PORT}`));
