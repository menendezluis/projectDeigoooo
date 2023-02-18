import { createTransport } from "nodemailer";

const TEST_MAIL = "vivien.nitzsche@ethereal.email";
const TEST_PASS = "9MXBdG5XEk7ejMh6hA";

const transporter = createTransport({
  host: "smtp.ethereal.email",
  port: 587,
  auth: {
    user: TEST_MAIL,
    pass: TEST_PASS,
  },
});

const mailOptions = {
  from: "Servidor de prueba",
  to: TEST_MAIL,
  subject: process.argv[2],
  html: '<div><h1 style="color: blue;">Prueba de envio de mail</h1><span>Este es un mail de prueba</span></div>',
};

const sendMail = async () => {
  try {
    const info = await transporter.sendMail(mailOptions);
    console.log("Mensaje enviado: %s", info);
  } catch (err) {
    console.log(err);
  }
};

sendMail();
