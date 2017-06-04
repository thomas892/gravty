import Physics from "physicsjs";

export default class Renderer {

    constructor() {
        this.viewportWidth = document.getElementById('viewport').getBoundingClientRect().width;
        this.viewportHeight = document.getElementById('viewport').getBoundingClientRect().height;

        this.renderer = Physics.renderer('canvas', {
            el: 'viewport',
            width: this.viewportWidth,
            height: this.viewportHeight
        });
    }

    resize(world) {
        this.getViewport();
        world.removeBehavior('edge-collision-detection');
        world.add(
            Physics.behavior(
                'edge-collision-detection',
                {
                    aabb: Physics.aabb(0, 0, this.viewportWidth, this.viewportHeight),
                    restitution: 1,
                    channel:'collisions-edge:detected'
                }
            )
        );
    }

    getRenderer() {
        return this.renderer;
    }

    getViewport() {
        this.viewportWidth = document.getElementById('viewport').getBoundingClientRect().width;
        this.viewportHeight = document.getElementById('viewport').getBoundingClientRect().height;
    }
}
