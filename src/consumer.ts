import "dotenv/config";
import RabbitmqService from "./services/RabbitmqService";

const rabbitmqService = new RabbitmqService();

(async () => {
  try {
    await rabbitmqService.connect();
    
    await rabbitmqService.consume();
  } catch(e) {
    console.log(e)
  }
})();