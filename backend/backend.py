from flask import Flask, request, jsonify
import os
import psutil
import pyttsx3
import webbrowser
import shutil
import random
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Enable CORS

# Function to speak text safely
def speak(text):
    engine = pyttsx3.init()  # Create a new engine instance for each request
    engine.setProperty('rate', 150)
    engine.say(text)
    engine.runAndWait()
    engine.stop()  # Ensure engine stops after speaking

# Function to get system stats
def get_system_stats():
    return {
        "cpu": psutil.cpu_percent(interval=1),
        "memory": round(psutil.virtual_memory().used / (1024 * 1024 * 1024), 2),  # GB
        "network": round(psutil.net_io_counters().bytes_sent / (1024 * 1024), 2),  # MB
        "uptime": round(psutil.boot_time())  # Seconds
    }

@app.route('/system_status', methods=['GET'])
def system_status():
    return jsonify(get_system_stats())

# Function to get environment stats
def get_environment_stats():
    try:
        if hasattr(psutil, "sensors_temperatures"):
            temperatures = psutil.sensors_temperatures()
            if temperatures:
                temperature = round(list(temperatures.values())[0][0].current, 2)
            else:
                raise AttributeError
        else:
            raise AttributeError
    except AttributeError:
        temperature = round(random.uniform(20, 30), 2)  # Fallback for Windows

    humidity = round(random.uniform(30, 70), 2)  # Simulated humidity
    power_draw = round(random.uniform(100, 300), 2)  # Simulated power usage

    return {
        "temperature": temperature,
        "humidity": humidity,
        "power_draw": power_draw
    }

@app.route('/environment_status', methods=['GET'])
def environment_status():
    return jsonify(get_environment_stats())

# Function to handle voice commands
@app.route('/voice_command', methods=['POST'])
def voice_command():
    data = request.json
    command = data.get("command", "").lower()

    response = "Sorry, I didn't understand that."

    # Greeting when mic is activated
    if command == "voice":
        response = "Hello Hanuman, I am your AI assistant. How can I help you?"

    # Open applications
    elif "open chrome" in command:
        webbrowser.open("https://www.google.com")
        response = "Opening Chrome."

    elif "open youtube" in command:
        webbrowser.open("https://www.youtube.com")
        response = "Opening YouTube."

    elif "open notepad" in command:
        os.system("notepad.exe")
        response = "Opening Notepad."

    # File operations
    elif "create file" in command:
        with open("newfile.txt", "w") as f:
            f.write("This is a new file.")
        response = "File created successfully."

    elif "delete file" in command:
        if os.path.exists("newfile.txt"):
            os.remove("newfile.txt")
            response = "File deleted successfully."
        else:
            response = "File not found."

    elif "move file" in command:
        if os.path.exists("newfile.txt"):
            shutil.move("newfile.txt", "movedfile.txt")
            response = "File moved successfully."
        else:
            response = "File not found."

    elif "rename file" in command:
        if os.path.exists("newfile.txt"):
            os.rename("newfile.txt", "renamedfile.txt")
            response = "File renamed successfully."
        else:
            response = "File not found."

    speak(response)  # Speak the response
    return jsonify({"command": command, "response": response})

if __name__ == '__main__':
    app.run(debug=True, port=5000)
