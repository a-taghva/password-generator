// Array of characters to be included in password
var specialCharacters = ['@','%','+','\\','/',"'",'!','#','$','^','?',':',',',')','(','}','{',']','[','~','-','_','.'];
var numericCharacters = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
var lowerCasedCharacters = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z'];
var upperCasedCharacters = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];
  
// Function to prompt user for password options
function getPasswordOptions() {
    // Variable to store length of password from user input
    var length = +prompt('How many characters would you like your password to contain?');

    // Conditional statement to check if password length is a number.
    if (isNaN(length)) {
        alert('Password length must be provided as a number');
        return getPasswordOptions();
    }

    // Conditional statement to check if password length is at least 8 characters long and less than 128.
    if (length < 8 || length > 128) {
        alert('Password length must be at least 8 characters and no more than 128 characters!');
        return getPasswordOptions();
    }

    // Variable to store boolean regarding the inclusion of characters
    var hasSpecialCharacters = confirm('Click OK to confirm including special characters.');
    var hasNumericCharacters = confirm('Click OK to confirm including numeric characters.');
    var hasLowerCasedCharacters = confirm('Click OK to confirm including lowercase characters.');
    var hasUpperCasedCharacters = confirm('Click OK to confirm including uppercase characters.');

    // Conditional statement to check if user does not include any types of characters. Password generator ends if all four variables evaluate to false
    if (
        !hasSpecialCharacters  &&
        !hasNumericCharacters &&
        !hasLowerCasedCharacters &&
        !hasUpperCasedCharacters 
    ) {
        alert('Must select at least one character type');
        return getPasswordOptions();
    }

    // Object to store user input
    var passwordOptions = {
        length: length,
        hasSpecialCharacters: hasSpecialCharacters,
        hasNumericCharacters: hasNumericCharacters,
        hasLowerCasedCharacters: hasLowerCasedCharacters,
        hasUpperCasedCharacters: hasUpperCasedCharacters
    };

    return passwordOptions;
}

// Function for getting a random element from an array
function getRandom(arr) {
    var randIndex = Math.floor(Math.random() * arr.length);
    var randElement = arr[randIndex];

    return randElement;
}

// Function for getting random indices Number
// it finds (arr.length) random index numbers from arr2
var getIndices = function (arr, arr2) {
    var wasSelected = [];
    var Selected = [];

    while ( wasSelected.length < arr.length ) {
        Selected.push( arr2.indexOf(getRandom(arr2)) );
        if ( wasSelected.indexOf(Selected[ Selected.length - 1 ]) >= 0 ) {
            continue;
        }
        wasSelected.push(Selected[Selected.length - 1]);
    }    
    return wasSelected;
}



// Function to generate password with user input
function generatePassword() {   
    // Declaring new variable and arrays
    var options = getPasswordOptions();
    var result = [];
    var possibleCharacters = [];
    var guaranteedCharacters = [];

    // add characters to possibleCharacters and guaranteedCharacters, if they've been selected
    if (options.hasSpecialCharacters) {
        possibleCharacters = possibleCharacters.concat(specialCharacters);
        guaranteedCharacters.push(getRandom(specialCharacters));
    }

    if (options.hasNumericCharacters) {
        possibleCharacters = possibleCharacters.concat(numericCharacters);
        guaranteedCharacters.push(getRandom(numericCharacters));
    }

    if (options.hasLowerCasedCharacters) {
        possibleCharacters = possibleCharacters.concat(lowerCasedCharacters);
        guaranteedCharacters.push(getRandom(lowerCasedCharacters));
    }

    if (options.hasUpperCasedCharacters) {
        possibleCharacters = possibleCharacters.concat(upperCasedCharacters);
        guaranteedCharacters.push(getRandom(upperCasedCharacters));
    }

    // For loop to iterate over the password length from the options object, selecting random indices from the array of possible characters and concatenating those characters into the result variable
    for (var i = 0; i < options.length; i++) {
        var possibleCharacter = getRandom(possibleCharacters);

        result.push(possibleCharacter);
    }

    // Mix in at least one of each guaranteed character in the result
    var randomIndices = [];
    randomIndices = getIndices(guaranteedCharacters, result);
    for (var i = 0; i < guaranteedCharacters.length; i++) {
        result[ randomIndices[i] ] = guaranteedCharacters[i];
    }

    // Transform the result into a string and pass into writePassword
    return result.join('');
}


// Get references to the #generate element
var generateBtn = document.querySelector('#generate');

// Write password to the #password input
function writePassword() {
var password = generatePassword();
var passwordText = document.querySelector('#password');

passwordText.value = password;
}

// Add event listener to generate button
generateBtn.addEventListener('click', writePassword);
