module.exports.registerValidation = function(){
    return function(req, res, next){
        const {username, name, email, password, address, mobile} = req.body;
        let error = {};
        let emailParts = email.split('@');
        let emailSuffix = emailParts[1];
        let emailPrefix = emailParts[0];

        //Minimum 8 characters at least 1 Alphabet, 1 Number and 1 Special Character:
        let pattern = new RegExp("^(?=.*?[A-Z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$");
        let passwordValidate = pattern.test(password);

        if(username === undefined || username.length < 3)
            error.username = username === undefined ? "Username is empty" : "Username must be more than 2 characters"
        if(name === undefined || name.length < 3)
            error.name = name === undefined ? "Name is empty" : "Username must be more than 2 characters"
        if(email === undefined || emailSuffix != 'gmail.com' || emailPrefix.length < 3)
            error.email = email === undefined ? "Email is empty" : "Invalid email"
        if(password === undefined || !passwordValidate)
            error.username = username === undefined ? "Username is empty" : 
               "Password should contains minimum 8 characters at least 1 Alphabet, 1 Number and 1 Special Character" 
        if(address === undefined || username.length < 3)
            error.address = address === undefined ? "Address is empty" : "Address must be more than 2 characters"
        if(mobile === undefined || mobile.length != 10)
            error.mobile = mobile === undefined ? "Mobile is empty" : "Mobile number must contain 10 digits"

        if(Object.keys(error).length != 0){
            res.status(400).json({
                status: 'error',
                message: 'Invalid input',
                error: error
            })
        }
        else next();
    }
}

module.exports.loginValidation = function(){
    return function(req, res, next){
        const {email, password} = req.body;
        let error = {};
        let emailParts = email != undefined ? email.split('@') : [];
        let emailSuffix = emailParts.length == 2 ? emailParts[1] : null;

        if(email === undefined || emailSuffix != 'gmail.com')
            error.email = email === undefined ? "Email is empty" : "Invalid email"
        if(password === undefined || password.length < 3)
            error.password = password === undefined ? "Password is empty" : 
               "Password must be more than 2 characters"

        if(Object.keys(error).length != 0){
            res.status(400).json({
                status: 'error',
                message: 'Invalid input',
                error: error
            })
        }
        else next();
    }
}