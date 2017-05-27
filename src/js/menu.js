export default function bindMenuEvents(world) {

    let small = document.getElementById('smallButton');
    let medium = document.getElementById('mediumButton');
    let large = document.getElementById('largeButton');
    let huge = document.getElementById('hugeButton');
    let gravityWell = document.getElementById('gravityWellButton');
    let reset = document.getElementById('resetButton');
    let pause = document.getElementById('pauseButton');


    gravityWell.addEventListener('click', () => { world.gravityWell = true; });
    small.addEventListener('click', () => { world.bodyRadius = 2; world.gravityWell = false; });
    medium.addEventListener('click', () => { world.bodyRadius = 4; world.gravityWell = false;  });
    large.addEventListener('click', () => { world.bodyRadius = 6; world.gravityWell = false;  });
    huge.addEventListener('click', () => { world.bodyRadius = 8; world.gravityWell = false;  });
    reset.addEventListener('click', () => { world.remove(world.getBodies()) });
    pause.addEventListener('click', () => { world.isPaused() ? world.unpause() : world.pause() });





}
