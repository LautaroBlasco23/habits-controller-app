const checkRegisterInputs = (username: string, email: string, password: string): string | null => {
    // General undefined checks
    if (username == undefined || email == undefined || password == undefined) return 'there are missing fields'
    
    // username characters check

    const validRegexUsername = /^[a-zA-Z0-9.]*$/

    if (!username.match(validRegexUsername)) return "invalid username"

    // username length check
    if (username.length < 4) return 'username length < 4';
    
    // email
    const validRegexEmail = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

    if (!email.match(validRegexEmail)) return "invalid email";

    //pasword
    if(password.length < 4) return "password length < 4";

    return null
}

export default checkRegisterInputs;