import requests

class TelegramAlert:

    def __init__(self, token, chat_id):
        self.url = f"https://api.telegram.org/bot{token}/sendMessage"
        self.chat_id = chat_id

    def send_message(self, message):
        payload = {
            'chat_id': self.chat_id,
            'text': message
        }
        response = requests.post(self.url, data=payload)
        return response
