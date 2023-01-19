import dayjs from "dayjs";
import { FastifyInstance } from "fastify";
import { z } from "zod";
import { prisma } from "./prisma";

export async function appRoutes(app: FastifyInstance) {
  app.post("/habits", async (request) => {
    const createHabitBody = z.object({
      title: z.string(),
      weekDays: z.array(z.number().min(0).max(6)),
    });

    const { title, weekDays } = createHabitBody.parse(request.body);

    const today = dayjs().startOf("day").toDate();

    await prisma.habit.create({
      data: {
        title,
        created_at: today,
        weekDays: {
          create: weekDays.map((weekday) => {
            return {
              week_day: weekday,
            };
          }),
        },
      },
    });
  });

  app.get("/day", async (request) => {
    const getDaysParams = z.object({
      // coerce converte o parâmetro recebido em "date" em uma data, porque ele estava recebendo string.
      date: z.coerce.date(),
    });

    const { date } = getDaysParams.parse(request.query);

    const parsedDate = dayjs(date).startOf("day");

    const weekDay = parsedDate.get("day");

    const possibleHabits = await prisma.habit.findMany({
      where: {
        created_at: {
          lte: date,
        },
        weekDays: {
          some: {
            week_day: weekDay,
          },
        },
      },
    });

    const day = await prisma.dy.findUnique({
      where: {
        date: parsedDate.toDate(),
      },
      include: {
        datHabits: true,
      },
    });

    const completedHabits = day?.datHabits.map((dayHabits) => {
      return dayHabits.habit_id
    });

    return {
      possibleHabits,
      completedHabits
    };
  });
}
