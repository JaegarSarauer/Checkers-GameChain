import Button from "./Button";

export default class JoinLobbyButton extends Button {

    constructor(label: string, onClick: (button: JoinLobbyButton)=>void) {
        super();
        this.button = document.createElement('button');
        this.button.innerText = label;
        this.button.onclick = () => {
            onClick(this);
        };
        document.body.appendChild(this.button);
    }
}