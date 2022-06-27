function Calculator() {
    this.display = document.querySelector('.display')

    this.init = () => {
        this.buttonClick();
        this.pressKey();
    }

    this.clearDisplay = () => this.display.value = '';
    this.delOne = () => this.display.value = this.display.value.slice(0, -1);
    this.btnToDisplay = value => this.display.value += value;   

    this.pressKey = () => {
        this.display.addEventListener('keydown', e => {
            if (e.keyCode === 13) {
                this.calculate();
            }
            else if (e.keyCode === 8) {
                e.preventDefault();
                this.clearDisplay();
            }
        })
    }

    this.buttonClick = () => {
        document.addEventListener('click', e => {
            const el = e.target;

            if (el.classList.contains('btn-num'))  this.btnToDisplay(el.innerText);
            else if (el.classList.contains('btn-clear')) this.clearDisplay();
            else if (el.classList.contains('btn-del')) this.delOne();
            else if (el.classList.contains('btn-eq')) this.calculate();

            this.display.focus();
        });
    }

    this.calculate = () => {
        let calc = this.display.value;

        try {
            calc = eval(calc);

            if(!calc) {
                alert('Conta inválida');
                return;
            }

            this.display.value = String(calc);
        } catch(e) {
            alert('Conta inválida');
            return;
        }
    }
}
  
const calculator = new Calculator();
calculator.init();
  