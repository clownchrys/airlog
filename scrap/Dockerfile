FROM tiangolo/uvicorn-gunicorn-fastapi:python3.7

USER root

# essential-tools 설치
RUN apt update
RUN apt install -y unzip xvfb libxi6 libgconf-2-4 default-jdk

# chrome 설치
RUN curl -sS -o - https://dl-ssl.google.com/linux/linux_signing_key.pub | apt-key add
RUN echo "deb [arch=amd64] http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google-chrome.list
RUN apt update
# RUN apt install -y google-chrome-stable=94.0.4606.61-1

# chrome-driver 설치
# RUN wget https://chromedriver.storage.googleapis.com/"$(google-chrome --version | awk '{print $3}')"/chromedriver_linux64.zip

# RUN wget https://chromedriver.storage.googleapis.com/94.0.4606.41/chromedriver_linux64.zip
# RUN unzip chromedriver_linux64.zip
# RUN chown root:root chromedriver
# RUN chmod +x chromedriver
# RUN mv chromedriver /usr/bin/chromedriver

# requirements 설치
COPY ./requirements.txt /app/requirements.txt
RUN pip install -U pip
RUN pip install -r requirements.txt