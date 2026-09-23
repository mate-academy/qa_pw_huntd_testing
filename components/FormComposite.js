export class FormComposite {
  constructor(fields) {
    this.fields = fields;
  }

  async fillAll(data) {
    for (const [fieldName, value] of Object.entries(data)) {
      const field = this.fields[fieldName];
      if (field && value !== undefined) {
        await field.fill(value);
      }
    }
  }
}
