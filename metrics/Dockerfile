FROM python:3.7-slim

WORKDIR /metrics
COPY ./main.py ./main.py

RUN pip install quantstats
RUN pip install flask
RUN pip install flask_cors
RUN pip install waitress
RUN pip install sentry-sdk
RUN pip install blinker
RUN pip install pandas
RUN pip install numpy

RUN mkdir account_values

EXPOSE 80
ENV PORT=80

ENTRYPOINT ["python", "./main.py"]
