from flask import Flask
from controllers.user.user import part_user
from controllers.ticket.ticket import part_ticket
from controllers.bus.bus import part_bus

app = Flask(__name__)

@app.route('/', methods = ['GET'])
def welcome():
	return "Hello World"

app.register_blueprint(part_user)
app.register_blueprint(part_ticket)
app.register_blueprint(part_bus)

if __name__ == '__main__':
    app.run(debug=True,host = '0.0.0.0',port = 4000)

