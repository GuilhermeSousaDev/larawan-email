import { Transporter, createTransport } from "nodemailer";

const { APP_HOST } = process.env;

interface ISendMail {
  to: string;
  jwt_link: string;
}

class EmailService {
  private transporter: Transporter | null;

  constructor() {
    this.transporter = createTransport({
      host: "smtp.ethereal.email",
      port: 587,
      auth: {
        user: "sedrick.fritsch@ethereal.email",
        pass: "ycBNa9NjVQtfaVsgXy",
      },
    });
  }

  public async sendMail({ to, jwt_link }: ISendMail) {
    const info = await this.transporter.sendMail({
      from: 'sedrick.fritsch@ethereal.email',
      to,
      subject: "Active Your Account",
      html: `<a href="${APP_HOST}/user/email/${jwt_link}/verify">Open this link to verify your account</a>`,
    });

    console.log(info.messageId, jwt_link);
  }
}

export default EmailService;
