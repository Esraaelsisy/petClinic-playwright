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
      readOnly: true
    },
    status: {
      title: 'Status',
      description: 'The HTTP status code.',
      type: 'integer',
      format: 'int32',
      readOnly: true
    },
    error: {
      title: 'Error',
      description: 'The short error message.',
      type: 'string',
      readOnly: true
    },
    message: {
      title: 'Message',
      description: 'The detailed error message.',
      type: 'string',
      readOnly: true
    },
    path: {
      title: 'Path',
      description: 'The request path.',
      type: 'string',
      readOnly: true
    }
  },
  required: ['timestamp', 'status', 'error', 'message', 'path']
};
export default restErrorSchema;