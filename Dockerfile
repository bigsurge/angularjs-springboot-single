FROM niaquinto/gradle

MAINTAINER lllianga <lllianga@isoftstone.com>

RUN echo $(pwd)

RUN echo $(ls)

RUN gradle --version

RUN cd /app && gradle build  

ENTRYPOINT ["java $JAVA_OPTS -jar /app/build/libs/angularjs-sprinboot-single-0.0.1-SNAPSHOT.jar"]

