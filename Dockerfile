FROM niaquinto/gradle

MAINTAINER lllianga <lllianga@isoftstone.com>

RUN echo $(pwd)
WORKDIR /app
RUN ls

RUN gradle --version


ENTRYPOINT ["/app/gradlew bootRun"]

