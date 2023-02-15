from flask import Flask
from flask_cors import CORS
from controllers.user.user_controller import user_controller
from controllers.ticket.ticket_controller import ticket_controller
from controllers.bus.bus_controller import bus_controller

app = Flask(__name__)
CORS(app)

@app.route('/', methods = ['GET'])
def welcome():
	return "Hello World"

app.register_blueprint(user_controller)
app.register_blueprint(ticket_controller)
app.register_blueprint(bus_controller)

if __name__ == '__main__':
    app.run(debug=True,host = '0.0.0.0',port = 4000)

