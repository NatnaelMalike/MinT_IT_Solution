export default function inviteEmail(recipientName, role, inviteLink) {
  return `
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Invitation to Join the IT Support System</title>
    <style>
      body {
        font-family: Georgia, Times, "Times New Roman", serif;
        line-height: 1.6;
        background-color: #f4f4f4;
        padding: 20px;
        color: #333;
      }
      .container {
        max-width: 600px;
        background: #fff;
        margin: 0 auto;
        padding: 30px;
        border-radius: 8px;
        box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
      }
      h1 {
        font-size: 24px;
        color: #2c3e50;
      }
      p {
        font-size: 16px;
        margin-bottom: 20px;
      }
      .btn {
        display: inline-block;
        padding: 12px 25px;
        background-color: #058a48;
        color: #fff;
        text-decoration: none;
        border-radius: 5px;
        font-size: 16px;
        font-weight: bold;
      }
      .footer {
        margin-top: 30px;
        font-size: 12px;
        color: #777;
        text-align: center;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <h1>You're Invited to Join Our IT Support System</h1>
      <p>Hello ${recipientName},</p>

      <p>
        You have been invited to join our IT Support System as a <br>
        <strong>[${role}]</strong>. <br>Please click the button
        below to complete your registration and gain access to the platform:
      </p>

      <p><a href=${inviteLink} class="btn">Accept Invitation</a></p>

      <p>
        This link is unique to you and will expire in <strong>24 hours</strong>.
        If you did not expect this invitation, please disregard this email.
      </p>

      <p>We look forward to having you on board!</p>

      <p>Best regards,</p>
      <p><strong>Ministy of Innovation and Technology</strong></p>

  
    </div>
  </body>
</html>
`;
}
