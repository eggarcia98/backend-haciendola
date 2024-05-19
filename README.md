
# Backend Haciendola

Service that provide endpoints to access to information about products and users in a database.


## Used Technologies:
* NodeJS
* Docker
* Fastify  
    * Plugins:  
        * Mysql Connections
        * TypORM
        * Jwt

## Steps to Execute:
Step 1. If It doesn't exist, create the network "haciendola-network" in your docker environment:
```console
$ docker network create haciendola-network   
```

Step 2. Build and Deploy it using the docker-compose configuration included in the repository:
```console
$ docker-compose up --build -d
```

Step 3. You need the database that the API use to get the data, you can restore the dump included in this repository into the mysql docker container executing the next command:
```console
cat db_backup.sql| docker exec -i haciendola-mysql mysql -u root -h 127.0.0.1 -phaciendola-admin
```


