

export default class Settings {
    constructor(gravityWell = false, radius = 2) {
        this.gravityWell = gravityWell;
        this.radius = radius;
    }

    gravityWellOn() {
        if(!this.gravityWell) { this.gravityWell = true; }
    }

    gravityWellOff() {
        if (this.gravityWell) { this.gravityWell = false; }
    }

    changeRadius(radius) {
        this.radius = radius;
        this.gravityWellOff();
    }


}
