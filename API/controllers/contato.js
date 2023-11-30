import { db } from "../db.js";

export const getContatos = (_, res) => {
  const q = "SELECT * FROM contato";

  db.query(q, (err, data) => {
    if (err) return res.json(err);

    return res.status(200).json(data);
  });
};

export const addContato = (req, res) => {
  const q =
    "INSERT INTO contato(`nome`, `email`, `fone`) VALUES(?)";

  const values = [
    req.body.nome,
    req.body.email,
    req.body.fone,
  ];

  db.query(q, [values], (err) => {
    if (err) return res.json(err);

    return res.status(200).json("Contato criado com sucesso.");
  });
};

export const updateContato = (req, res) => {
  const q =
    "UPDATE contato SET `nome` = ?, `email` = ?, `fone` = ? WHERE `id` = ?";

  const values = [
    req.body.nome,
    req.body.email,
    req.body.fone,
  ];

  db.query(q, [...values, req.params.id], (err) => {
    if (err) return res.json(err);

    return res.status(200).json("Contato atualizado com sucesso.");
  });
};

export const deleteContato = (req, res) => {
  const q = "DELETE FROM contato WHERE `id` = ?";

  db.query(q, [req.params.id], (err) => {
    if (err) return res.json(err);

    return res.status(200).json("Contato deletado com sucesso.");
  });
};
