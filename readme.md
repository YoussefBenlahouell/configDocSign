## Désactiver la sécurité web de Chrome pour les tests CORS

```sh
google-chrome-stable --disable-web-security --user-data-dir=/tmp/cors-test
```
## BD

```sh
docker exec -it mysql mysql -u root -p0000
SHOW  DATABASES;
```

```sh
docker exec -it mysql bash
mysql -uroot -p
SHOW DATABASES;
INSERT INTO user (id_user, email_user, fname_user, lname_user, is_active, is_homme) 
    -> VALUES ('b1234567-89ab-cdef-0123-456789abcdef', 'youssef.benlahouell@gmail.com', 'Youssef', 'Benlahouell', true, true);
    SELECT * FROM user WHERE id_user = 'b1234567-89ab-cdef-0123-456789abcdef';
```
