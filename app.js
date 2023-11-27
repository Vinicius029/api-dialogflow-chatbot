const express = require('express');
const app = express();
const mysql = require('mysql');
require('dotenv').config();


const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME
});
  
db.connect(err => {
    if (err) {
        console.error('Erro ao conectar ao banco de dados: ' + err.stack);
        return;
    }
    console.log('Conectado ao banco de dados');
});



app.get('/usuario/:id', (req, res) => {
    const username = req.params.id;
  
    db.query('SELECT * FROM pessoas WHERE id = ?', [username], (err, results) => {
      if (err) {
        res.status(500).send('Erro ao buscar no banco de dados');
        return;
      }
  
      if (results.length > 0) {
        res.json(`${results[0].nome}`); // Envia os detalhes do usuário como JSON
      } else {
        res.status(404).send('Usuário não encontrado');
      }
    });
  });



app.get('/', (req, res) => {
    res.send('Olá, mundo!');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
