FROM quay.io/keycloak/keycloak:18.0.0 as builder

WORKDIR /opt/keycloak

RUN keytool -genkeypair -storepass password -storetype PKCS12 -keyalg RSA -keysize 2048 -dname "CN=server" -alias server -ext "SAN:c=DNS:localhost,IP:127.0.0.1" -keystore conf/server.keystore
COPY ./themes/signatury /opt/keycloak/themes/docdoc

# Copy the realm export
COPY ./realm-export.json /opt/keycloak/data/import/realm-export.json

RUN /opt/keycloak/bin/kc.sh build  

FROM quay.io/keycloak/keycloak:18.0.0
COPY --from=builder /opt/keycloak/ /opt/keycloak/
 
ENV KEYCLOAK_ADMIN=admin \
    KEYCLOAK_ADMIN_PASSWORD=admin \
    KC_PROXY=edge\
    KC_HTTP_RELATIVE_PATH=/auth
    
ENTRYPOINT ["/opt/keycloak/bin/kc.sh" , "start-dev" , "--import-realm"]
