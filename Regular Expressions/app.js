let re;

// Literal Characters
re = /hello/;
re = /hello/i;

// Metacharacter Symbols
re = /^h/i; // Must start with
re = /World$/i; // Must end with
re = /^hello$/i; // Must begin and end with
re = /^h.llo$/i; // Matches any One character
re = /^hllo$/i; // Matches any character 0 or more times

// Times
re = /gre?a?y/i; // Optional Character
re = /gre?a?y\?/i; // Escape Character

// Brakets [] - Character Sets
re = /gr[ae]y/i; // Must be an a or e
re = /[GF]ray/; // Must be an G or F
re = /[^GF]ray/i; // Must anything except a G or F
re = /[A-Z]ray/; // Must any uppercase letter
re = /[a-z]ray/; // Must ane lowercase letter
re = /[A-Za-z]ray/; // Must any letter
re = /[0-9]ray/; // Match any digit
re = /[0-9][0-9]ray/; // Match any digit

// Braces {} - Quantifiers
re = /Hel{2}o/i; // Must occur exactly {m} amount of times
re = /Hel{2,4}o/i; // Must occur exactly between {m} amount times
re = /Hel{2,}o/i; // Must occur at least {m} times

// Parentheses () - Grouping
re = /([0-9]x){3}/;

// Shorthand Character Classes
re = /\w/; // Word character - alphanumeric or _
re = /\w+/; // + equal one or more
re = /\W/; // Non-Word -character
re = /\d/; // Match any digit 
re = /\d+/; // Match any digit  0 or more times
re = /\D/; // Mathc any Non-digit
re = /\s/; // Mathc whitespace char
re = /\S/; // Mathc NON-whitespace char
re = /Hell\b/i; // Word boundary 

// Assertions
re = /x(?=y)/; // Match x only if followed by y
re = /x(?!=y)/; // Match x only if NOT followed by y

// String to match
const str = 'sdfgdfxgsdfgx';


// Log Result
const result = re.exec(str);
console.log(result);


function reTest(re, str) {
    if (re.test(str)) {
        console.log(`${str} matches ${re.source}`)
    } else {
        console.log(`${str} doen't matches ${re.source}`)
    }
}

reTest(re, str);