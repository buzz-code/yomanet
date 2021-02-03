ssh -L27018:localhost:PORT USERNAME:PASSWORD@188.34.183.27 '
    echo "Connected on Remote End, sleeping for 10"; 
    sleep 10; 
    exit' &
echo "Waiting 5 sec on local";
sleep 5;
echo "Connecting to Mongo and piping in script";
mongodump --port=PORT -u USERNAME -p PASSWORD --authenticationDatabase=admin --archive --db=vocal | mongorestore --port=27017 --archive  --db=vocal