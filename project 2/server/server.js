const express = require('express');
const { PrismaClient } = require('@prisma/client');
var cors = require("cors");
const app = express();
const prisma = new PrismaClient()

app.use(express.json());
app.use(cors());

app.get('/api', async (req, res) => {
    const tasks = await prisma.task.findMany();
    res.json(tasks);
});


app.post('/api', async (req, res) => {
    const { title } = req.body;
    const newTask = await prisma.task.create({
        data: {
            title: title
        },
    });
    res.json(newTask);
});


app.delete('/api/:id', async (req, res) => {

    const { id } = req.params;

    try{
        const deletedTask = await prisma.task.delete({
            where: {
                id: Number(id),
            },
        });
        res.json(deletedTask);
    }catch (error) {
        res.status(404).json({ message: 'Task not found' });
    }
    
});


app.patch('/api/:id', async (req, res) => {

    const { id } = req.params;
    const { title, done } = req.body;

    try{
        const updatedTask = await prisma.task.update({
            where: {
                id: Number(id),
            },
            data: {
                title: title,
                done: done
            },
        });
        res.json(updatedTask);
    }catch (error) {
        res.status(404).json({ message: 'Task not found' });
    }
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

process.on('SIGINT', async () => {
    await prisma.$disconnect();
    console.log('Server stopped');
    process.exit(0);
});