$(document).ready(function() {
$('h1').hide().delay(500).fadeIn('slow');
$('.status').hide().delay(700).fadeIn('slow');
generateQuestions()
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
questions [1] = new Question ("How high is the world record high ollie?",["40 in (101.6 cm)", "42 in (106.68 cm)", "45 in (114.3 cm)", "46 in (116.84 cm)", "48 in (121.92 cm)"], 2);
questions [2] = new Question ("Who has earned more prize money than any skateboarder in history?",["Tony Hawk", "Ryan Sheckler" , "Paul Rodriguez", "Steve Caballero", "Nyjah Huston"], 4);
questions [3] = new Question ("Which one of these is not a skateboarding trick?",["Kickflip", "Hardflip", "Heelflip", "Toeflip", "Fingerflip"], 3);
questions [4] = new Question ("What material revolutioised skateboard wheels in the 1970?",["Polyurethane", "Rubber", "Clay", "Wood", "Carbon Fibre"], 0);



// Write first question to page
function generateQuestions() {
var q1 = questions [currentQuestion].currentQuestion;
$('#heading').append('<h4>' + q1 + '</h4>').hide().delay(1200).fadeIn('slow');
var write = "";
var a1 = questions [currentQuestion].answers;
for (var i = 0; i < a1.length; i++) {
    write += "<li><input type='radio' name='radio' class='option' value=" +(i)+ ">" + a1[i]+ "</li>";
};
$("#answers").append(write).hide().delay(1700).slideDown('slow');
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
	$('#correct').append("<p>Correct</p>").hide().delay(400).fadeIn('400');
	$('#next').append("<p>Next</p>").hide().delay(400).fadeIn('400');
	next();
	playerScore()
	currentQuestion++

}
	

else {
	$('#incorrect').append("<p>Incorrect.<span class='correct-answer'>The correct answer was" + " " + questions[currentQuestion].answers[questions [currentQuestion].correct] + "</span></p>").hide().delay(400).fadeIn('400');
	$('#next').append("<p>Next</p>").hide().delay(400).fadeIn('400');
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
		generateQuestions();
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
	$('#heading').append("<h4>Quiz complete. You scored" + " " + score + " " + "out of 5" + "<div class='restart'><p>Restart</p></div></h4>").hide().fadeIn('400');
}

function restart() {
	$('.restart').click(function() {

	currentQuestion = 0;
	score = (score-(score+1));
	questions [0]
	
	$('#score').hide().delay(400).fadeIn('slow');
	$('#question').hide().delay(400).fadeIn('slow');

	$('h4').remove();
	$('li').remove();
	$(".outcome p").remove();

	questionNuber();
	generateQuestions()
	submit();
	playerScore();
	$('.status').show();
	});
};











