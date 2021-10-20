const AppError = require("../utils/appError");

exports.nameValidation = (req, res, next) => {
    let { firstName, lastName } = req.body;

    const checkFirstname = /^[a-zA-Z ]*$/.test(firstName);
    const checkLastname = /^[a-zA-Z ]*$/.test(lastName);

    if (checkFirstname && checkLastname) {
        return next();
    }
    if (!checkFirstname) {
        return res.status(401).json({
            status: "fail",
            message: "Invalid first name",
        });
    } else if (!checkLastname) {
        return res.status(401).json({
            status: "fail",
            message: "Invalid last name",
        });
    }
};

exports.checkEmptyFields = (req, res, next) => {
    let errors = [];
    let userInputs = req.body;

    let outPutValidationObject = {
        firstName: "First Name",
        lastName: "Last Name",
        phoneNumber: "Phone Number",
        code: "Country Code",
        password: "Password",
        passwordConfirm: "Password Confirm",
    };

    for (const userInput in userInputs) {
        if (
            userInputs[userInput] === "" ||
            userInputs[userInput] === null ||
            userInputs[userInput] === undefined
        ) {
            errors.push(userInput);
        }
    }
    let finalOutput = {};
    for (const output in outPutValidationObject) {
        for (let i = 0; i < errors.length; i++) {
            if (output === errors[i]) {
                finalOutput[outPutValidationObject[output]] = " is required";
            }
        }
    }

    let concatErrorMessages = "";
    for (const error in finalOutput) {
        let message = error + finalOutput[error] + "|";
        concatErrorMessages = concatErrorMessages + message;
    }
    const objKeys = Object.keys(finalOutput);
    if (!objKeys.length) {
        next();
    } else {
        return next(new AppError(concatErrorMessages, 400));
    }
};

exports.checkIfPhoneNumberFieldIsEmpty = (req, res, next) => {
    const { phoneNumber, password } = req.body;
    if (!phoneNumber && password) {
        return res.status(400).json({
            status: "fail",
            message: "Fill all fields",
        });
    } else if (!password) {
        return res.status(400).json({
            status: "fail",
            message: "Password is required",
        });
    } else if (!phoneNumber) {
        return res.status(400).json({
            status: "fail",
            message: "Phone number is required",
        });
    }
    next();
};

exports.passwordValidation = (req, res, next) => {
    const { password, passwordConfirm } = req.body;
    const checkPassword = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/.test(
        password
    );

    if (!checkPassword) {
        return res.status(401).json({
            status: "fail",
            message: "Please provide strong password",
        });
    } else if (password !== passwordConfirm) {
        return res.status(401).json({
            status: "fail",
            message: "Password should match",
        });
    }

    next();
};

exports.phoneNumberAndCountryCode = (req, res, next) => {
    const ethiopianCountryCode = "+251";
    const code = req.body.code;
    const phoneNumber = req.body.phoneNumber;

    const checkPhoneNumber = /^\d+$/.test(phoneNumber);

    if (code !== ethiopianCountryCode) {
        return next(
            new AppError(
                `Provide valid country code. <${ethiopianCountryCode}>!`,
                401
            )
        );
    }

    if (
        !checkPhoneNumber ||
        !(phoneNumber.length === 10 || phoneNumber.length === 9)
    ) {
        return next(
            new AppError(`Provided phone number ${phoneNumber} is invalid`, 401)
        );
    }

    next();
};
