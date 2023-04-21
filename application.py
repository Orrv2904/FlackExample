from flask import Flask, request, redirect, render_template
from flask_socketio import emit, join_room, SocketIO
from dotenv import load_dotenv
load_dotenv()

app = Flask(__name__)
app.config['SECRET_KEY'] = 'mysecretkey'
socketio = SocketIO(app, cors_allowed_origins="*")

@app.route('/')
def index():
    return render_template("index.html")

@socketio.on("join_room")
def Join(room):
    join_room(room)
    emit('mensaje', f"Un usuario ah ingresado a la Sala {room}", broadcast=False,
        include_self=False, to=room)
    
    return room

@socketio.on("message")
def message(data):
    emit("message", data["message"], broadcast=False, include_self=True, to=data["room"])
