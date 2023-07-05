const experience = document.getElementById('experience') as HTMLInputElement | null;
const rangeLabel = document.getElementById('range-label');
function change() {
    rangeLabel.innerText = experience.value + "K";
}

class Validator {
    name_regex = /^[\w'\-,.][^0-9_!¡?÷?¿/\\+=@#$%ˆ&*(){}|~<>;:[\]]{2,}$/;
    date_regex = /^(?:(?:31(\/|-|\.)(?:0?[13578]|1[02]))\1|(?:(?:29|30)(\/|-|\.)(?:0?[13-9]|1[0-2])\2))(?:(?:1[6-9]|[2-9]\d)?\d{2})$|^(?:29(\/|-|\.)0?2\3(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00))))$|^(?:0?[1-9]|1\d|2[0-8])(\/|-|\.)(?:(?:0?[1-9])|(?:1[0-2]))\4(?:(?:1[6-9]|[2-9]\d)?\d{2})$/; /*00/00/0000 or 00.00.0000*/
    email_regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    password_regex = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])([a-zA-Z0-9]{8,})$/; /*eight characters and one uppercase and lowercase letters*/
    password2_regex = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])([a-zA-Z0-9]{8,})$/; /*eight characters and one uppercase and lowercase letters*/

    isRequired(input: boolean): boolean {
        return !!input;
    }

    isName(input: string): boolean {
        return this.name_regex.test(input)
    }

    isDate(input: string):boolean {
        return this.date_regex.test(input);
    }

    isEmail(input: string):boolean {
        return this.email_regex.test(input);
    }

    isPassword(input: string):boolean  {
        return this.password_regex.test(input)
    }

    isPassword2(input: string):boolean {
        return this.password2_regex.test(input)
    }
}

    const myValidator = new Validator();
    const myForm = document.forms["myForm"];

    let isNameValid = false;
    let isDateValid = false;
    let isEmailValid = false;
    let isPasswordValid = false;
    let isPassword2Valid = false;

    function validateName():void {
        const name = myForm["name"].value;
        if (!myValidator.isName(name) && name.length) {
            document.getElementById("name-error").innerText = "Invalid name";
            isNameValid = false;
        } else {
            document.getElementById("name-error").innerText = "";
            isNameValid = true;
        }
    }

    function validateDate():void {
        const date = myForm["date"].value;
        if (!myValidator.isDate(date) && date.length) {
            document.getElementById("date-error").innerText = "Invalid date"
            isDateValid = false;
        } else {
            document.getElementById("date-error").innerText = "";
            isDateValid = true;
        }
    }

    function validateEmail():void {
        const email = myForm["email"].value;
        if (!myValidator.isEmail(email) && email.length) {
            document.getElementById("email-error").innerText = "Invalid email"
            isEmailValid = false;
        } else {
            document.getElementById("email-error").innerText = "";
            isEmailValid = true;
        }
    }

    function validatePassword():void {
        const password = myForm["password"].value;
        if (!myValidator.isPassword(password) && password.length) {
            document.getElementById("password-error").innerText = "Password cannot be blank"
            isPasswordValid = false;
        } else {
            document.getElementById("password-error").innerText = "";
            isPasswordValid = true;
        }
    }

    function validatePassword2():void {
        const password2 = myForm["password2"].value;
        if (!myValidator.isPassword2(password2) && password2.length) {
            document.getElementById("password2-error").innerText = "Password cannot be blank"
            isPassword2Valid = false;
        } else {
            document.getElementById("password2-error").innerText = "";
            isPassword2Valid = true;
        }
    }

    function validateForm(event):void {
        event.preventDefault();
        const name = myForm["name"].value;
        const date = myForm["date"].value;
        const email = myForm["email"].value;
        const password = myForm["password"].value;
        const password2 = myForm["password2"].value;
        const nameWasEntered = myValidator.isRequired(name);
        const dateWasEntered = myValidator.isRequired(date);
        const emailWasEntered = myValidator.isRequired(email);
        const passwordWasEntered = myValidator.isRequired(password);
        const password2WasEntered = myValidator.isRequired(password2);

        if (isNameValid && isDateValid && isEmailValid && isPasswordValid && isPassword2Valid && nameWasEntered && dateWasEntered && emailWasEntered && passwordWasEntered && password2WasEntered) {
            myForm.submit()
        } else {
            alert('Нє, ну серйозно, нормально заповни форму');
        }
    }
