import { Handler } from '@netlify/functions';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export const handler: Handler = async (event, context) => {
  try {
    const response = await prisma.helpful.findFirst();
    if (!response) {
      await prisma.helpful.create({
        data: {
          page: "https://wowaholic.com/",
          votes: 0
        }
      })

      return {
        statusCode: 200,
        body: JSON.stringify({
          votes: 0
        }),
      }
    }

    return {
      statusCode: 200,
      body: JSON.stringify({
        votes: response.votes
      }),
    }
  } catch (e) {
    return {
      statusCode: 500,
      message: "Internal server error"
    }
  }
}
