// Aplication to practice Constructor Functions, Prototypes and Object.defineProperty

const input = document.querySelector('.cpf')
const btn = document.querySelector('.btn')

btn.addEventListener('click', e => {
    const text = document.querySelector('.text')

    if(input.value) {
        const cpf = new ValidateCpf(input.value)

        if(cpf.validate()) {
            text.style.color = "#00d100";
            text.innerText = 'CPF válido';
        } else {
            text.style.color = "red";
            text.innerText = 'CPF inválido';
        }
    } else {
        input.value = generateValidCPF()
        handleBtnText()
    }
});

const handleBtnText = () => {
    if (input.value) btn.innerText = 'Validar'
    else btn.innerText = 'Gerar'
}

input.addEventListener('keyup', handleBtnText())

function ValidateCpf(cpf) {
    Object.defineProperty(this, 'cleanCPf', {
        enumerable: true,
        get: () => cpf.replace(/\D+/g, '')
    })
}

const generateValidCPF = () => {
    let condition = false
    let random = null

    while(condition === false) {
        random = generateRandomNDigits(11)
        condition = new ValidateCpf(random).validate()
    }
    return random
}

const generateRandomNDigits = n => {
    n -= 1
    return String(Math.floor(Math.random() * (9 * (Math.pow(9, n)))) + (Math.pow(10, n)))
}

ValidateCpf.prototype.validate = function() {
    if (typeof this.cleanCPf === 'undefined' ||
        this.cleanCPf.length !== 11 ||
        this.isSquential()) return false

    const parcialCpf = this.cleanCPf.slice(0, -2)
    const digit1 = this.handleDigit(parcialCpf)
    const digit2 = this.handleDigit(parcialCpf + digit1)
    
    cpfValidated = parcialCpf + digit1 + digit2

    return cpfValidated === this.cleanCPf
}

ValidateCpf.prototype.handleDigit = function(cpfParcial) {
    const cpfArr = Array.from(cpfParcial)
    let count = cpfArr.length + 1

    let total = cpfArr.reduce((ac, val) => {
        ac += (count * Number(val))
        count --
        return ac
    }, 0)

    const digit = 11 - (total % 11)
    return (digit > 9 ? '0' : String(digit))
}

ValidateCpf.prototype.isSquential = function() {
    const sequence = this.cleanCPf[0].repeat(11)
    return sequence === this.cleanCPf
}
