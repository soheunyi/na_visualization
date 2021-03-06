from flask import Flask, jsonify
from flask_cors import CORS, cross_origin

app = Flask(__name__)

# enables server communication
CORS(app)


@app.route('/')
def hello():
    return jsonify([[1, 2], [3, 4]])


if __name__ == '__main__':
    app.run()
