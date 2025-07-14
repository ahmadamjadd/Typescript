// backend/services/validationService.ts
import { Result } from "./result";

export class ValidationService {
  static validateItemName(name: string): Result<string, string> {
    if (name.trim().length === 0) {
      return Result.Err("Item name cannot be empty.");
    }
    if (name.trim().length < 3) {
      return Result.Err("Item name must be at least 3 characters.");
    }
    return Result.Ok(name.trim());
  }
}
