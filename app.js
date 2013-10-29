$(document).ready(function() {

generateQ1()
submit();
restart();

	});

var currentQuestion = 0;

var questions = new Array();

function Question(currentQuestion,answers,correct) {
	this.currentQuestion = currentQuestion;
	this.answers = answers;
	this.correct = correct;
}

questions [0] = new Question ("Who is famous for doing the first 900?",["Bob Burnquist", "Tony Hawk", "Andy Mac Donald", "Chad Muska", "Rodney Mullen"], 1);
questions [1] = new Question ("How high is the world record high ollie?",["place", "place", "45 in (114.3 cm)", "place", "place"], 2);
questions [2] = new Question ("Who has earned more prize money than any skateboarder in history?",["Tony Hawk", "Ryan Sheckler" , "Paul Rodriguez", "Steve Caballero", "Nyjah Huston"], 4);
questions [3] = new Question ("Which one of these is not a skateboarding trick?",["Kickflip", "Hardflip", "Heelflip", "Toeflip", "Fingerflip"], 3);
questions [4] = new Question ("What material revolutioised skateboard wheels in the 1970?",["Polyurethane", "Rubber", "Clay", "Wood", "Carbon Fibre"], 0);



// Write first question to page
function generateQ1() {
var q1 = questions [currentQuestion].currentQuestion;
$('#heading').append('<h4>' + q1 + '</h4>').hide().fadeIn('slow');
var write = "";
var a1 = questions [currentQuestion].answers;
for (var i = 0; i < a1.length; i++) {
    write += "<li><input type='radio' name='radio' class='option' value=" +(i)+ ">" + a1[i]+ "</li>";
};
$("#answers").append(write).hide().slideDown('slow');;
// document.getElementById('answers').innerHTML = write;
};


// Radio button being clicked
function submit(){
$('.option').click(function() {
   if($("input[type='radio'][name='radio']").is(':checked')) { 
   	evaluation();
   	$('.option').attr('disabled',true); 
   }
});
};



var selectedAnswer = "";


// Evaluate answer 
function evaluation() {

var selected = $("input[type='radio'][name='radio']:checked");
if (selected.length >= 0) {
    selectedAnswer = selected.val();
};

if (selectedAnswer == questions [currentQuestion].correct) {
	$('#correct').append("<p>Correct</p>");
	$('#next').append("<p>Next</p>");
	next();
	playerScore()
	currentQuestion++

}
	

else {
	$('#incorrect').append("<p>Incorrect.<span class='correct-answer'>The correct answer was" + " " + questions[currentQuestion].answers[questions [currentQuestion].correct] + "</span></p>");
	$('#next').append("<p>Next</p>");
	next();
	currentQuestion++
}

}


function next() {
	$("#next").click(function() {
		$('h4').remove();
		$('li').remove();
		$(".outcome p").remove();

if (currentQuestion >= 5) {
	complete();
	restart();
	return;
}
else {
		generateQ1();
		questionNuber();
		submit();
}

	});

}

var score = 0;

function playerScore() {
	$('#score p').remove();
	score++
	$('#score').append(" " + '<p>' + score + '</p>');

}

function questionNuber() {
	$('#question p').remove();
	$('#question').append(" " + '<p>' + (currentQuestion +1) + '/5</p>');

}

function complete() {
	$('.status').hide();
	$('#heading').append("<h4>Quiz complete. You scored" + " " + score + " " + "out of 5<br>To try again click" + "<div class='restart'></div></h4>")
}

function restart() {
	$('.restart').click(function() {

	currentQuestion = 0;
	score = (score-(score+1));
	questions [0]
	
	$('h4').remove();
	$('li').remove();
	$(".outcome p").remove();

	questionNuber();
	generateQ1()
	submit();
	playerScore();
	$('.status').show();
	});
};











