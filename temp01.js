document.querySelector('.control-button span').onclick = function () {
    'use strict';
    let yourName = prompt("what's your name?");

    if (yourName == null || yourName == '') {
        document.querySelector('.info .name span').innerHTML = 'Unknown';
    } else {
        document.querySelector('.info .name span').innerHTML = yourName;
    }

    document.querySelector('.control-button').remove();
}

let duration = 1000;

let blocksContainer = document.querySelector('.container-game-blocks'),
    blocks = Array.from(blocksContainer.children),
    //  orderRange = Array.from(Array(blocks.length).keys()); // another way
    orderRange = [...Array(blocks.length).keys()];

function shuffle(array) {
    let currentIndex = array.length,
        temporaryValue,
        randomIndex;
    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        // And swap it with the current element.
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }
    return array;
}

// another advanced way to shuflling
/*
function shuffle(array) {
    array.sort(() => Math.random() - 0.5);
}
*/

shuffle(orderRange);

blocks.forEach((block, index) => {
    block.style.order = orderRange[index];
    block.addEventListener('click', function () {
        flipping(block);
    });

});



function flipping(selectBlock) {
    selectBlock.classList.add('flipped');

    let allFlippedBlock = blocks.filter(filippedBlock => filippedBlock.classList.contains('flipped'));
    if (allFlippedBlock.length === 2) {
        stopClick();
        cheak(allFlippedBlock[0], allFlippedBlock[1]);
    }
}


function stopClick() {
    blocksContainer.classList.add('no-click');
    setTimeout(() => {
        blocksContainer.classList.remove('no-click');
    }, duration);
}

function cheak(firstBlock, secondBlock) {
    let tries = document.querySelector('.tries span');

    if (firstBlock.getAttribute('data-tech') === secondBlock.getAttribute('data-tech')) {
        firstBlock.classList.remove('flipped');
        secondBlock.classList.remove('flipped');

        firstBlock.classList.add('mached');
        secondBlock.classList.add('mached');
    } else {
        tries.innerHTML = parseInt(tries.innerHTML) + 1;

        setTimeout(() => {
            firstBlock.classList.remove('flipped');
            secondBlock.classList.remove('flipped');
        }, duration);

    }

}