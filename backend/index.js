import cors from "cors";
import express from "express";
import { JSONFile, Low } from "lowdb";
import { dirname, join } from "path";
import { fileURLToPath } from "url";
import { v4 as uuidv4 } from 'uuid';

const __dirname = dirname(fileURLToPath(import.meta.url));

const file = join(__dirname, "db.json");
const adapter = new JSONFile(file);
const db = new Low(adapter);

const app = express();
app.use(express.json());
app.use(cors());
app.use(function (req, res, next) {
  if (!req.path.startsWith("/users")) {
    const { authorization } = req.headers;
    if (authorization === "Token 9944b09199c62bcf9418ad846dd0e4bbdfc6ee4b") {
      next();
    } else {
      return res
        .status(403)
        .json({ invalid_credentials: "Provide a valid Token" });
    }
  } else {
    next();
  }
});

app.post("/users/login", async (req, res) => {
  const { username, email, password } = req.body;
  await db.read();
  let users = db.data.users || [];
  const isEmail = username.includes('@');

  const userFound = users.find(u =>
    (isEmail ? u.email === username : u.username === username) &&
    u.password === password
  );

  if (userFound) {
    return res.json({
      token: "9944b09199c62bcf9418ad846dd0e4bbdfc6ee4b",
      userId: userFound.id,
      username: userFound.username
    });
  } else {
    return res.status(401).json({ message: "Credenciais inválidas" });
  }
});


app.post("/users", async (req, res) => {
  await db.read();

  const { username, email, password } = req.body;
  let users = db.data.users || [];
  const emailExists = users?.find(user => user.email === email);
  if (emailExists) {
    return res.status(400).json({ message: "Email já cadastrado" });
  }
  const newId = uuidv4()
  const newUser = { id: newId, username, email, password };
  users.push(newUser);
  db.data.users = users;
  await db.write();
  return res.json(newUser);
});

app.get("/especialidades", async (req, res) => {
  await db.read();
  return res.json(db.data.especialidades);
});

app.get("/medicos", async (req, res) => {
  await db.read();
  return res.json(db.data.medicos);
});

app.get("/agendas", async (req, res) => {
  await db.read();
  return res.json(db.data.agendas);
});

app.get("/consultas", async (req, res) => {
  await db.read();
  return res.json(db.data.consultas);
});

app.get("/users/consultas", async (req, res) => {
  try {
    const userId = req.query.userId;

    if (!userId) {
      return res.status(400).json({ message: 'ID do usuário é necessário' });
    }

    await db.read();
    const consultas = db.data.consultas || [];
    const userConsultas = consultas.filter(consulta => consulta.userId === userId);

    return res.json(userConsultas);

  } catch (error) {
    console.error('Erro ao obter consultas:', error);
    return res.status(500).json({ message: 'Erro interno do servidor' });
  }
});

app.post("/consultas", async (req, res) => {
  await db.read();

  const { consultas, medicos, especialidades } = db.data;
  const medico = medicos.find(m => m.id === req.body.medicoId);
  const especialidade = especialidades.find(e => e.id === req.body.especialidadeId);

  if (!medico || !especialidade) {
    return res.status(400).json({ error: "Médico ou especialidade inválidos." });
  }

  const novoId = uuidv4();
  const novaConsulta = {
    id: novoId,
    dia: req.body.data,
    horario: req.body.horario,
    data_agendamento: new Date().toISOString(),
    medico: {
      id: medico.id,
      crm: medico.crm,
      nome: medico.nome,
      especialidade: {
        id: especialidade.id,
        nome: especialidade.nome,
      },
    },
    userId: req.body.userId
  };

  consultas.push(novaConsulta);
  await db.write();

  return res.json(novaConsulta);
});


app.delete("/consultas/:id", async (req, res) => {
  await db.read();
  const consultaId = req.params.id;

  const filteredConsultas = db.data.consultas.filter(consulta => consulta.id !== consultaId);

  db.data.consultas = filteredConsultas;

  await db.write();
  return res.json({ message: "Consulta removida com sucesso" });
});


app.listen(3000, () => {
  console.log("listening on port 3000");
});
