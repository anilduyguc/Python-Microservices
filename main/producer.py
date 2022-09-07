import pika, json

params = pika.URLParameters('amqps://yyihqbpc:E-ZyTX0xIbx5_FeevGtTtEUiSPuH9KOE@beaver.rmq.cloudamqp.com/yyihqbpc')

connection = pika.BlockingConnection(params)

channel = connection.channel()


def publish(method, body):
    properties = pika.BasicProperties(method)
    channel.basic_publish(exchange='', routing_key='admin', body=json.dumps(body), properties=properties)
