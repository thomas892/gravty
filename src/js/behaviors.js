import Physics from "physicsjs";


export default function Behaviors(world, renderer) {
    world.add([
        Physics.behavior('newtonian'),
        Physics.behavior('body-impulse-response', {
            check: 'collisions-edge:detected'
        }),
        Physics.behavior('body-collision-detection', {
            channel: 'collisions-body:detected'
        }),
        Physics.behavior('sweep-prune'),
        Physics.behavior('interactive', {el: renderer.container})

    ]);
}
