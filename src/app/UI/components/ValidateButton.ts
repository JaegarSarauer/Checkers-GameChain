import Button from './Button';

export default class ValidateButton extends Button {

    constructor(onClick: (button: ValidateButton) => void) {
        super();
        this.button = document.createElement('button');
        this.button.innerText = `Validate Game`;
        this.button.onclick = () => {
            onClick(this);
        };
        document.body.appendChild(this.button);
    }
}
