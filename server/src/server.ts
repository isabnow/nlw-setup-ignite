import Fastify from 'fastify'
import cors from '@fastify/cors'
import {PrismaClient} from '@prisma/client'

const app = Fastify()
const prisma = new PrismaClient()

app.register(cors)

// MÉTODO HTTP: Get, Post, Put, Patch, Delete

app.get('/hello', async () => {
    const habits = prisma.habit.findMany()

    return await habits
})

app.listen({
    port: 3333
}).then(()=> {
    console.log('HTTP SERVER RUNNING'); 
})

