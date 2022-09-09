export default class Button {
    button: any;

    toggleVisibility(isVisible: boolean) {
        if (this.button) this.button.style.visibility = isVisible ? 'visible' : 'hidden';
    }
}
