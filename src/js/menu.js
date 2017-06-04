export default function bindMenuEvents(world) {

    let small = document.getElementById('smallButton');
    let medium = document.getElementById('mediumButton');
    let large = document.getElementById('largeButton');
    let huge = document.getElementById('hugeButton');
    let gravityWell = document.getElementById('gravityWellButton');
    let reset = document.getElementById('resetButton');
    let pause = document.getElementById('pauseButton');


    gravityWell.addEventListener('click', () => { world.settings.gravityWellOn() });
    small.addEventListener('click', () => { world.settings.changeRadius(2); });
    medium.addEventListener('click', () => { world.settings.changeRadius(4);  });
    large.addEventListener('click', () => { world.settings.changeRadius(6);  });
    huge.addEventListener('click', () => { world.settings.changeRadius(8); });
    reset.addEventListener('click', () => { world.remove(world.getBodies()) });
    pause.addEventListener('click', () => { world.isPaused() ? world.unpause() : world.pause() });





}
