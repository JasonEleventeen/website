/* Randomize array in-place using Durstenfeld shuffle algorithm */
function shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
}

document.addEventListener("DOMContentLoaded", function(){

    const maxImage = 20;

    const img11 = [...document.querySelectorAll('.img-11')];

    function getOptions(){
        let options = Array.from(Array(maxImage).keys());
        options.shift(); // remove zero
        shuffleArray(options);
        return options;
    }

    let options = getOptions();
;
    // preload all images
    options.forEach((option) => {
        const img = new Image();
        img.src = `./images/11/${option}.jpeg`;
    });

    // set initial images
    for(let i = 0; i < img11.length; i++){
        img11[i].style.backgroundImage = `url(./images/11/${options[i]}.jpeg)`;
        const hidden = img11[i].childNodes[0];
        hidden.classList.add('show');
    }

    function animate(){

        // select random tile
        const tile = Math.floor(Math.random() * img11.length);

        let options = getOptions();

        // filter out the already shown images to avoid duplicates
        const existing = img11.map((img) => parseInt(img.style.backgroundImage.split('.jpeg')[0].split('11/')[1]));
        options = options.filter((option) => !existing.includes(option));

        // animate the tile
        const hidden = img11[tile].childNodes[0];

        hidden.addEventListener('transitionend', function() {
            this.removeEventListener('transitionend',arguments.callee, false);

            img11[tile].style.backgroundImage = `url(./images/11/${options[0]}.jpeg)`;
            hidden.classList.add('show');

            setTimeout(animate, 1000);

        }, false);

        hidden.classList.remove('show');
    }

    setTimeout(animate, 1000);

});