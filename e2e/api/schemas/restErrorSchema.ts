const restErrorSchema = {
    title: 'REST Error',
    description: 'The schema for all error responses.',
    type: 'object',
    properties: {
      timestamp: {
        title: 'Timestamp',
        description: 'The time the error occurred.',
        type: 'string',
        format: 'date-time',
        example: '2024-09-27T04:55:06.224+0000',
        readOnly: true
      },
      status: {
        title: 'Status',
        description: 'The HTTP status code.',
        type: 'integer',
        format: 'int32',
        example: 400,
        readOnly: true
      },
      error: {
        title: 'Error',
        description: 'The short error message.',
        type: 'string',
        example: 'Bad Request',
        readOnly: true
      },
      message: {
        title: 'Message',
        description: 'The detailed error message.',
        type: 'string',
        example: "Failed to convert value of type 'java.lang.String' to required type 'int'; nested exception is java.lang.NumberFormatException: For input string: \"invalidID\"",
        readOnly: true
      },
      path: {
        title: 'Path',
        description: 'The request path.',
        type: 'string',
        example: '/owners/invalidID',
        readOnly: true
      }
    },
    required: ['timestamp', 'status', 'error', 'message', 'path']
  };
  export default restErrorSchema;