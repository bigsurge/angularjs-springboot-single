FROM niaquinto/gradle

MAINTAINER lllianga <lllianga@isoftstone.com>

RUN pwd

RUN ls

RUN gradle --version

RUN /usr/src/app/gradlew build && java $JAVA_OPTS -jar /usr/src/app/build/libs/angularjs-sprinboot-single-0.0.1-SNAPSHOT.jar
