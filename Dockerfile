FROM niaquinto/gradle

MAINTAINER lllianga <lllianga@isoftstone.com>

RUN echo $(pwd)

RUN cd /app && echo $(ls)

RUN gradle --version


ENTRYPOINT ["/app/gradlew bootRun"]

