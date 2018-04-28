class drop{
  constructor(x, y, lifespan, weight){
    this.x = x;
    this.y = y;
    this.lifespan = lifespan;
    this.weight = weight;
    this.life = 0;
    this.alive = true;
    let rand = Math.floor(random(3));
    if(rand ==  0) this.sound = new Audio('sound/high.mp3');
    else if(rand == 1) this.sound = new Audio('sound/medium.mp3');
    else if(rand == 2) this.sound = new Audio('sound/low.mp3');
    if(tracker.sound) this.sound.play()
  }
  handle(){
    // if(this.life == 1) this.sound.play();
    if(this.life <= this.lifespan){
      let opacity = map(this.life, this.lifespan, 0, 0, 1);
      if(tracker.theme == "pond") stroke(`rgba(0, 106, 255, ${opacity})`);
      else if(tracker.theme == "lava") stroke(`rgba(221, 82, 2, ${opacity})`);
      else if(tracker.theme == "black and white") stroke(`rgba(0, 0, 0, ${opacity})`);
      ellipse(this.x, this.y, 5 * this.life);
      this.life++;
    }else this.alive = false;
  }
}
class Tracker{
  constructor(){
    this.frequency = 50;
    this.minLifespan = 20;
    this.maxLifespan = 120;
    this.weight = 1;
    this.sound = false;
    this.theme = "pond";
  }
}
tracker = new Tracker

function setup() {
  createCanvas(windowWidth, windowHeight);
  const canvas = $('#defaultCanvas0');
  fill(0, 0, 0, 0);
  drops = [];
}

function draw(){
  if(tracker.theme == 'pond') background(66, 167, 244);
  else if(tracker.theme == 'lava') background(255, 140, 73);
  else if(tracker.theme == 'black and white') background(255, 255, 255);
  for(let i=drops.length-1; i>=0; i--){
    strokeWeight(drops[i].weight);
    drops[i].handle();
    if(!drops[i].alive) drops.splice(i, 1)
  }
  if(tracker.frequency != 0 && Math.floor(random(0, 100 - tracker.frequency)) == 0){
    drops.push(new drop(random(0, windowWidth), random(0, windowHeight), Math.floor(random(tracker.minLifespan, tracker.maxLifespan)), Math.floor(random(1, tracker.weight + 1))));
  }
}

function mouseClicked(){
  drops.push(new drop(mouseX, mouseY, Math.floor(random(tracker.minLifespan, tracker.maxLifespan)), Math.floor(random(1, tracker.weight + 1))));
}

$(document).ready(function(){
  const gear = $('#gear');
  const settingsDiv = $('#settingsDiv');
  const frequencySlider = $('#frequencySlider');
  const frequencyText = $('#frequencyText');
  const minLifespanSlider = $('#minLifespanSlider');
  const minLifespanText = $('#minLifespanText');
  const maxLifespanSlider = $('#maxLifespanSlider');
  const maxLifespanText = $('#maxLifespanText');
  const weightSlider = $('#weightSlider');
  const weightText = $('#weightText');
  const soundToggle = $('#sound');
  const themeSelector = $('#themeSelector');
  frequencySlider.val(tracker.frequency);
  minLifespanSlider.val(tracker.minLifespan);
  maxLifespanSlider.val(tracker.maxLifespan);
  weightSlider.val(tracker.weight);
  gear.click(function(){
    if(settingsDiv.css('display') == 'none'){
      settingsDiv.css({'display': 'block'});
      settingsDiv.animate({'opacity': '.4'}, 400);
    }else{
      settingsDiv.animate({'opacity': '0'}, 400);
      setTimeout(function(){
        settingsDiv.css({'display': 'none'});
      }, 400);
    }
  });
  frequencySlider.change(function(){
    tracker.frequency = $(this).val();
    frequencyText.text(tracker.frequency)
  });
  minLifespanSlider.change(function(){
    tracker.minLifespan = $(this).val();
    minLifespanText.text(tracker.minLifespan);
  });
  maxLifespanSlider.change(function(){
    tracker.maxLifespan = $(this).val();
    maxLifespanText.text(tracker.maxLifespan);
  });
  weightSlider.change(function(){
    tracker.weight = $(this).val();
    weightText.text(tracker.weight);
  });
  soundToggle.click(function(){
    $(this).toggleClass('sounding');
    if($(this).hasClass('sounding')){
      soundToggle.attr('src', 'images/soundOn.png');
      tracker.sound = true;
    }else{
      soundToggle.attr('src', 'images/soundOff.png');
      tracker.sound = false;
    }
  });
  themeSelector.change(function(){
    tracker.theme = $(this).val();
  });
});
