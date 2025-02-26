class ValidaFormulario {
    constructor() {
        this.form = document.querySelector('form');
        this.event();
    }

    event() {
        this.form.addEventListener('submit', e => {
            this.handleSubmit(e);
        });
    }

    handleSubmit(e) {
        e.preventDefault();
        const inputIsValid = this.inputIsValid();
        const passIsValid = this.passwordIsValid();

        if(inputIsValid && passIsValid) {
            alert('Formulário enviado');
            this.form.submit();
        }
    }

    inputIsValid() {
        let valid = true;

        for(let errorText of this.form.querySelectorAll('.error-text')) {
            errorText.remove();
        }

        for(let input of this.form.querySelectorAll('.validation')) {
            const label = input.previousElementSibling.innerHTML;
            if(!input.value){
                this.createError(input, `Campo "${label.slice(0, -1)}" não pode estar em branco`);
                valid = false;
            }
            if(input.classList.contains('cpf')) {
                if(!this.CPFIsValid(input)) {
                    this.createError(input, "CPF inválido");
                    valid = false;
                }
            }
        }
        return valid;
    }

    createError(input, message) {
        const div = document.createElement('div');
        div.innerHTML = message;
        div.classList.add('error-text', 'poppins-light');
        input.insertAdjacentElement('afterend', div);
    }

    CPFIsValid(input) {
        const cpf = new ValidaCPF(input.value);
        return cpf.valida() ? true : false;
    }

    passwordIsValid() {
        const password = this.form.querySelector('.password');
        const repeatPassword = this.form.querySelector('.repeat-password')

        if(password.value !== repeatPassword.value) {
            console.log(password);
            console.log(repeatPassword);
            this.createError(password, 'As senhas não coincidem');
            this.createError(repeatPassword, 'As senhas não coincidem');
            return false;
        }

        return true;
    }
    
}

const valida = new ValidaFormulario();

