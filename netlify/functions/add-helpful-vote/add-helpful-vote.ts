import { Handler } from '@netlify/functions';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export const handler: Handler = async (event, context) => {
  try {
    const response = await prisma.helpful.findFirst({
        where: {
            page: "https://wowaholic.com/"
        }
    });
    if (!response) {
      await prisma.helpful.create({
        data: {
          page: "https://wowaholic.com/",
          votes: 1
        }
      })

      return {
        statusCode: 200,
        body: JSON.stringify({
          votes: 1
        }),
      }
    }

    const updateResponse = await prisma.helpful.update({
        where: {
            id: response.id
        },
        data: {
            votes: {
                increment: 1
            }
        }
    })

    return {
      statusCode: 200,
      body: JSON.stringify({
        votes: updateResponse.votes
      }),
    }
  } catch (e) {
    return {
      statusCode: 500,
      message: "Internal server error"
    }
  }
}
