const amqplib = require('amqplib');

const {MESSAGE_BROKER_URL,EXCHANGE_NAME} = require('../config/serverConfig');

const createChannel = async () => {
    try {
        //1. connect with message broker
        const connection = await amqplib.connect(MESSAGE_BROKER_URL);
        //2. create a channel 
        const channel = await connection.createChannel();
        await channel.assertExchange(EXCHANGE_NAME,'direct',false);//to distribute the messages between the multiple queue
        return channel;
    } catch (error) {
        throw error;
    }
    
}

const subscribeMessage = async (channel, service, binding_key) =>{
    try {
        const applicationQueue = await channel.assertQueue('QUEUE_NAME');

        channel.bindQueue(applicationQueue.queue, EXCHANGE_NAME , binding_key);
        channel.consume(applicationQueue.queue, msg=>{
            console.log('Received data');
            console.log(msg.content.toString());
            channel.ack(msg);
        });
    } catch (error) {
        throw error;
    }
    
}

const publishMessage = async (channel,binding_key,message)=>{
    try {
        channel.assertQueue('QUEUE_NAME');
        await channel.publish(EXCHANGE_NAME,binding_key,Buffer.from(message));

    } catch (error) {
        throw error;
    }
}

module.exports = {
    subscribeMessage,
    createChannel,
    publishMessage
}