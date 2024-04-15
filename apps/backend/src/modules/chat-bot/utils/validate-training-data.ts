export function validateTrainingData(trainingDataFile: Express.Multer.File) {
  let dataset: any[] = [];

  try {
    const contents = trainingDataFile.buffer.toString('utf8');
    const dataObjects = contents.trim().split('\n');
    dataset = dataObjects.map((objString) => JSON.parse(objString));
  } catch (error) {
    throw new Error('Invalid JSON format.');
  }

  dataset.forEach((ex) => {
    const messages = ex.messages;
    if (!messages || !Array.isArray(messages)) {
      throw new Error('Missing messages list.');
    }

    messages.forEach((message) => {
      if (!('role' in message) || !('content' in message)) {
        throw new Error('Message is missing keys "role" or "content".');
      }

      if (
        Object.keys(message).some((key) => !['role', 'content'].includes(key))
      ) {
        throw new Error('Unrecognized key in message object.');
      }

      if (!['system', 'user', 'assistant'].includes(message.role)) {
        throw new Error('Unrecognized role in message object.');
      }

      const content = message.content;
      if (!content || typeof content !== 'string') {
        throw new Error('Missing or invalid content in message object.');
      }

      if (!messages.some((message) => message.role === 'assistant')) {
        throw new Error('Missing assistant message.');
      }
    });
  });
}
