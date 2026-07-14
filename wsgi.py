import os

from flask import Flask, send_from_directory

APP_DIR = os.path.join(os.path.dirname(os.path.abspath(__file__)), "app")

app = Flask(__name__, static_folder=APP_DIR, static_url_path="")


@app.route("/")
def index():
    return send_from_directory(APP_DIR, "index.html")


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=int(os.environ.get("PORT", 8080)))
