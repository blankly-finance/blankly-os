ARG BLANKLY_BASE_IMAGE

FROM $BLANKLY_BASE_IMAGE

WORKDIR /blankly
COPY ./model.zip ./model.zip
RUN unzip ./model.zip
RUN rm ./model.zip

# Do not expose the port until back communication is securely implemented
# EXPOSE 8000

WORKDIR /blankly/model
ENTRYPOINT ["/usr/bin/main-linux", "--start"]
