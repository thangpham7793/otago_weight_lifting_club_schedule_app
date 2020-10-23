import { appConfig } from "../utils/config"
import nodemailer, { Transporter } from "nodemailer"
import { MailOptions } from "nodemailer/lib/smtp-transport"

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: appConfig.GMAIL_USER,
    pass: appConfig.GMAIL_PW,
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
      from: "thangnus@gmail.com",
      to: recipientEmail,
      subject: "New Otago Weighlifting Account Info",
      text: `Welcome to Otago Weighlifting Club. Your new username and password are "${recipientUsername}" and "password"`,
    }
  }

  async sendAccountInfo() {
    try {
      const info = await AppMailer.transporter.sendMail(
        AppMailer.formatMailOptions(this.recipientUsername, this.recipientEmail)
      )
      return console.log(info)
    } catch (error) {
      console.error(error)
    }
  }
}
