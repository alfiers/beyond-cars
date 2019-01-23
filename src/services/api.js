import { SENDGRID_APIKEY } from "../config";
const headers = {
  Authorization: "Bearer " + SENDGRID_APIKEY
};
export const getSendGridTemplate = template_id => {
  return new Promise((resolve, reject) => {
    const url = "https://api.sendgrid.com/v3/templates/" + template_id;
    fetch(url, { method: "get", headers }).then(
      res => {
        resolve(res);
      },
      err => {
        reject(err);
      }
    );
  });
};

export const sendGridEmail = ({
  emailTo,
  emailFrom = "test@test.com",
  content
}) => {
  const url = "https://api.sendgrid.com/v3/mail/send";

  const body = {
    personalizations: [
      {
        to: [{ email: emailTo }],
        subject: "Test"
      }
    ],
    from: emailFrom,
    content: [
      {
        type: "text/html",
        value: "Test Email"
      }
    ]
  };
  return new Promise((resolve, reject) => {
    fetch(url, {
      method: "post",
      headers,
      body
    })
      .then(res => {
        resolve();
      })
      .catch(err => {
        reject();
      });
  });
};
