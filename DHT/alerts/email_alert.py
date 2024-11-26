from django.core.mail import send_mail
from django.conf import settings

class EmailAlert:

    def __init__(self, recipient_list):
        self.recipient_list = recipient_list

    def send_mail(self, subject, message):
        email_from = settings.EMAIL_HOST_USER
        send_mail(subject, message, email_from, self.recipient_list)