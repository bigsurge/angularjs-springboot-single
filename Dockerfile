FROM java
RUN gradle build
RUN java $JAVA_OPTS -jar build/libs/angularjs-sprinboot-single-0.0.1-SNAPSHOT.jar
