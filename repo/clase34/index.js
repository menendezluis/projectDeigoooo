const express = require("express");
const AWS = require("aws-sdk");

AWS.config.update({
  region: "us-east-1",
});

const sns = new AWS.SNS();
const SNS_TOPIC_ARN = "arn:aws:sns:us-east-1:346155633151:notificaciones";
const dynamodb = new AWS.DynamoDB.DocumentClient();
const PORT = 8080;
const TABLE_NAME = "product-inventory";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  const params = {
    TableName: TABLE_NAME,
  };
  dynamodb
    .scan(params)
    .promise()
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

app.post("/productos", async (req, res) => {
  const params = {
    TableName: TABLE_NAME,
    Item: req.body,
  };
  try {
    await dynamodb.put(params).promise();
    console.log("se inserto");
    const prod = JSON.stringify(req.body);
    const data = await sns
      .publish({
        Message: `nuevo producto agregado! ${prod}`,
        TopicArn: SNS_TOPIC_ARN,
      })
      .promise();
    console.log("se NOTIFICO");
    console.log(data);
    const body = {
      Operation: "SAVE",
      Message: "SUCCESS",
      Item: req.body,
    };
    res.json(body);
  } catch (err) {
    console.log(err);
    const body = {
      Operation: "SAVE",
      Message: "No se pudo guardar",
      Item: req.body,
    };
    res.json(body);
  }
});
/*dynamodb
    .put(params)
    .promise()
    .then(() => {
      console.log("se inserto");
      const prod = JSON.stringify(req.body);
      return sns
        .publish({
          Message: `nuevo producto agregado! ${prod}`,
          TopicArn: SNS_TOPIC_ARN,
        })
        .promise()
        .then((data) => {
          console.log("se NOTIFICO");
          console.log(data);

          const body = {
            Operation: "SAVE",
            Message: "SUCCESS",
            Item: req.body,
          };
          res.json(body);
        })
        .catch((err) => {
          console.log(err);
          const body = {
            Operation: "SAVE",
            Message: "No se pudo notificar",
            Item: req.body,
          };
          res.json(body);
        });
    })
    .catch((err) => {
      console.log(err);
      const body = {
        Operation: "SAVE",
        Message: "No se pudo guardar",
        Item: req.body,
      };
      res.json(body);
    });
});
*/

app.put("/productos/:id", async (req, res) => {
  const item = {
    ...req.body,
    productId: req.params.id,
  };
  const params = {
    TableName: TABLE_NAME,
    Item: item,
  };
  dynamodb
    .put(params)
    .promise()
    .then(() => {
      console.log("se actualizo");
      const body = {
        Operation: "UPDATE",
        Message: "SUCCESS",
        Item: item,
      };
      res.json(body);
    })
    .catch((err) => {
      console.log(err);
      const body = {
        Operation: "UPDATE",
        Message: "No se pudo actualizar",
        Item: item,
      };
      res.status(500).json(body);
    });
});

app.delete("/productos/:id", async (req, res) => {
  const params = {
    TableName: TABLE_NAME,
    Key: {
      productId: req.params.id,
    },
    ReturnValues: "ALL_OLD",
  };
  dynamodb
    .delete(params)
    .promise()
    .then((response) => {
      console.log("se elimino");
      const body = {
        Operation: "DELETE",
        Message: "SUCCESS",
        Item: response,
      };
      res.json(body);
    })
    .catch((err) => {
      console.log(err);
      const body = {
        Operation: "DELETE",
        Message: "No se pudo eliminar",
        Item: req.body,
      };
      res.status(500).json(body);
    });
});
const server = app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

server.on("error", (error) => {
  console.log("error en el servidor:", error);
});
