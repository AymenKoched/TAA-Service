const Kafka = require("node-rdkafka");
const dotenv = require("dotenv");

dotenv.config();

const kafkaBroker = process.env.KAFKA_BROKER;
const ERR_TOPIC_ALREADY_EXISTS = 36;

function ensureTopicExists(topic) {
  // eslint-disable-next-line no-console
  console.log(`connecting to kafka broker ${kafkaBroker}`);
  const adminClient = Kafka.AdminClient.create({
    "bootstrap.servers": kafkaBroker
  });

  return new Promise((resolve, reject) => {
    adminClient.createTopic(
      {
        topic,
        // eslint-disable-next-line camelcase
        num_partitions: 1,
        // eslint-disable-next-line camelcase
        replication_factor: 1
      },
      err => {
        if (!err) {
          // eslint-disable-next-line no-console
          console.log(`Created topic ${topic}`);
          return resolve();
        }

        if (err.code === ERR_TOPIC_ALREADY_EXISTS) {
          return resolve();
        }

        return reject(err);
      }
    );
  });
}

function createProducer(onDeliveryReport) {
  const producer = new Kafka.Producer({
    "bootstrap.servers": kafkaBroker,
    // eslint-disable-next-line camelcase
    dr_msg_cb: true
  });

  return new Promise((resolve, reject) => {
    producer
      .on("ready", () => resolve(producer))
      .on("delivery-report", onDeliveryReport)
      .on("event.error", err => {
        // eslint-disable-next-line no-console
        console.warn("event.error", err);
        reject(err);
      });
    producer.connect();
  });
}

async function produceExample() {
  const myTopic = "main-topic";
  await ensureTopicExists(myTopic);

  const producer = await createProducer((err, report) => {
    if (err) {
      // eslint-disable-next-line no-console
      console.warn("Error producing", err);
    } else {
      const { topic, partition, value } = report;
      // eslint-disable-next-line no-console
      console.log(
        `Successfully produced record to topic "${topic}" partition ${partition} ${value}`
      );
    }
  });

  // eslint-disable-next-line no-plusplus
  for (let idx = 0; idx < 10; ++idx) {
    const key = "alice";
    const value = Buffer.from(JSON.stringify({ count: idx }));

    // eslint-disable-next-line no-console
    console.log(`Producing record ${key}\t${value}`);

    producer.produce(myTopic, -1, value, key);
  }

  producer.flush(10000, () => {
    producer.disconnect();
  });
}

produceExample().catch(err => {
  console.error(`Something went wrong:\n${err}`);
  process.exit(1);
});
