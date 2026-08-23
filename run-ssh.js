const { Client } = require('ssh2');

const conn = new Client();

const commands = [
  "sudo apt-get update -y",
  "sudo apt-get install -y postgresql postgresql-contrib",
  "sudo sed -i \"s/#listen_addresses = 'localhost'/listen_addresses = '*'/\" /etc/postgresql/*/main/postgresql.conf",
  "echo 'host all all 0.0.0.0/0 md5' | sudo tee -a /etc/postgresql/*/main/pg_hba.conf",
  "sudo systemctl restart postgresql",
  "sudo -u postgres psql -c \"CREATE USER resnetwork WITH PASSWORD 'resnetwork123';\"",
  "sudo -u postgres psql -c \"CREATE DATABASE resnetwork_db OWNER resnetwork;\"",
  "sudo -u postgres psql -c \"ALTER ROLE resnetwork SET client_encoding TO 'utf8';\"",
  "sudo -u postgres psql -c \"ALTER ROLE resnetwork SET default_transaction_isolation TO 'read committed';\"",
  "sudo -u postgres psql -c \"ALTER ROLE resnetwork SET timezone TO 'UTC';\"",
  "sudo -u postgres psql -c \"GRANT ALL PRIVILEGES ON DATABASE resnetwork_db TO resnetwork;\"",
  "sudo -u postgres psql -d resnetwork_db -c \"GRANT ALL ON SCHEMA public TO resnetwork;\""
];

conn.on('ready', () => {
  console.log('Client :: ready');
  let i = 0;
  
  function runNext() {
    if (i >= commands.length) {
      console.log('All commands executed.');
      conn.end();
      return;
    }
    
    const cmd = commands[i];
    console.log(`Running: ${cmd}`);
    
    conn.exec(cmd, (err, stream) => {
      if (err) throw err;
      
      stream.on('close', (code, signal) => {
        console.log(`Command closed with code ${code}`);
        i++;
        runNext();
      }).on('data', (data) => {
        console.log('STDOUT: ' + data);
      }).stderr.on('data', (data) => {
        console.error('STDERR: ' + data);
      });
    });
  }
  
  runNext();
}).connect({
  host: '185.129.51.79',
  port: 22,
  username: 'root',
  password: 'Vagati17!'
});
