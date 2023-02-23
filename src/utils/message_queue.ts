import { AMQPClient } from "@cloudamqp/amqp-client";

export async function run() {
	const amqp = new AMQPClient("amqp://localhost");
	const conn = await amqp.connect();
	const channel = await conn.channel();
	const queue = await channel.queue("quq");

	const consumer = await queue.subscribe({ noAck: true }, (msg) => {
		void (async () => {
			console.log(msg.bodyToString());

			await consumer.cancel();
		})();
	});

	await queue.publish("Hello World", {  });
	await consumer.wait();
	await conn.close();
}
