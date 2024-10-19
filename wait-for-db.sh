#!/bin/sh

until mysqladmin ping -h "db_auth" -u "root" -p"saravia"; do
    echo "Esperando a que MySQL este list..."
    sleep 25
done

npm run dev
