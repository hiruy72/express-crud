import express, { request } from 'express';
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
  res.status(201).send({ msg: "hello" });
});

// Get all users
app.get('/api/users', (req, res) => {
  res.send(mockUsers);
});

app.post('/api/users',(req,res)=>{
  console.log(req.body);
  const {body} = req;
  const newUser = {id: mockUsers.length +1, ...body};
  mockUsers.push(newUser);
  return res.status(201).send(mockUsers);
})

// Get user by ID
app.get('/api/users/:id', (req, res) => {
  const ParsedId = parseInt(req.params.id);

  if (isNaN(ParsedId)) {
    return res.status(400).send("Invalid Id");
  }

  const findUser = mockUsers.find((user) => user.id === ParsedId);

  if (!findUser) {
    return res.sendStatus(404);
  }

  return res.send(findUser);
});

app.put('/api/users/:id',(req,res)=>{
  const {body,
    params: {id},
  } = req;

  const ParsedId = parseInt(id);
  if (isNaN(ParsedId)) {
    return res.status(400).send('Invalid Id');
  }
});



// Error-handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send({ error: 'Something went wrong!' });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
