import pika
import time
connection = pika.BlockingConnection(pika.ConnectionParameters(host='192.168.99.100', port=5672))
channel = connection.channel()
channel.queue_declare(queue='task_queue', durable=True)


def callback(ch, method, properties, body):
    print(" [x] Received %r" % body)
    time.sleep(body.count(b'.'))
    print('[x] Done')
    ch.basic_ack(delivery_tag=method.delivery_tag)

channel.basic_qos(prefetch_count=1)
channel.basic_consume(queue='task_queue',
					  on_message_callback=callback)
print(' [*] Waiting for messages. To exit press CTRL+C')
channel.start_consuming()
# channel.basic_publish(exchange='',
#                       routing_key='hello',
#                       body='Hello World')

# print("[x] Sent 'hello world!'")
# connection.close()