"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// src/routes/usuarios.ts
const express_1 = require("express");
const router = (0, express_1.Router)();
router.get('/', (req, res) => {
    res.send('Lista de usuarios');
});
router.post('/', (req, res) => {
    const { nombre, email } = req.body;
    res.send(`Usuario ${nombre} con email ${email} ha sido creado.`);
});
exports.default = router;
