// backend/services/validationService.ts
import { Result } from "./result";

export class ValidationService {
  static validateItemName(name: string): Result<string, Error> {
    if (name.trim().length === 0) {
      return Result.Err(new Error("Item name cannot be empty."));
    }
    if (name.trim().length < 3) {
      return Result.Err(new Error("Item name must be at least 3 characters."));
    }
    return Result.Ok(name.trim());
  }
}
