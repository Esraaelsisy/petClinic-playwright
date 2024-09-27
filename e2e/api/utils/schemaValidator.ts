import Ajv from 'ajv';
import addFormats from 'ajv-formats';

export class SchemaValidator {
    private static ajv = new Ajv({ allErrors: true, verbose: true, strict: false });

    // Add formats such as "int32", "date", etc.
    static initializeFormats() {
        addFormats(this.ajv);
    }

    // Validate response against the provided schema
    public static validateResponseSchema(data: any, schema: any): boolean {
        this.initializeFormats(); // Ensure formats are initialized
        const validate = this.ajv.compile(schema);
        const valid = validate(data);

        if (!valid) {
            console.log(validate.errors);
        }
        return valid;
    }
}