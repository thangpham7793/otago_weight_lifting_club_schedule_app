import path from "path"
import { appConfig } from "../utils/config"
import nodemailer, { Transporter } from "nodemailer"
import { MailOptions } from "nodemailer/lib/smtp-transport"

//https://stackoverflow.com/questions/51933601/what-is-the-definitive-way-to-use-gmail-with-oauth-and-nodemailer

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: appConfig.GMAIL_USER,
    pass: appConfig.GMAIL_PW,
    clientId: appConfig.OAUTH_CLIENTID,
    clientSecret: appConfig.OAUTH_CLIENTSECRET,
    refreshToken: appConfig.OAUTH_REFRESHTOKEN,
    accessToken: appConfig.OAUTH_ACCESSTOKEN,
  },
})

export default class AppMailer {
  static transporter: Transporter = transporter

  constructor(
    private recipientUsername: string,
    private recipientEmail: string
  ) {
    this.recipientEmail = recipientEmail
    this.recipientUsername = recipientUsername
  }

  static formatMailOptions(
    recipientUsername: string,
    recipientEmail: string
  ): MailOptions {
    return {
      from: appConfig.GMAIL_USER,
      to: recipientEmail,
      subject: "New Otago Weighlifting Account Info",
      html: `
      <h2>  
        Welcome to Otago Weighlifting! 
      </h2>
      <div>
        <img src='cid:club_logo' style='width: 200px; height: 200px;'/>
      </div>
      <p>
        Your new username and password are <strong>${recipientUsername}</strong> and <strong>password</strong>.
      </p>
      <p>
        The training app can be reached at this <a href='lifting-schedule-v2.herokuapp.com/'>link</a>.
      </p>
      <p>
        Please contact your coach for any questions about logging in or using the app.
      </p>
      `,
      attachments: [
        {
          filename: "logo.jpg",
          path: path.join(__dirname, "logo.jpg"),
          cid: "club_logo",
        },
      ],
    }
  }

  async sendAccountInfo() {
    console.log(
      `Sending Account Info to ${this.recipientEmail} for new user ${this.recipientUsername}`
    )
    try {
      const info = await AppMailer.transporter.sendMail(
        AppMailer.formatMailOptions(this.recipientUsername, this.recipientEmail)
      )
      return console.log(info)
    } catch (error) {
      console.error(error)
    } finally {
      return AppMailer.transporter.close()
    }
  }
}
