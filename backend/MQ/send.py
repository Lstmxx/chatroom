import pika
import sys
connection = pika.BlockingConnection(pika.ConnectionParameters(host='192.168.99.100', port=5672))
channel = connection.channel()
channel.queue_declare(queue='task_queue', durable=True)
message = ' '.join(sys.argv[1:]) or "hello world!!!"

channel.exchange_declare(exchange='logs', exchange_type='fanout')
channel.basic_publish(exchange='',
                      routing_key='task_queue',
                      body=message
											)

print(f"send {message} complete")
connection.close()