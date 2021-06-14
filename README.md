![ScreenShot](https://raw.githubusercontent.com/Renexo-git/Jnex/master/static/images/brands/jnex.png)

Modular framework for creating web systems.

# INSTALL

**Requirements:**
- DBMS (Data Base Management System) supported by [Sequelize](https://sequelize.org) ORM or MongoDB.
- Nginx
- Node.js (v10 +)

### Linux

1) configure the file: **jnex/config.yaml**
2) renexo@renexo:~$ **cd jnex**
3) renexo@renexo:~/jnex$ **node index.js**

### => *Packages are automatically installed on first run.*

#### Configure Nginx proxy

File: **/etc/nginx/sites-available/jnex.conf**

*Change according to your needs:*

- server **127.0.0.1:3000**;
- alias **/path/to/jnex/static/**$1;

```
upstream server {
    server 127.0.0.1:3000;
    keepalive 64;
}

server {

    listen 8080 default_server;
    listen [::]:8080 default_server;
    server_name _;

    location / {
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $http_host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Fowarded-Proto $scheme;
        proxy_set_header X-NginX-Proxy true;
        proxy_cache_bypass $http_upgrade;
        proxy_redirect off;
        proxy_read_timeout 240s;
        proxy_pass http://server/;
    }

    location ~ ^/static/(.*)$ {
        alias /path/to/jnex/static/$1;
    }

    location ~ /\.ht {
        deny all;
    }

}
```

### :+1: All ready
**http://localhost:8080**
