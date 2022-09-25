import Button from './Button';

export default class LoadReceiptButton extends Button {

    constructor(onClick: (button: LoadReceiptButton) => void) {
        super();
        this.button = document.createElement('button');
        this.button.innerText = `Load Receipt`;
        this.button.onclick = () => {
            onClick(this);
        };
        document.body.appendChild(this.button);
    }
}
