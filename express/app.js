const express = require('express');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const users = [];

app.get("/api/users", (req, res) => {
    res.status(200).json(users);
})

app.post("/api/users", (req, res) => {
    const body = req.body;
    const { firstName, lastName, age } = body;
    if (!firstName || !lastName || !age) {
        return res.status(400).json({ message: "Faltan datos" });
    }
    const newUser = {
        id: users.length + 1,
        firstName,
        lastName,
        age
    };
    users.push(newUser);
    res.status(201).json(newUser);
});

app.put("/api/users/:userId", (req, res) => {
    const body = req.body;
    const { userId } = req.params;
    const { firstName, lastName, age } = body;
    const user = users.find((user) => user.id === parseInt(userId));
    if (!user) {
        return res.status(404).json({ message: "Usuario no encontrado" });
    }
    if (firstName) {
        user.firstName = firstName;
    }
    if (lastName) {
        user.lastName = lastName;
    }
    if (age) {
        user.age = age;
    }
    res.status(200).json({ message: "Usuario actualizado" });
});

app.delete("/api/users/:userId", (req, res) => {
    const { userId } = req.params;
    const user = users.find((user) => user.id === parseInt(userId));
    if (!user) {
        return res.status(404).json({ message: "Usuario no encontrado" });
    }
    const index = users.indexOf(user);
    users.splice(index, 1);
    res.status(200).json({ message: "Usuario eliminado" });
});

app.listen(8080, () => {
    console.log('Server listening on http://localhost:8080 ...');
});