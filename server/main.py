from flask import Flask
from flask_cors import CORS
from controllers.user.user import part_user
from controllers.ticket.ticket import part_ticket
from controllers.bus.bus import part_bus
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route('/', methods = ['GET'])
def welcome():
	return "Hello World"

app.register_blueprint(part_user)
app.register_blueprint(part_ticket)
app.register_blueprint(part_bus)

if __name__ == '__main__':
    app.run(debug=True,host = '0.0.0.0',port = 4000)

