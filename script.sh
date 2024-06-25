

$NOTIFICATION_MAIL=eljyassine1@gmail.com
$NOTIFICATION_MAIL_PASSWORD=cgtupnajkkhoarok


mvn -f  spring/configServer/pom.xml  clean install jib:dockerBuild -Djib.to.image=configserver:0.0.1  -DskipTests=true 
mvn -f  spring/eureka/pom.xml clean install jib:dockerBuild -Djib.to.image=eureka:0.0.1  -DskipTests=true
mvn -f  spring/gateway/pom.xml  clean install jib:dockerBuild -Djib.to.image=gateway:0.0.1  -DskipTests=true
mvn -f  spring/userMS/pom.xml clean install jib:dockerBuild -Djib.to.image=user:0.0.1  -DskipTests=true
mvn -f  spring/templateMS/pom.xml clean install jib:dockerBuild -Djib.to.image=template:0.0.1  -DskipTests=true
mvn -f  spring/documentMS/pom.xml clean install jib:dockerBuild -Djib.to.image=document:0.0.1  -DskipTests=true
docker build -t angular:0.0.1 -f angular/docsign/Dockerfile .
docker build -t keycloak:0.0.1 -f keycloak/Dockerfile . 

docker-compose up


# docker run -p 8180:8080 keycloak:0.0.1
# docker run -p 8888:8888 configserver:0.0.1
# docker run -p 8761:8761 eureka:0.0.1
# docker run -p 9999:9999 gateway:0.0.1
# docker run -p 9300:9300 user:0.0.1
# docker run -p 80:80 angular:0.0.1
# docker run -p 8543:8543 template:0.0.1
# docker run -p 9100:9100 document:0.0.1

