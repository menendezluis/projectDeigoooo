import twilio from "twilio";

const accountId = "xxxxxxxxxx";
const authToken = "xxxxxxxxxxxxx";

const client = twilio(accountId, authToken);

const sendSMS = async (to, body) => {
  try {
    const message = await client.messages.create({
      body: body,
      from: "+14017403731", // Twilio phone number lo obtienes en tu cuenta de twilio
      to: to,
    });

    console.log(message);
  } catch (err) {
    console.log(err);
  }
};

sendSMS("+57xxx", "Hola coderhouse"); // el codigo de area del numero depende de tu pais
