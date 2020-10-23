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
    private recipientEmail: string,
    private recipientUsername: string
  ) {
    this.recipientEmail = recipientEmail
    this.recipientUsername = recipientUsername
  }

  static formatMailOptions(
    recipientEmail: string,
    recipientUsername: string
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
      return await AppMailer.transporter.sendMail(
        AppMailer.formatMailOptions(this.recipientEmail, this.recipientUsername)
      )
    } catch (error) {
      console.error(error)
    }
  }
}
