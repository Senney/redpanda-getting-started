import { redpanda } from './panda';

const admin = redpanda.admin();

class RedPandaAdmin {
  static async createTopic(
    topicName: string,
    partitions?: number,
    replicas?: number
  ): Promise<void> {
    await admin.connect();
    const topics = await admin.listTopics();

    if (!topics.includes(topicName)) {
      await admin.createTopics({
        topics: [
          {
            topic: topicName,
            numPartitions: partitions ?? 1,
            replicationFactor: replicas ?? 1,
          },
        ],
      });
    }

    await admin.disconnect();
  }
}

export { RedPandaAdmin };
