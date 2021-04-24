exports.validateDate = (inputDate) => {
    let dateformat = /^(\d+-?)+\d+$/;
    if (inputDate.match(dateformat)) {
        let splittedDate = inputDate.split("-");
        const yy = parseInt(splittedDate[0]);
        const mm = parseInt(splittedDate[1]);
        const dd = parseInt(splittedDate[2]);
        let listOfDaysInMonth = [
            [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31],
        ];
        if (mm == 1 || mm > 2) {
            if (dd > listOfDaysInMonth[mm - 1]) {
                console.log("Invalid Date Format 2");
                return false;
            } else {
                return true;
            }
        }
        if (mm == 2) {
            let lyear = false;
            if ((!(yy % 4) && yy % 100) || !(yy % 400)) {
                lyear = true;
            }
            if (lyear == false && dd >= 29) {
                console.log("Invalid Date Format 3");
                return false;
            }
            if (lyear == true && dd > 29) {
                console.log("Invalid Date Format 4");
                return false;
            }
        }
    } else {
        console.log("Invalid Date Format 5");
        return false;
    }
    return true;
};

exports.compareTwoDates = (departure, arrival) => {
    let arr = new Date(arrival);
    let depar = new Date(departure);
    return arr.getTime() == depar.getTime() || arr.getTime() > depar.getTime();
};
