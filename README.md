![ScreenShot](https://raw.githubusercontent.com/Renexo-git/Jnex/master/static/images/brands/jnex.png)

Modular framework for creating web systems.

# Nginx - Proxy configuration

## Linux

1-) Create the configuration file called "*jnex.conf*" in **/etc/nginx/sites-available/**

2-) Copy and paste the following instructions into the **/etc/nginx/sites-available/jnex.conf** file

```
upstream server {

    server 127.0.0.1:3000;
    keepalive 64;
}

server {

    listen 8080 default_server;
    listen [::]:8080 default_server;
    server_name _;
    set $SYS_ROOT /var/www/jnex;

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

    location ~ ^/languages/(.*)$ {
        alias $SYS_ROOT/writable/cache/languages/$1;
    }

    location ~ ^/packages/(.*)$ {
        alias $SYS_ROOT/writable/cache/packages/$1;
    }

    location ~ ^/static/(.*)$ {
        alias $SYS_ROOT/static/$1;
    }

    location ~ /\.ht {
        deny all;
    }

}
```
3-) Create the symbolic link:

*root@user:/home/user#* **ln -s /etc/nginx/sites-available/jnex.conf /etc/nginx/sites-enabled/**

4-) Restart the web server:

*root@user:/home/user#* **/etc/init.d/nginx restart**

### All ready
**http://localhost:8080**
