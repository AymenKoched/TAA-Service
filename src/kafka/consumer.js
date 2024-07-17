const Kafka = require("node-rdkafka");
const dotenv = require("dotenv");

dotenv.config();

const kafkaBroker = process.env.KAFKA_BROKER;
const topic = "main-topic";

function createConsumer(onData) {
  const consumer = new Kafka.KafkaConsumer(
    {
      "bootstrap.servers": kafkaBroker,
      "group.id": "primary-group"
    },
    {
      "auto.offset.reset": "earliest"
    }
  );

  return new Promise(resolve => {
    consumer.on("ready", () => resolve(consumer)).on("data", onData);
    consumer.connect();
  });
}

async function consumerExample() {
  // eslint-disable-next-line no-console
  console.log(`Consuming records from ${topic}`);

  let seen = 0;

  const consumer = await createConsumer(({ key, value, partition, offset }) => {
    // eslint-disable-next-line no-console
    console.log(
      // eslint-disable-next-line max-len,no-plusplus
      `Consumed record with key ${key} and value ${value} of partition ${partition} @ offset ${offset}. Updated total count to ${++seen}`
    );
  });

  consumer.subscribe([topic]);
  consumer.consume();

  process.on("SIGINT", () => {
    // eslint-disable-next-line no-console
    console.log("\nDisconnecting consumer ...");
    consumer.disconnect();
  });
}

consumerExample().catch(err => {
  console.error(`Something went wrong:\n${err}`);
  process.exit(1);
});
