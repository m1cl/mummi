SERVER='http://localhost:8080'
CLIENT='CLI'
USERNAME='admin'
PASSWORD='admin'
SALT="$(openssl rand -hex 20)"
TOKEN="$(echo -n "${PASSWORD}${SALT}" | md5sum | awk '{ print $1 }')"
echo ${SALT}
echo ${TOKEN}
curl "${SERVER}/rest/ping.view?u=${USERNAME}&t=${TOKEN}&s=${SALT}&v=1.15.0&c=${CLIENT}"
