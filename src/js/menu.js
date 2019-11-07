function bindToMultipleButtons(htmlCollection, fn) {
    for(let i = 0; i < htmlCollection.length; i++) {
        htmlCollection[i].addEventListener('click', fn);
    }
}

export default function bindMenuEvents(world) {
    let small = document.getElementById('smallButton');
    let medium = document.getElementById('mediumButton');
    let large = document.getElementById('largeButton');
    let huge = document.getElementById('hugeButton');
    let gravityWell = document.getElementsByClassName('gravityWellButton');
    let reset = document.getElementsByClassName('resetButton');
    let pause = document.getElementsByClassName('pauseButton');


    bindToMultipleButtons(gravityWell, () => { world.settings.gravityWellOn()});
    bindToMultipleButtons(reset, () => { world.remove(world.getBodies()) });
    bindToMultipleButtons(pause, () => { world.isPaused() ? world.unpause() : world.pause() });
    small.addEventListener('click', () => { world.settings.changeRadius(2); });
    medium.addEventListener('click', () => { world.settings.changeRadius(4);  });
    large.addEventListener('click', () => { world.settings.changeRadius(6);  });
    huge.addEventListener('click', () => { world.settings.changeRadius(8); });
}
