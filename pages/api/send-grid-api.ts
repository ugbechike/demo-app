import { NextApiRequest, NextApiResponse } from 'next';
// import sgMail from '@sendgrid/mail';
import client from '@sendgrid/client';

client.setApiKey(process.env.sendGridApiKey);  

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { email, firstName, lastName, message } = req.body;
  console.log('BODY', req.body);
  

  const content = {
    to: email,
    from: 'engr.ugbechike@gmail.com',
    subject: `New Message From - ${firstName}, ${lastName}`,
    html: `
    <p>First Name: ${firstName}</p>
    <p>Last Name: ${lastName}</p>
    <p>Email: ${email}</p>
    <p>Message: ${message} do not reply please...</p>
  `,
  };

  const data = {
    "url": "http://email.myhostname.com",
    "hostname": "myhostname.com",
    "spam_check": false,
    "send_raw": true
  };

  const request = {
    url: `/v3/user/webhooks/parse/settings`,
    method: "POST" as any,
    body: data
  }

  try {
    // await sgMail.send(content);
    await client.request(request);
    
    return res.status(200).send({message: 'Message sent successfully.'});
  }
  catch (error) {
    console.log('ERROR', error);
    return res.status(400).send('Message not sent.');
  }
}