export interface Example {
  id: string;
  name: string;
  description: string;
  yaml: string;
  input: string;
  url?: string;
}

export interface ExampleCategory {
  name: string;
  examples: Example[];
}

export const exampleCategories: ExampleCategory[] = [
  {
    name: "Data Generation",
    examples: [
      {
        id: "gen-name",
        name: "Random Name",
        description: "Generate random French names",
        yaml: `version: "1"
seed: 42
masking:
  - selector:
      jsonpath: "name"
    mask:
      randomChoiceInUri: "pimo://nameFR"`,
        input: `{"name": "John Doe"}`
      },
      {
        id: "gen-date",
        name: "Random Date",
        description: "Generate random dates within a range",
        yaml: `version: "1"
seed: 42
masking:
  - selector:
      jsonpath: "birthdate"
    mask:
      randomDate:
        dateMin: "1970-01-01T00:00:00Z"
        dateMax: "2000-12-31T00:00:00Z"`,
        input: `{"birthdate": "1985-03-15T00:00:00Z"}`
      },
      {
        id: "gen-int",
        name: "Random Integer",
        description: "Generate random integers in range",
        yaml: `version: "1"
seed: 42
masking:
  - selector:
      jsonpath: "age"
    mask:
      randomInt:
        min: 18
        max: 65`,
        input: `{"age": 30}`
      },
      {
        id: "gen-regex",
        name: "Regex Pattern",
        description: "Generate strings matching regex",
        yaml: `version: "1"
seed: 42
masking:
  - selector:
      jsonpath: "phone"
    mask:
      regex: "[0-9]{2} [0-9]{2} [0-9]{2} [0-9]{2} [0-9]{2}"`,
        input: `{"phone": "01 23 45 67 89"}`
      },
      {
        id: "gen-uuid",
        name: "UUID Generation",
        description: "Generate unique identifiers",
        yaml: `version: "1"
masking:
  - selector:
      jsonpath: "id"
    mask:
      randomUUID: {}`,
        input: `{"id": "old-id-123"}`
      },
      {
        id: "gen-email",
        name: "Email Generation",
        description: "Generate realistic email addresses",
        yaml: `version: "1"
seed: 42
masking:
  - selector:
      jsonpath: "email"
    mask:
      template: "{{.name | lower | NoAccent}}@example.com"
    preserve: "domain"`,
        input: `{"name": "Jean Dupont", "email": "jean.dupont@company.com"}`
      }
    ]
  },
  {
    name: "Data Anonymization",
    examples: [
      {
        id: "anon-constant",
        name: "Constant Value",
        description: "Replace with fixed value",
        yaml: `version: "1"
masking:
  - selector:
      jsonpath: "password"
    mask:
      constant: "********"`,
        input: `{"username": "admin", "password": "secret123"}`
      },
      {
        id: "anon-hash",
        name: "Hash Masking",
        description: "One-way hash transformation",
        yaml: `version: "1"
masking:
  - selector:
      jsonpath: "ssn"
    mask:
      hash: {}`,
        input: `{"ssn": "123-45-6789"}`
      },
      {
        id: "anon-remove",
        name: "Remove Field",
        description: "Delete sensitive fields entirely",
        yaml: `version: "1"
masking:
  - selector:
      jsonpath: "credit_card"
    mask:
      remove: true`,
        input: `{"name": "John", "credit_card": "4111-1111-1111-1111"}`
      }
    ]
  },
  {
    name: "Data Pseudonymization",
    examples: [
      {
        id: "pseudo-consistent",
        name: "Consistent Masking",
        description: "Same input always produces same output",
        yaml: `version: "1"
seed: 42
masking:
  - selector:
      jsonpath: "customer_id"
    mask:
      hash:
        domain: "customer"
      cache: "customer_id"`,
        input: `[{"customer_id": "CUST001"}, {"customer_id": "CUST001"}, {"customer_id": "CUST002"}]`
      },
      {
        id: "pseudo-ff1",
        name: "Format Preserving",
        description: "Encrypt while keeping format",
        yaml: `version: "1"
masking:
  - selector:
      jsonpath: "account"
    mask:
      ff1:
        radix: 10
        keyFromEnv: "FF1_KEY"`,
        input: `{"account": "1234567890"}`
      },
      {
        id: "pseudo-weighted",
        name: "Weighted Choice",
        description: "Random selection with weights",
        yaml: `version: "1"
seed: 42
masking:
  - selector:
      jsonpath: "status"
    mask:
      weightedChoice:
        - choice: "active"
          weight: 7
        - choice: "inactive"
          weight: 2
        - choice: "pending"
          weight: 1`,
        input: `{"status": "unknown"}`
      },
      {
        id: "pseudo-fromjson",
        name: "From JSON Cache",
        description: "Replace from a reference dataset",
        yaml: `version: "1"
seed: 42
masking:
  - selector:
      jsonpath: "city"
    mask:
      randomChoiceInUri: "pimo://cityFR"`,
        input: `{"city": "Unknown City"}`
      }
    ]
  },
  {
    name: "Other",
    examples: [
      {
        id: "other-template",
        name: "Template Mask",
        description: "Use Go templates for complex transformations",
        yaml: `version: "1"
masking:
  - selector:
      jsonpath: "fullname"
    mask:
      template: "{{.firstname}} {{.lastname}}"`,
        input: `{"firstname": "Jean", "lastname": "Dupont", "fullname": ""}`
      },
      {
        id: "other-pipe",
        name: "Pipe Masks",
        description: "Chain multiple masks together",
        yaml: `version: "1"
seed: 42
masking:
  - selector:
      jsonpath: "name"
    masks:
      - add: ""
      - randomChoiceInUri: "pimo://nameFR"
      - template: "{{. | upper}}"`,
        input: `{"name": "Original Name"}`
      },
      {
        id: "other-conditional",
        name: "Conditional Masking",
        description: "Apply masks based on conditions",
        yaml: `version: "1"
seed: 42
masking:
  - selector:
      jsonpath: "salary"
    mask:
      randomInt:
        min: 30000
        max: 80000
    when: '{{if gt .age 18}}true{{end}}'`,
        input: `{"age": 25, "salary": 50000}`
      },
      {
        id: "other-nested",
        name: "Nested Objects",
        description: "Mask fields in nested structures",
        yaml: `version: "1"
seed: 42
masking:
  - selector:
      jsonpath: "user.contact.email"
    mask:
      template: "masked@example.com"
  - selector:
      jsonpath: "user.contact.phone"
    mask:
      regex: "XX-XXX-XXXX"`,
        input: `{"user": {"name": "John", "contact": {"email": "john@real.com", "phone": "12-345-6789"}}}`
      }
    ]
  },
  {
    name: "Workspace",
    examples: [
       {
        id: "ex-file-template",
        name: "petstore/owners-descriptor.yaml",
        description: "Template Mask from workspace file",
        url: "/api/file/petstore/owners-descriptor.yaml",
        input: `{"firstname": "Jean", "lastname": "Dupont", "fullname": ""}`,
        yaml: ""
      }
    ]
  } 
];

export const defaultExample = exampleCategories[0].examples[0];
