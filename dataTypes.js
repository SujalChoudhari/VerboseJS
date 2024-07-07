//////////////////////////////////////
// DATA TYPES
//////////////////////////////////////

const DATA_TYPES = {
    "Ordinal": (potential_number) => {
        const res = potential_number.match(/^-?\d+(\.\d+)?$/);
        return res !== null;
    },
    "String": (potential_string) => {
        const trimmed = potential_string.trim()
        return ((trimmed.startsWith("f\"") || trimmed.startsWith("\"")) && trimmed.endsWith("\""))
            || (trimmed.startsWith("`") && trimmed.endsWith("`"))
    },
    "Proposition": (potential_boolean) => {
        const res = potential_boolean.match(/^(True|False|Yes|No)$/i);
        return res !== null;
    },
    "Disposition": (potential_array) => {
        try {
            const parsed = JSON.parse(potential_array);
            return Array.isArray(parsed);
        } catch {
            return false;
        }
    },
    "Ambiguous": (potential_undefined) => {
        return potential_undefined.trim() === "Ambiguous" || potential_undefined.trim() === "undefined";
    },
    "Void": (potential_null) => {
        return potential_null.trim() === "Void" || potential_null.trim() === "null";
    },
    "Infer": (_) => {
        return true;
    }
};

module.exports = DATA_TYPES;
