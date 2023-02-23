"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.run = void 0;
const amqp_client_1 = require("@cloudamqp/amqp-client");
async function run() {
    const amqp = new amqp_client_1.AMQPClient("amqp://localhost");
    const conn = await amqp.connect();
    const channel = await conn.channel();
    const queue = await channel.queue("quq");
    const consumer = await queue.subscribe({ noAck: true }, (msg) => {
        void (async () => {
            console.log(msg.bodyToString());
            await consumer.cancel();
        })();
    });
    await queue.publish("Hello World", {});
    await consumer.wait();
    await conn.close();
}
exports.run = run;
//# sourceMappingURL=message_queue.js.map