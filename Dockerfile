FROM ubuntu:latest

# Update Packages
RUN apt update -y 
RUN apt upgrade -y 

RUN apt install -y curl zip

# Install Node
RUN curl -o- https://deb.nodesource.com/setup_12.x | bash
RUN apt install -y nodejs

# Install Yarn
RUN curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | apt-key add -
RUN echo "deb https://dl.yarnpkg.com/debian/ stable main" | tee /etc/apt/sources.list.d/yarn.list
RUN apt update
RUN apt install yarn -y

# Install gm dependences
RUN apt -y install graphicsmagick ghostscript

# Clean
RUN apt autoclean
RUN apt clean
RUN apt autoremove
