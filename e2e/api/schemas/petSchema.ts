const petSchema = {
    title: "Pet",
    description: "A pet owned by an individual.",
    type: "object",
    properties: {
      id: {
        title: "ID",
        description: "The ID of the pet.",
        type: "integer",
        format: "int32",
        example: 1,
        readOnly: true,
      },
      name: {
        title: "Name",
        description: "The name of the pet.",
        type: "string",
        example: "Leo",
      },
      owner: {
        title: "Owner",
        description: "The full name of the pet owner.",
        type: "string",
        example: "George Franklin",
      },
      birthDate: {
        title: "Birth Date",
        description: "The birth date of the pet.",
        type: "string",
        format: "date",
        example: "2010-09-07",
      },
      type: {
        title: "Type",
        description: "The type of the pet.",
        type: "object",
        properties: {
          id: {
            type: "integer",
            format: "int32",
            description: "The ID of the pet type.",
            example: 1,
          },
          name: {
            type: "string",
            description: "The name of the pet type.",
            example: "cat",
          },
        },
        required: ["id", "name"],
      },
    },
    required: ["id", "name", "owner", "birthDate", "type"], // These are required fields in the pet object
  };
  
  export default petSchema;