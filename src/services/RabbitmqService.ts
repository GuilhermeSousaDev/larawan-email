import * as amqp from "amqplib";
import * as jwt from "jsonwebtoken";
import EmailService from "./EmailService";

const { LARAWAN_EMAIL_QUEUE, JWT_SECRET } = process.env;

interface IReceivedMsg {
  id: string;
  name: string;
  email: string;
}

class RabbitmqService {
  private connection: amqp.Connection | null;
  private channel: amqp.Channel | null;

  constructor() {
    this.connection = null;
    this.channel = null;
  }

  public async connect() {
    if (!this.connection) {
      this.connection = await amqp.connect("amqp://larawan:larawan@localhost");
      this.channel = await this.connection.createChannel();
    }
  }

  public async consume() {
    this.channel.assertQueue(LARAWAN_EMAIL_QUEUE, { durable: true });

    this.channel.consume(LARAWAN_EMAIL_QUEUE, async (msg) =>
      this.sendMailAfterConsume(msg.content.toString())
    );
  }

  public async close() {
    if (this.connection) {
      await this.channel.close();
    }
  }

  private async sendMailAfterConsume(user: IReceivedMsg | any) {
    const parsedUser = JSON.parse(user);

    const payload = {
      id: parsedUser.id,
      name: parsedUser.name,
      email: parsedUser.email,
    };

    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "1h" });

    const emailService = new EmailService();

    await emailService.sendMail({
      to: parsedUser.email,
      jwt_link: token,
    });
  }
}

export default RabbitmqService;
