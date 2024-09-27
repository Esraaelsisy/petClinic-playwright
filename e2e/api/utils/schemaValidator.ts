import Ajv from 'ajv';
import addFormats from 'ajv-formats';

export class SchemaValidator {
  private static ajv: Ajv;

  static initializeFormats() {
    // Check if the formats have already been initialized to avoid re-adding
    if (!this.ajv) {
      this.ajv = new Ajv();
      addFormats(this.ajv);  // Add formats only once
    }
  }

  static validateResponseSchema(responseBody: any, schema: any): boolean {
    this.initializeFormats();  // Initialize formats if not done already
    const validate = this.ajv.compile(schema);
    const valid = validate(responseBody);
    if (!valid) console.log(validate.errors);
    return valid;
  }
}