# sleep 10

echo "---------------- Waiting for database to come online ---------------- "

while [ 1 -lt 2 ]; do
    ready=$(pg_isready --host=database)
    if [ $? -eq 0 ]; then break; else
        echo "---------------- Still Waiting ..... ---------------- "
        sleep 2
    fi
done

export PGPASSWORD=$POSTGRES_PASSWORD
echo "---------------- Database Configuration Started ---------------- "
psql -h database -a -U sanil -d monitoringdb -a -f /database/resetdb.sql
psql -h database -a -U sanil -d monitoringdb -a -f /database/init.sql
psql -h database -a -U sanil -d monitoringdb -a -f /database/populate.sql
echo "---------------- Database Configuration Complete ---------------- "

psql -h database -a -U sanil -d monitoringdb -a -c "SELECT set_config('log_statement', 'all', true);"

