FROM niaquinto/gradle

MAINTAINER lllianga <lllianga@isoftstone.com>
RUN gradle build
RUN java $JAVA_OPTS -jar build/libs/angularjs-sprinboot-single-0.0.1-SNAPSHOT.jar
