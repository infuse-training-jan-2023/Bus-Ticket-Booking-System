from flask import Flask
from flask_cors import CORS
from controllers.user.user_controller import user_controller
from controllers.ticket.ticket_controller import ticket_controller
from controllers.bus.bus_controller import bus_controller

application = Flask(__name__)
CORS(application)

@application.route('/', methods = ['GET'])
def welcome():
	return "Hello World"

application.register_blueprint(user_controller)
application.register_blueprint(ticket_controller)
application.register_blueprint(bus_controller)

if __name__ == '__main__':
    application.run(debug=True)

