const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const cors = require("cors");
const morgan = require("morgan");
const sgMail = require("@sendgrid/mail");
const app = express();

sgMail.setApiKey(
  "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"
);

app.use(cors());
app.use(morgan("dev"));

const appDir = process.cwd();

app.use(express.static(path.join(appDir, "build")));

app.use(bodyParser.json());

app.post("/api/sendemail", (req, res) => {
  const {
    customerName,
    carYear,
    carModel,
    canDirectSale,
    consignPrice,
    templateID,
    emailTo,
    emailFrom
  } = req.body;
  const msg = {
    to: "chrisyeung@beyondcars.com",
    from: "Hello@beyondcars.com",
    templateId: templateID,
    dynamic_template_data: {
      firstName: customerName,
      year: carYear,
      model: carModel,
      direct: canDirectSale,
      consign: consignPrice
    }
  };

  sgMail
    .send(msg)
    .then(response => {
      console.log("s");
      return res.json({ status: 200 });
    })
    .catch(err => {
      console.log(err);
      return res.json({ status: 400 });
    });
});

app.get("/*", (req, res) => {
  res.sendFile(path.join(appDir, "/build/index.html"));
});

app.listen(4000, "0.0.0.0", err => {
  console.log("listening on http://0.0.0.0:4000");
});
