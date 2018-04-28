class drop{
  constructor(x, y, lifespan){
    this.x = x;
    this.y = y;
    this.lifespan = lifespan;
    this.life = 0;
    this.alive = true;
  }
  handle(){
    if(this.life <= this.lifespan){
      let opacity = map(this.life, this.lifespan, 0, 0, 1);
      stroke(`rgba(0, 0, 0, ${opacity})`);
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
  background(255, 255, 255);
  for(let i=drops.length-1; i>=0; i--){
    drops[i].handle();
    if(!drops[i].alive) drops.splice(i, 1)
  }
  if(tracker.frequency != 0 && Math.floor(random(0, 100 - tracker.frequency)) == 0){
    drops.push(new drop(random(0, windowWidth), random(0, windowHeight), Math.floor(random(tracker.minLifespan, tracker.maxLifespan))));
  }
}

function mouseClicked(){
  drops.push(new drop(mouseX, mouseY, Math.floor(random(tracker.minLifespan, tracker.maxLifespan))));
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
  frequencySlider.val(tracker.frequency);
  minLifespanSlider.val(tracker.minLifespan);
  maxLifespanSlider.val(tracker.maxLifespan);
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
});
