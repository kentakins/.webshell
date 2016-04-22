git clone https://github.com/pm2-hive/pm2-webshell.git

// install
pm2 install pm2-webshell

// setup
pm2 conf pm2-webshell:bind 127.0.0.1
pm2 set pm2-webshell:port 80

// start
sudo pm2 start

// stop 
sudo pm2 kill

when first cloning need to create symlinks to the pm2 dir

ln -s ~/.webshell/user.js ~/.pm2/node_modules/tty.js/static/user.js                                                                                                                                                                             
ln -s ~/.webshell/user.css ~/.pm2/node_modules/tty.js/static/user.css 
