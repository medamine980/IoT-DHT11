from twilio.rest import Client

class WhatsappAlert:

    def __init__(self, account_sid, 
                 auth_token, 
                 to_phone='+212639180575',
                 from_phone='+14155238886'):
        self.account_sid = account_sid
        self.auth_token = auth_token
        self.to_phone = to_phone
        self.from_phone = from_phone
        self.client = Client(account_sid, auth_token)

    def send_message(self, body):
        if body:
            message = self.client.messages.create(
                from_=f'whatsapp:{self.from_phone}',
                body=body,
                to=f'whatsapp:{self.to_phone}'
            )