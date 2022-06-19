
//Create a function that generates time

let score = 0;

function getSadInterval() {
    return Date.now() + 1000;   //Moles will be sad for 1 second before they dissapear
}

function getGoneInterval() {
    return Date.now() + Math.floor(Math.random() * 18000) + 2000;  
}

function getHungryInterval() {
    return Date.now() + Math.floor(Math.random()*3000) + 2000; //2-5 seconds
}


function getKingStatus () {
    return Math.random() > 0.9;
}


// 1.) create an object that represents each one of these moles
const moles = [                          //this is an array
    {
        status:"sad",                    //this section is an object
        next: getSadInterval(),         //they will be sad for 1 second (the next time their status will change)
        king: false,
        node:document.querySelector('#hole-0')     //represents each hole a mole appearts
    },
    {
        status:"sad",                    
        next: getSadInterval(),         
        king: false,
        node:document.querySelector('#hole-1') 
    },
    {
        status:"sad",                    
        next: getSadInterval(),         
        king: false,
        node:document.querySelector('#hole-2') 
    },
    {
        status:"sad",                    
        next: getSadInterval(),         
        king: false,
        node:document.querySelector('#hole-3') 
    },
    {
        status:"sad",                    
        next: getSadInterval(),         
        king: false,
        node:document.querySelector('#hole-4') 
    },
    {
        status:"sad",                    
        next: getSadInterval(),         
        king: false,
        node:document.querySelector('#hole-5') 
    },
    {
        status:"sad",                    
        next: getSadInterval(),         
        king: false,
        node:document.querySelector('#hole-6') 
    },
    {
        status:"sad",                    
        next: getSadInterval(),         
        king: false,
        node:document.querySelector('#hole-7') 
    },
    {
        status:"sad",                    
        next: getSadInterval(),         
        king: false,
        node:document.querySelector('#hole-8') 
    },
    {
        status:"sad",                    
        next: getSadInterval(),         
        king: false,
        node:document.querySelector('#hole-9') 
    }
    
];

//next, start going over time looking at Intervals (setInterval(runs always) versus requestAnimationFrame(runs when browser is idle))
//running continuously

function getNextStatus (mole) {
    switch (mole.status) {
        case "sad":
        case "fed":    
            mole.next = getSadInterval();
            mole.status = "leaving";
            if (mole.king){
                mole.node.children[0].src = './king-mole-leaving.png';
            }else {
            mole.node.children[0].src = './mole-leaving.png';
            }
            break;
        case "leaving":
            mole.next = getGoneInterval();
            mole.status = 'gone';
            mole.node.children[0].classList.add("gone");
            break;
        case "gone":
            mole.status = 'hungry';
            mole.king = getKingStatus();
            mole.next = getHungryInterval();
            mole.node.children[0].classList.add("hungry");
            mole.node.children[0].classList.remove("gone");
            if (mole.king) {
                mole.node.children[0].src = './king-mole-hungry.png';
            } else{
            mole.node.children[0].src = './mole-hungry.png';
            }
            break;
        case "hungry":
            mole.status = 'sad';
            mole.next = getSadInterval();
            mole.node.children[0].classList.remove("hungry");
            if (mole.king){
                mole.node.children[0].src = './king-mole-sad.png';
            } else {
                mole.node.children[0].src = './mole-sad.png';
            }
            break;         
    }
};

// This function is programmed to have each mole to show up and dissapear, then go through gone, hungry, sad, leaving, then repeat)

function feed (event) {
    if (event.target.tagName !== 'IMG' || 
    !event.target.classList.contains("hungry")) {  //!== means "not equal" || is "Or" and !event means not hungry mole
        return;
    }
    
    const mole = moles[parseInt(event.target.dataset.index)]

    mole.status = 'fed';
    mole.next = getSadInterval();
    if (mole.king) {
        score = score + 2;
        mole.node.children[0].src = './king-mole-fed.png';
    } else {
        score++;
    mole.node.children[0].src = './mole-fed.png';
    }
    mole.node.children[0].classList.remove('hungry');

    if (score >= 10){
        win();
    }
    document.querySelector('.worm-container').style.width = 
        `${10*score}%`;
}

function win() {
    document.querySelector('.bg').classList.add("hide");
    document.querySelector('.win').classList.remove("hide");
}

let runAgainAt = Date.now() + 100;    //we will run this function every 10th of a millisecond (100)
function nextFrame () {
    const now = Date.now();

    if (runAgainAt <= now) {
     for (let i = 0; i < moles.length; i++) {
        if(moles[i].next <= now) {
            getNextStatus(moles[i]);
        }
    }
      
  }
  requestAnimationFrame(nextFrame);
}

document.querySelector('.bg').addEventListener('click', feed);

nextFrame();