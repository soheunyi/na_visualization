from flask import Flask, render_template
from flask_socketio import SocketIO
from flask_cors import CORS
from wavy_interpolation import wavy_interpolation

app = Flask(__name__)
CORS(app)
socketio = SocketIO(app, cors_allowed_origins="*")


@app.route('/')
def main():
    return


@socketio.on('pivotal points')
def get_pivotal_points(json):

    print('received pviotal points: ' + str(json))
    json = wavy_interpolation(json, 100, 1, path_points_num=250).tolist()
    socketio.emit('path points', json)


if __name__ == '__main__':
    socketio.run(app, debug=False)
