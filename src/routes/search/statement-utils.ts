export function getFirstNonEmptyStatement(statements: string[]): string {
    if (statements && statements.length > 0) {
        for (let statement of statements) {
            if (statement.trim() !== "") {
                return statement; // Return the first non-empty statement
            }
        }
    }
    return ""; // Return an empty string if no non-empty statement is found
}