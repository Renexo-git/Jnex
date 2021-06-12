![ScreenShot](https://raw.githubusercontent.com/Renexo-git/Jnex/master/static/images/brands/jnex.png)

Modular framework for creating web systems.

# INSTALL

## Linux

1) renexo@renexo:~$ **cd /path/to/jnex/modules/global/packages/**
2) renexo@renexo:~/path/to/jnex/modules/global/packages$ **npm install**
3) Configure Nginx proxy

# Nginx - Proxy configuration

File: **/etc/nginx/sites-available/jnex.conf**

Change according to your settings:

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
