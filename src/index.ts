import Request from './Pipeline/Request';
import Pipeline from './Pipeline';

export const handler = async (input: Request) => {
  try {
    const pipeline = new Pipeline(input);
    const response = await pipeline.exec();

    return {
      statusCode: 200,
      body: response
    }
  }

  catch(e) {
    return {
      statusCode: 422,
      body: e,
    }
  }
};
