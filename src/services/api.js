import { SENDGRID_TEMPLATEIDS } from "../config";
const headers = {
  "Content-Type": "application/json"
};

const lngs = ["Chinese", "English"];

const methods = ["dealerOnly", "cosignOnly", "cosignDealer", "noOffer"];

export const sendGridEmail = ({ emailTo, content }) => {
  const {
    customerName,
    carYear,
    carModel,
    canDirectSale,
    consignPrice,
    preferredSellingMethod,
    language
  } = content;
  const templateID =
    SENDGRID_TEMPLATEIDS[
      methods.indexOf(preferredSellingMethod) * 2 + lngs.indexOf(language)
    ];

  const url = "https://beyond.sellcar.hk/api/sendemail";

  const body = {
    ...content,
    templateID,
    emailTo: emailTo
  };
  return new Promise((resolve, reject) => {
    fetch(url, {
      method: "post",
      headers,
      body: JSON.stringify(body)
    })
      .then(res => {
        resolve();
      })
      .catch(err => {
        reject();
      });
  });
};
