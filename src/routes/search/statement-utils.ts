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


// Function to get the full concatenated statement
export function getFullStatement(statements: string[], highlighting: string[]): string {
    const result = replaceItems(statements, highlighting);
    let full_statement = statements.join(" ");
    return full_statement;
}

function replaceItems(A: string[], B: string[]) {
    return A.map((item, index) => {
        return B[index] && B[index] !== "" ? B[index] : item;
    });
}
