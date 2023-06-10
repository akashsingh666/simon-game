var buttoncolors=["green","red","yellow","blue"];

var gamepattern=[];

var userclickedpattern=[];

var level=0;

var started=false;

$(document).keypress(function(){
    if(!started){
        nextMove();
        started=true;
    }
});

$(".btn").click(function(){
    var userchosencolor=$(this).attr("id");
    userclickedpattern.push(userchosencolor);
    animate(userchosencolor);
    playSound(userchosencolor);
    check(userclickedpattern.length-1);
});

function nextMove(){
    var randomnumber=Math.floor(Math.random()*4);
    var randomchoosencolor=buttoncolors[randomnumber];
    gamepattern.push(randomchoosencolor);
    level++;
    $("#level-title").text("Level " + level);
    userclickedpattern=[];
    $("#"+randomchoosencolor).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomchoosencolor);
}
function playSound(randomchoosencolor){
    var audio=new Audio("sounds/"+randomchoosencolor+".mp3");
    audio.play();
}

function animate(userchosencolor){
    $("#"+userchosencolor).addClass("pressed");
    setTimeout(function(){
    $("#"+userchosencolor).removeClass("pressed");
    },100);
}

function check(currentlevel){
    if(gamepattern[currentlevel]===userclickedpattern[currentlevel]){
        if(gamepattern.length===userclickedpattern.length){
            setTimeout(function(){
                nextMove();
            },1000);
        }
    }
    else{
        playSound("wrong");
      $("body").addClass("game-over");
      $("#level-title").text("Game Over, Press Any Key to Restart");

      setTimeout(function () {
        $("body").removeClass("game-over");
      }, 200);

      startOver();
    }
}

function startOver(){
    gamepattern=[];
    started=false;
    level=0;
}
