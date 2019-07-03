# METSCOPE SETUP

## DATABASE:

Install postgres:
`sudo apt install postgresql postgresql-contrib`

Start/stop service:
`sudo service postgresql [start/stop]`

Login and setup database:
`sudo -i -u psql postgres`

Create user:
`CREATE ROLE metscope WITH LOGIN PASSWORD 'password';`

ALTER POSTGRES CONF FILE (/etc/postgresql/10/main/pg_hba.conf) TO USE MD5 (password) INSTEAD OF PEER AUTH
Otherwise the databse user must also exist (and be logged in) on the server

`ALTER ROLE metscope CREATEDB;`

Logout and login as new user:
`\q`
`psql -U metscope -d postgres`

Run as metscope user:
`CREATE DATABASE metscope`

Connect to new database:
`\c metscope`

Create table for webcams:

```
CREATE TABLE webcams (
    id SERIAL PRIMARY KEY,
    name VARCHAR(30),
    date TIMESTAMPTZ,
    url TEXT,
    location TEXT
);
```

## PM2

Install PM2 globally:
`npm install --global pm2@latest`

Generate startup script:
`pm2 startup systemd`

Copy and paste command from last line of output (replace username with user):
`sudo env PATH=$PATH:/usr/bin /usr/lib/node_modules/pm2/bin/pm2 startup systemd -u mttchpmn --hp /home/mttchpmn`

Start app:
`pm2 start app.js --name metscope`

PM2 Cheatsheet

```
# Fork mode
pm2 start app.js --name my-api # Name process

# Cluster mode
pm2 start app.js -i 0        # Will start maximum processes with LB depending on available CPUs
pm2 start app.js -i max      # Same as above, but deprecated.
pm2 scale app +3             # Scales `app` up by 3 workers
pm2 scale app 2              # Scales `app` up or down to 2 workers total

# Listing

pm2 list               # Display all processes status
pm2 jlist              # Print process list in raw JSON
pm2 prettylist         # Print process list in beautified JSON

pm2 describe 0         # Display all informations about a specific process

pm2 monit              # Monitor all processes

# Logs

pm2 logs [--raw]       # Display all processes logs in streaming
pm2 flush              # Empty all log files
pm2 reloadLogs         # Reload all logs

# Actions

pm2 stop all           # Stop all processes
pm2 restart all        # Restart all processes

pm2 reload all         # Will 0s downtime reload (for NETWORKED apps)

pm2 stop 0             # Stop specific process id
pm2 restart 0          # Restart specific process id

pm2 delete 0           # Will remove process from pm2 list
pm2 delete all         # Will remove all processes from pm2 list

# Misc

pm2 reset <process>    # Reset meta data (restarted time...)
pm2 updatePM2          # Update in memory pm2
pm2 ping               # Ensure pm2 daemon has been launched
pm2 sendSignal SIGUSR2 my-app # Send system signal to script
pm2 start app.js --no-daemon
pm2 start app.js --no-vizion
pm2 start app.js --no-autorestart
```

## NGINX

Install NGINX:
`sudo apt install nginx`

Check apps allowed through firewall:
`sudo ufw app list`

Allow Nginx through the firewall:
`sudo ufw allow 'Nginx HTTP`

Verify change:
`sudo ufw status`

Check status of Nginx:
`systemctl status nginx`

Stop /start Nginx
`sudo systemctl [start/stop/restart/reload/disable/enable] nginx`

Obtain public IP address:
`curl -4 icanhazip.com`

Create site config file named api.metscope.com in /etc/nginx/sites-available:

```
server {
    listen 80;

    server_name api.metscope.com;

    location / {
        proxy_pass http://localhost3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

Create linked copy in /etc/nginx/sites-enabled:
`cd /etc/nginx/sites-enabled`
`ln -s /etc/nginx/sites-available/api.metscope.com`

Test setup:
`sudo nginx -t`

Reload nginx:
`sudo systemctl reload nginx`

## HTTPS

Add Certbot PPA:

```
sudo apt-get update
sudo apt-get install software-properties-common
sudo add-apt-repository universe
sudo add-apt-repository ppa:certbot/certbot
sudo apt-get update
```

Install Certbot:
`sudo apt-get install certbot python-certbot-nginx`

Setup Certbot with Nginx:
`sudo certbot --nginx`

Test automatic renewal:
`sudo certbot renew --dry-run`

Allow Nginx https through firewall:
`sudo ufw status`
`sudo ufw allow 'Nginx Full'`
`sudo ufw delete allow 'Nginx HTTP'`

Restart Nginx:
`sudo systemctl restart nginx'
