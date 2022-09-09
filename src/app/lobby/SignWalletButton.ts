import Button from "./Button";

export default class SignWalletButton extends Button {
    button: any;

    constructor(onClick: (button: JoinLobbyButton)=>void) {
        super();
        this.button = document.createElement('button');
        this.button.innerText = 'Sign Game Team';
        this.button.onclick = () => {
            onClick(this);
        };
        document.body.appendChild(this.button);
    }
}