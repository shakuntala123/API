const express = require('express');
const fs = require('fs'); // For file operations
const users = require('./MOCK_DATA.json'); // Mock data for users

const app = express();
const PORT = 8000;

// Middleware to parse JSON request bodies
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Endpoint to render users as HTML
app.get("/users", (req, res) => {
    const html = `
    <ul> 
        ${users.map(user => `<li>${user.first_name}</li>`).join("")}
    </ul>
    `;
    res.send(html);
});

// REST API: Get all users
app.get('/api/users', (req, res) => {
    return res.json(users);
});

// REST API: Get user by ID
app.get('/api/users/:id', (req, res) => {
    const id = Number(req.params.id);
    const user = users.find(user => user.id === id);
    if (user) {
        return res.json(user);
    } else {
        return res.status(404).json({ error: "User not found" });
    }
});

// REST API: Create a new user
app.post("/api/users", (req, res) => {
    const body = req.body;

    if (!body.first_name || !body.last_name || !body.email) {
        return res.status(400).json({ error: "Missing required fields" });
    }

    const newUser = { ...body, id: users.length + 1 };
    users.push(newUser);

    // Write the updated users array to MOCK_DATA.json
    fs.writeFile("./MOCK_DATA.json", JSON.stringify(users, null, 2), (err) => {
        if (err) {
            console.error("Error writing to file:", err);
            return res.status(500).json({ error: "Failed to create user" });
        }
        return res.status(201).json({ status: "success", user: newUser });
    });
});

// REST API: Update user by ID
app.patch("/api/users/:id", (req, res) => {
    const id = Number(req.params.id);
    const index = users.findIndex(user => user.id === id);

    if (index === -1) {
        return res.status(404).json({ error: "User not found" });
    }

    users[index] = { ...users[index], ...req.body };

    // Write the updated users array to MOCK_DATA.json
    fs.writeFile("./MOCK_DATA.json", JSON.stringify(users, null, 2), (err) => {
        if (err) {
            console.error("Error writing to file:", err);
            return res.status(500).json({ error: "Failed to update user" });
        }
        return res.json({ status: "success", user: users[index] });
    });
});

// REST API: Delete user by ID
app.delete("/api/users/:id", (req, res) => {
    const id = Number(req.params.id);
    const index = users.findIndex(user => user.id === id);

    if (index === -1) {
        return res.status(404).json({ error: "User not found" });
    }

    const deletedUser = users.splice(index, 1);

    // Write the updated users array to MOCK_DATA.json
    fs.writeFile("./MOCK_DATA.json", JSON.stringify(users, null, 2), (err) => {
        if (err) {
            console.error("Error writing to file:", err);
            return res.status(500).json({ error: "Failed to delete user" });
        }
        return res.json({ status: "success", user: deletedUser });
    });
});

// Start the server
app.listen(PORT, () => console.log(`Server Started at PORT: ${PORT}`));
