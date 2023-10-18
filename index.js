const express = require('express');
const cors = require('cors');

const app = express();
const port = 3000;

const { User, sequelize } = require('./database');

app.use(express.json());
app.use(cors());

app.post('/cadastro', async (req, res) => {
    const { nome, email, senha, confSenha } = req.body;

    if (senha !== confSenha) {
        return res.status(400).send('As senhas não conferem!');
    }

    try {
        await User.create({
            name: nome,
            email: email,
            password: senha
        });
        return res.status(201).send('Usuário criado com sucesso!');
    } catch (error) {
        console.error('Erro ao criar usuário:', error);
        return res.status(500).send('Erro ao criar usuário');
    }
});

app.post('/login', (req, res) => {
    const { email, senha } = req.body;
    User.findOne({
        where: {
            email: email,
            password: senha
        }
    }).then(user => {
        if (user) {
            return res.status(200).send('Login realizado com sucesso!');
        } else {
            return res.status(400).send('Usuário ou senha incorretos!');
        }
    }).catch(error => {
        console.error('Erro ao realizar login:', error);
        return res.status(500).send('Erro ao realizar login');
    });
}
);

app.listen(port, () => {
    console.log(`Servidor iniciado na porta ${port}`);
}
);