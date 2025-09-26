import express from 'express';
const app = express();

app.use(express.json());

const PORT = process.env.PORT || 3000;

const mockUsers = [
  { id: 1, username: "anson", displayName: "Anson" },
  { id: 2, username: "bnson", displayName: "Anson" },
  { id: 3, username: "cnson", displayName: "Anson" }
];

// Root route
app.get("/", (req, res) => {
  res.status(200).json({ msg: "hello" });
});

// Get all users
app.get('/api/users', (req, res) => {
  res.status(200).json(mockUsers);
});

// Create a new user
app.post('/api/users', (req, res) => {
  const { body } = req;
  const newUser = { id: mockUsers.length + 1, ...body };
  mockUsers.push(newUser);
  res.status(201).json(newUser);
});

// Get user by ID
app.get('/api/users/:id', (req, res) => {
  const parsedId = parseInt(req.params.id);

  if (isNaN(parsedId)) {
    return res.status(400).json({ error: "Invalid Id" });
  }

  const findUser = mockUsers.find((user) => user.id === parsedId);

  if (!findUser) {
    return res.sendStatus(404);
  }

  res.status(200).json(findUser);
});

// Update user by ID
app.put('/api/users/:id', (req, res) => {
  const { body, params: { id } } = req;

  const parsedId = parseInt(id);
  if (isNaN(parsedId)) {
    return res.status(400).json({ error: "Invalid Id" });
  }

  const findUserIndex = mockUsers.findIndex(user => user.id === parsedId);
  if (findUserIndex === -1) {
    return res.sendStatus(404);
  }

  mockUsers[findUserIndex] = { id: parsedId, ...body };

  res.status(200).json(mockUsers[findUserIndex]);
});
app.patch('/api/users/:id',(req,res)=>{
  const {body,
    params: {id}} = req;
  const parsedId = parseInt(id);
  if (isNaN(parsedId)){
    return response.status(400).send(
      "User Not Found");
    }
    const findIndexUser= mockUsers.findIndex(u=>u.id===parsedId);
    if (findIndexUser === -1){
      return res.sendStatus(404);
    }
    mockUsers[findIndexUser] ={
      ...mockUsers[findIndexUser], ...body}
    return res.sendStatus(200).json(mockUsers[findIndexUser]);

  }
)

// Error-handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
