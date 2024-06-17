from flask import Flask, request, jsonify
from flask_cors import CORS

import textwrap
import os
import google.generativeai as genai

from IPython.display import display
from IPython.display import Markdown




app = Flask(__name__)
CORS(app)


def to_markdown(text):
    text = text.replace('•', ' *')
    return textwrap.indent(text, '> ', predicate=lambda _: True)


Gemini_key = os.getenv('GEMINI_API_KEY')

if not Gemini_key:
    raise ValueError("API_KEY note set")
genai.configure(api_key=Gemini_key )

model = genai.GenerativeModel('gemini-1.5-flash-latest')

@app.route('/Generate', methods=['POST'])
@app.route('/Chat',     methods=['POST'])
@app.route('/Summary', methods=['POST'])
def summarize():
    data = request.get_json()

    text = data.get('text')

    # Process the text here
    # For example, let's just return the text reversed
    chat = model.start_chat(history=[])
    response = chat.send_message(text, stream=False)
    markdown_responses = []

    for message in chat.history:
        markdown_response = to_markdown(f'{message.role}: {message.parts[0].text}')
        markdown_responses.append(str(markdown_response))

    return jsonify({'summary': markdown_responses})


@app.route('/Generate', methods=['POST'])
def generate():

    data = request.get_json()
    text = data.get('text')

    chat = model.start_chat(history=[])
    response = chat.send_message(text, stream=False)
    markdown_response = []

    for message in chat.history:
        markdown_response = to_markdown(f'{message.role}: {message.parts[0].text}')
        markdown_responses.append(str(markdown_response))

    return jsonify({'summary': markdown_responses})

if __name__ == '__main__':
    app.run(debug=True)


