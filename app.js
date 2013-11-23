$(document).ready(function() {
$('h1').hide().delay(500).fadeIn('slow');
$('.status').hide().delay(700).fadeIn('slow');
generateQuestions();
generateAnswers();
submit();
restart();
}); // end of document ready

var currentQuestion = 0;
var selectedAnswer = "";
var score = 0;
var questions = new Array();

function Question(currentQuestion,answers,correct) {
	this.currentQuestion = currentQuestion;
	this.answers = answers;
	this.correct = correct;
}

questions [0] = new Question ("Where did skateboarding originate from?",["London", "Hawaii", "Cape Town", "Sydney", "California"], 4);
questions [1] = new Question ("Who is known for doing to first Ollie?",["Tony Alva", "Christian Hosoi", "Alan Gelfand", "Steve Caballero", "Stacy Peralta"], 2);
questions [2] = new Question ("What is the world record for the highest Ollie?",["40 in (101.6 cm)", "42 in (106.68 cm)", "45 in (114.3 cm)", "46 in (116.84 cm)", "48 in (121.92 cm)"], 2);
questions [3] = new Question ("What material revolutioised skateboard wheels in the 1970s?",["Polyurethane", "Rubber", "Clay", "Wood", "Carbon Fibre"], 0);
questions [4] = new Question ("Who is famous for doing the first 900?",["Bob Burnquist", "Tony Hawk", "Andy MacDonald", "Danny Way", "Rodney Mullen"], 1);
questions [5] = new Question ("Who has the most X-Games medals?",["Bucky Lasek", "Ryan Sheckler", "Tony Hawk", "Bob Burnquist", "Rodney Mullen"], 3);
questions [6] = new Question ("Who has earned more prize money than any skateboarder in history?",["Tony Hawk", "Chad Muska" , "Paul Rodriguez", "Ryan Sheckler", "Nyjah Huston"], 4);
questions [7] = new Question ("Which one of these is not a skateboarding trick?",["Kickflip", "Hardflip", "Heelflip", "Toeflip", "Fingerflip"], 3);
questions [8] = new Question ("A switch Ollie from the front of the board is a ... ?",["Fakie Ollie", "Front Foot Ollie", "Switch Ollie", "Nollie", "Follie"], 3);
questions [9] = new Question ("Which of these is not part of a skateboard?",["Trucks", "Wheels", "Rubbers", "Bearings", "Bushings"], 2);


// Write questions to page
function generateQuestions() {
var q = questions [currentQuestion].currentQuestion;
$('#heading').append('<h4>' + q + '</h4>').hide().delay(1200).fadeIn('slow');
}

function generateAnswers(){
var write = "";
var a1 = questions [currentQuestion].answers;
for (var i = 0; i < a1.length; i++) {
    write += "<li><input type='radio' name='radio' class='option' value=" +(i)+ ">" + a1[i]+ "</li>";
}
$("#answers").append(write).hide().delay(1800).slideDown('slow');
}

// Radio button being clicked
function submit(){
$('.option').click(function() {
   if($("input[type='radio'][name='radio']").is(':checked')) { 
   	evaluation();
   	$('.option').attr('disabled',true); 
   }
});
}

// Evaluate answer 
function evaluation() {
var selected = $("input[type='radio'][name='radio']:checked");
	if (selected.length >= 0) {
    	selectedAnswer = selected.val();
	}
	if (selectedAnswer == questions [currentQuestion].correct) {
		$('#correct').append("<p>Correct!</p>").hide().delay(400).fadeIn('400');
		$('#next').append("<p>Next</p>").hide().delay(400).fadeIn('400');
		nextQuestion();
		playerScore();
		currentQuestion++;
	}
	
	else {
		$('#incorrect').append("<p>Incorrect.</p>").hide().delay(400).fadeIn('400');
		$('#next').append("<p>Next</p>").hide().delay(400).fadeIn('400');
		$('#correct-answer').append("<p>The correct answer was" + " " + questions[currentQuestion].answers[questions [currentQuestion].correct] + "</p>").hide().delay(400).fadeIn('400');
		nextQuestion();
		currentQuestion++;
	}
}

function nextQuestion() {
 	$("#next").click(function() {
		$('h4').remove();
		$('li').remove();
		$(".outcome p").remove();

if (currentQuestion >= 10) {
	complete();
	restart();
	return;
	}
else {
	questionNumber();
	generateQuestions();
	generateAnswers();
	submit();
	}
});

}

function playerScore() {
	$('#score p').remove();
	score++;
	$('#score').append(" " + '<p>' + score + '</p>');

}

function questionNumber() {
	$('#question p').remove();
	$('#question').append(" " + '<p>' + (currentQuestion +1) + '/10</p>');
}

function complete() {
	$('.status').hide();
	$('#heading').append("<h4>Quiz complete. You scored" + " " + score + " " + "out of 10 <br>" + "<div class='restart'><p>Restart</p></div></h4>").hide().fadeIn('400');
	$('.restart').addClass('quiz-end');
}

function restart() {
	$('.restart').click(function() {
		$('.restart').removeClass('quiz-end');
		currentQuestion = 0;
		score = (score-(score+1));
		questions [0];
		$('#score').hide().delay(400).fadeIn('slow');
		$('#question').hide().delay(400).fadeIn('slow');
		$('h4').remove();
		$('li').remove();
		$(".outcome p").remove();
		questionNumber();
		generateQuestions();
		generateAnswers();
		submit();
		playerScore();
		$('.status').show();
	});
}