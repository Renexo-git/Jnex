#!/bin/bash

docker build -t renexo/jnex .
docker run -p 8080:3000 renexo/jnex
