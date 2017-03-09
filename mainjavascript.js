function switchWindow(screen) { // funktion för att byta skärm (fade)
	$("body > div").css({"display": 'none', "opacity": "0"});
	if(screen == "first") {
		$(".firstScreen").css("display", '').animate({opacity: "1"});
	} else if (screen == "second"){
		$(".secondScreen").css("display", 'flex').animate({opacity: "1"});
	} else if (screen == "result") {
		$(".resultScreen").css("display", 'flex').animate({opacity: "1"});
	} else if (screen == "scoreBoard") {
		$(".scoreBoard").css("display", 'flex').animate({opacity: "1"});
	}
}

$(".firstScreen h2:nth-of-type(1)").on("click", function() {
	switchWindow("second");
	importNewQuestion();
	centerQuestion();
});
$(".resultScreen h2:nth-of-type(1)").on("click", function(){
	switchWindow("first");
	$(".resultScreen h3, .socialMedia, .resultScreen h2").css("opacity", "0");
});
$(".firstScreen h2:nth-of-type(2)").on("click", function() {
	switchWindow("scoreBoard");
});

var questions = {}
var i = 1;
var score = 0;


function questionGenerator(list) { // tar en lista med frågan först, sen svar, constructor
	this.question = list[0]; // sätter frågan först i objektet
	for (i = 1; i < list.length - 2; i++) { // ger varje svar ett namn och sitt svar
		var name = "answer" + (i - 1);
		this[name] = list[i];
	}
	this.correct = list[list.length - 1];
	this.img = list[list.length - 2];
}

// Första är en fråga, och sista är rättsvarsindex, och dem i mitten är frågor
questions.question1 = new questionGenerator(["Vilket håll åker bussen?", "Höger", "Vänster", "Står still","buss.jpg", 2]);
questions.question2 = new questionGenerator(["Det finns 10 fiskar i ett akvarium. 2 av dem sjönk. 3 av dem simmade iväg. 2 av dem dog. Hur många finns kvar?", "8", "10", "3", "5","Teknikcollege.png", 2]);
questions.question3 = new questionGenerator(["Två personer sitter i en kanot, en paddlar åt väst och den andra åt ost. vilket håll åkte dem?", "Ingenstans", "Väst", "Ost","Teknikcollege.png", 1]);
questions.question4 = new questionGenerator(["Vilket sträck är längst?", "Övre", "Undre", "De är lika långa","strack.svg", 3]);
questions.question5 = new questionGenerator(["Om fyra barn äter fyra godispåsar på fyra dagar, så äter femtiosju barn femtiosju godispåsar på ... dagar?", "57 dagar", "4 dagar", "10 dagar","Teknikcollege.png", 2]);
questions.question6 = new questionGenerator(["Vilket av dessa fyra hus, A, B, C och D kan man rita utan att lyfta pennan från pappret eller dra samma sträck två gånger?", "B", "D", "C","Teknikcollege.png", 3]);
questions.question7 = new questionGenerator(["Om du går 1km söderut, 1km västerut, 1km norrut och kommer tillbaka till samma ställe var är du då?","Nordpolen", "Ekvatorn", "Kräftans vändkrets","Teknikcollege.png", 1]);
questions.question8 = new questionGenerator(["Vilken av figurerna A till D avslutar serien bäst?","A", "B", "C","D", "iqfraga.png", 4]);
var questionsToUse = Object.keys(questions);
var questionsToUsedCounter = 1;
var clicked = false;

function newQuestion() {
	if(Object.keys(questionsToUse).length > 0) { //Gör så att funktionen börjar om, kommer tas bort
		var newRandomIndex = Math.floor(Math.random()*Object.keys(questionsToUse).length); //ger ett random index från objekt arrayen
		var selectedQuestion = questionsToUse[newRandomIndex];
		questionsToUse.splice(newRandomIndex, 1); //tar bort alternativet som man har fått
		questionsToUsedCounter += 1;
		return selectedQuestion;
	}
}

function importNewQuestion() {
	if(Object.keys(questionsToUse).length > 0 && questionsToUsedCounter <= 3) { //Körs så länge det finns frågor att använda och man inte har nått maxgränsen på hur många frågor man vill ska komma
	var selectedQuestion = questions[newQuestion()];
		$(".questionDiv ul").empty(); //tömmer ulen från gamla svar
		var questionLength = Object.keys(selectedQuestion).length - 2; //ger längden på objektet med frågorna i
		$(".secondScreen div div p span").text(selectedQuestion.question).css("opacity", '0').animate({opacity: "1"}, 800); //uppdaterar frågan
		$(".questionLine").css("opacity", '0').animate({opacity: "1"}, 800); //fadear "Fråga"
		$(".secondScreen .imagecontainer div").css({"opacity": '0', "background-image": 'url("img/' + selectedQuestion.img + '")'}).animate({opacity: "1"}, 800);
		for(i = 1; i < questionLength; i++) {
			var li = ".questionDiv ul li:nth-of-type(" + i + ")";
			$(".questionDiv ul").append("<li></li>"); //lägger till en li
			$(li).text(selectedQuestion["answer" + (i - 1)]); //ger li:n text från korrekt fråga
			$(li).css("opacity", "0");
			$(li).animate({opacity: "1"}, 700);
			$(li).on("click",function() { //onclick style
				if(!clicked) {
					clicked = true;
					var indexAbove = $(this).index(); - 1; //li:n ovanför
					if($(this).index() + 1 == selectedQuestion.correct) { //kollar om svaret är rätt och ökar score med 1 ifall det stämmer
						console.log("correct");
						score += 1;
					}
					$(".questionDiv ul li").removeClass("selected border");
					$(this).addClass("selected");
					$(".questionDiv ul li").delay(250).fadeOut(550);
					$(".questionDiv ul li:nth-of-type(" + indexAbove + ")").addClass("border");
					var newQuestionTimer = setTimeout(function() {
						importNewQuestion();
						centerQuestion();
						clicked = false;
					}, 500);
				}
			});
		}
	} else {
		switchWindow("result");
		$("#tspan4155").text(score);
		$(".resultScreen h3").text(personalMessage[score][randomNumberBetweenZeroAnd(personalMessage[score].length - 1)]);
		setTimeout(function(){
			$(".resultScreen h3").animate({opacity: "1"}, 800);
			setTimeout(function(){
				$(".socialMedia").animate({opacity: "1"}, 800);
				setTimeout(function(){
					$(".resultScreen h2").animate({opacity: "1"}, 800);
				}, 500);
			}, 300);	
		}, 300);
		console.log("done", score);
		questionsToUse = Object.keys(questions);
		questionsToUsedCounter = 1;
		$(".questionDiv ul").empty();
		score = 0;
	}
}
function centerQuestion() { //för att centrera frågan om den inte är större eller lika med bredden av sin parent
	var checkSpanWidth = $(".question").width();
	var checkSpanHeigth = $(".question").height();
	var windowWidth = $(".secondScreen > div > div > div:last-child").width();
	if((checkSpanWidth < windowWidth) && (checkSpanHeigth <= 17)) { //om bredd mindre och inte mer än en rad, ÄNDRAS FONT-SIZE MÅSTE PIXLARNA HÄR ÄNDRAS
		$(".questionP").css("text-align", "center");
	} else {
		$(".questionP").css("text-align", "left");
	}
}
function randomNumberBetweenZeroAnd(number){ //funktion som väljer ett slumpmässigt heltal mellan 0 och number 
	this.value = Math.round(Math.random() * number);
	return this.value; 
}

var personalMessage = [
	["0/10 1", "0/10 2", "0/10 3", "0/10 4"],
	["1/10 1", "1/10 2", "1/10 3", "1/10 4"],
	["2/10 1", "2/10 2", "2/10 3", "2/10 4"],
	["3/10 1", "3/10 2", "3/10 3", "3/10 4"],
	["4/10 1", "4/10 2", "4/10 3", "4/10 4"],
	["5/10 1", "5/10 2", "5/10 3", "5/10 4"],
	["6/10 1", "6/10 2", "6/10 3", "6/10 4"],
	["7/10 1", "7/10 2", "7/10 3", "7/10 4"],
	["8/10 1", "8/10 2", "8/10 3", "8/10 4"],
	["9/10 1", "9/10 2", "9/10 3", "9/10 4"],
	["10/10 1", "10/10 2", "10/10 3", "10/10 4"]
];