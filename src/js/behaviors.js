import Physics from "physicsjs";

export default function addBehaviors(world, renderer) {
    world.add([
        Physics.behavior('newtonian'),
        Physics.behavior('body-collision-detection', {
            channel: 'collisions-body:detected'
        }),
        Physics.behavior('sweep-prune'),
        Physics.behavior('interactive', {el: renderer.container})

    ]);
}
