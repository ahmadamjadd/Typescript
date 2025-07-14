// src/services/validationService.ts
import { Result } from "../utils/result";

export class ValidationService {
  validateInput(name: string): Result<string, string> {
    const trimmed = name.trim();

    if (!trimmed) {
      return Result.Err("Field is required!");
    }
    if (trimmed.length < 3) {
      return Result.Err("Name must be at least 3 characters.");
    }

    return Result.Ok(trimmed); // Return the cleaned name
  }
}
