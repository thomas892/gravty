import Physics from "physicsjs";

export default class Renderer {

    constructor() {
        this.viewportWidth = document.getElementById('viewport').getBoundingClientRect().width;
        this.viewportHeight = document.getElementById('viewport').getBoundingClientRect().height;

        this.renderer = Physics.renderer('canvas', {
            el: 'viewport',
            width: this.viewportWidth,
            height: this.viewportHeight,
            // autoResize: false
        });
    }

    getRenderer() {
        return this.renderer;
    }
}
