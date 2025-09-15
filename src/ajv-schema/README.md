# AJV Schema Migration

This directory contains the AJV-compatible version of the schemas originally written for Zod.

## Usage

The schemas are available as JSON Schema objects that can be used with AJV:

```typescript
import Ajv from "ajv"
import addFormats from "ajv-formats"
import { 
  projectStatusSchema,
  taskSchemaLiteral,
  labelSchemaLiteral,
  projectSchemaLiteral 
} from "@incmix/utils/ajv-schema"

// Create AJV instance
const ajv = new Ajv({ allErrors: true })
addFormats(ajv)

// Compile validators
const validateProjectStatus = ajv.compile(projectStatusSchema)
const validateTask = ajv.compile(taskSchemaLiteral)
const validateLabel = ajv.compile(labelSchemaLiteral)
const validateProject = ajv.compile(projectSchemaLiteral)

// Use validators
const isValidStatus = validateProjectStatus("started") // true
const isValidStatus2 = validateProjectStatus("invalid") // false

// Check errors
if (!validateProjectStatus("invalid")) {
  console.log(validateProjectStatus.errors)
}
```

## Installation

To use these schemas with AJV, you need to install the required dependencies:

```bash
npm install ajv ajv-formats
```

## Available Schemas

- `projectStatusSchema` - Validates project status enum
- `taskSchemaLiteral` - Full task schema
- `labelSchemaLiteral` - Label/status schema 
- `projectSchemaLiteral` - Project schema
- `dashboardSchemaLiteral` - Dashboard schema
- `dashboardTemplateSchemaLiteral` - Dashboard template schema

## Migration Notes

- Replaced Zod's `z.union([z.literal(...), ...])` with JSON Schema `enum` arrays
- All schemas are now standard JSON Schema objects compatible with AJV
- Validation functions need to be compiled using AJV before use
- The original Zod schemas remain available in the `../schema` directory during the transition period