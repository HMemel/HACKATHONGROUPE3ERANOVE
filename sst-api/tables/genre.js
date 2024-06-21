// tables/genre.js

const express = require('express');
const router = express.Router();
const connection = require('../db');



// Récupération de tous les genres
router.get('/genres/get', (req, res) => {
    const sql = 'SELECT * FROM genre';
    connection.query(sql, (err, genres) => {
      if (err) {
        console.error('Erreur lors de la récupération des genres : ' + err.stack);
        res.status(500).json({
          hasError: true,
          status: {
            code: 500,
            message: 'Erreur lors de la récupération des genres'
          }
        });
        return;
      }
      res.status(200).json({
        hasError: false,
        status: {
          code: 200,
          message: 'Opération réalisée avec succès'
        },
        data: {
          items: genres
        }
      });
    });
  });
  
  // Récupération d'un genre par ID
  router.get('/genres/get/:id', (req, res) => {
    const id = req.params.id;
    const sql = 'SELECT * FROM genre WHERE idGenre = ?';
    connection.query(sql, [id], (err, results) => {
      if (err) {
        console.error('Erreur lors de la récupération du genre : ' + err.stack);
        res.status(500).json({
          hasError: true,
          status: {
            code: 500,
            message: 'Erreur lors de la récupération du genre'
          }
        });
        return;
      }
      if (results.length === 0) {
        res.status(404).json({
          hasError: true,
          status: {
            code: 404,
            message: 'Genre non trouvé'
          }
        });
        return;
      }
      res.status(200).json({
        hasError: false,
        status: {
          code: 200,
          message: 'Opération réalisée avec succès'
        },
        data: {
          item: results[0]
        }
      });
    });
  });
  
  // Création d'un nouveau genre
  router.post('/genres/create', (req, res) => {
    const { sigle, libelle } = req.body.data;

    if (!sigle) {
        return res.status(400).json({
          hasError: true,
          status: {
            code: 400,
            message: 'Le sigle est requis.'
          }
        });
      }

    if (!libelle) {
        return res.status(400).json({
          hasError: true,
          status: {
            code: 400,
            message: 'Le libellé est requis.'
          }
        });
      }

    const sql = 'INSERT INTO genre (sigle, libelle) VALUES (?, ?)';
    connection.query(sql, [sigle, libelle], (err, result) => {
      if (err) {
        console.error('Erreur lors de la création du genre : ' + err.stack);
        res.status(500).json({
          hasError: true,
          status: {
            code: 500,
            message: 'Erreur lors de la création du genre'
          }
        });
        return;
      }
      const newGenre = {
        idGenre: result.insertId,
        sigle,
        libelle
      };
      res.status(201).json({
        hasError: false,
        status: {
          code: 201,
          message: 'Opération réalisée avec succès'
        },
        data: {
          item: newGenre
        }
      });
    });
  });
  
  // Mise à jour d'un genre existant
  router.put('/genres/update/:id', (req, res) => {
    const id = req.params.id;
    const { sigle, libelle } = req.body;
    const sql = 'UPDATE genre SET sigle = ?, libelle = ? WHERE idGenre = ?';
    connection.query(sql, [sigle, libelle, id], (err, result) => {
      if (err) {
        console.error('Erreur lors de la mise à jour du genre : ' + err.stack);
        res.status(500).json({
          hasError: true,
          status: {
            code: 500,
            message: 'Erreur lors de la mise à jour du genre'
          }
        });
        return;
      }
      if (result.affectedRows === 0) {
        res.status(404).json({
          hasError: true,
          status: {
            code: 404,
            message: 'Genre non trouvé'
          }
        });
        return;
      }
      const updatedGenre = {
        idGenre: id,
        sigle,
        libelle
      };
      res.status(200).json({
        hasError: false,
        status: {
          code: 200,
          message: 'Opération réalisée avec succès'
        },
        data: {
          item: updatedGenre
        }
      });
    });
  });
  
  // Suppression d'un genre par ID
  router.delete('/genres/delete/:id', (req, res) => {
    const id = req.params.id;
    const sql = 'DELETE FROM genre WHERE idGenre = ?';
    connection.query(sql, [id], (err, result) => {
      if (err) {
        console.error('Erreur lors de la suppression du genre : ' + err.stack);
        res.status(500).json({
          hasError: true,
          status: {
            code: 500,
            message: 'Erreur lors de la suppression du genre'
          }
        });
        return;
      }
      if (result.affectedRows === 0) {
        res.status(404).json({
          hasError: true,
          status: {
            code: 404,
            message: 'Genre non trouvé'
          }
        });
        return;
      }
      res.status(200).json({
        hasError: false,
        status: {
          code: 200,
          message: 'Opération réalisée avec succès'
        },
        data: {
          item: {
            idGenre: id
          }
        }
      });
    });
  });
  
  module.exports = router;
