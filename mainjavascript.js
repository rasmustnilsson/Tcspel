function switchWindow(screen) {
	if(screen == "first") {
		$("body > div").css("display", 'none');
		$(".firstScreen").css("display", '');
	} else if (screen == "second"){
		$("body > div").css("display", 'none');
		$(".secondScreen").css("display", 'flex');
	}
}
$(".firstScreen h2").on("click", function() {
	switchWindow("second");
});

var questions = {}
var i = 1;
var score = 0;


function questionGenerator(list) { // tar en lista med frågan först, sen svar, constructor
	this.question = list[0]; // sätter frågan först i objektet
	for (i = 1; i < list.length - 1; i++) { // ger varje svar ett namn och sitt svar
		var name = "answer" + (i - 1);
		this[name] = list[i];
	}
	this.correct = list[list.length - 1];
}

// Första är en fråga, och sista är rättsvarsindex, och dem i mitten är frågor
<<<<<<< HEAD
questions.question1 = new questionGenerator(["Vilket håll åker bussen?", "Höger", "Vänster", "Står still", 2]);
questions.question2 = new questionGenerator(["Det finns 10 fiskar i ett akvarium. 2 av dem sjönk. 3 av dem simmade iväg. 2 av dem dog. Hur många finns kvar?", "8", "10", "3", "5", 2]);
questions.question3 = new questionGenerator(["Två personer sitter i en kanot, en paddlar åt väst och den andra åt ost. vilket håll åkte dem?", "ingenstans", "väst", "ost", 1]);
questions.question4 = new questionGenerator(["Vilken sträck är längst?", "höger", "vänster", "båda", 3]);
questions.question4 = new questionGenerator(["Om fyra barn äter fyra godispåsar på fyra dagar, så äter femtiosju barn femtiosju godispåsar på ... dagar?", "57 dagar", "4 dagar", "10 dagar", 2]);
questions.question4 = new questionGenerator(["vilket av dessa fyra hus, A, B, C och D kan man rita utan att lyfta pennan från pappret eller dra samma sträck två gånger?", "B", "D", "C", 3]);
=======
questions.question1 = new questionGenerator(["Vilket håll åker bussen?", "Höger", "Vänster", "Står still", "Vet inte", 1]);
questions.question2 = new questionGenerator(["Vilket håll åker inte bussen?", "vet inte", "kanske", 2]);
questions.question3 = new questionGenerator(["Vilket håll åker inte?", "Vet inte", "Höger", 2]);
questions.question4 = new questionGenerator(["Vilket håll bussen?", "4", "Vet inte", "hur?", 1]);
>>>>>>> a67c5d1f1227c46730b614117c57761174142fac
1
var questionsToUse = Object.keys(questions);
var clicked = false;

function newQuestion() {	
	if(Object.keys(questionsToUse).length > 0) { //Gör så att funktionen börjar om, kommer tas bort
		var newRandomIndex = Math.floor(Math.random()*Object.keys(questionsToUse).length); //ger ett random index från objekt arrayen
		var selectedQuestion = questionsToUse[newRandomIndex];
		questionsToUse.splice(newRandomIndex, 1); //tar bort alternativet som man har fått
		return selectedQuestion;
	}
}


function importNewQuestion() {
	if(Object.keys(questionsToUse).length > 0) {
	var selectedQuestion = questions[newQuestion()];
		$(".questionDiv ul").empty(); //tömmer ulen från gamla svar
		var questionLength = Object.keys(selectedQuestion).length - 1; //ger längden på objektet med frågorna i
		$(".secondScreen div div p").text(selectedQuestion.question); //uppdaterar frågan
		for(i = 1; i < questionLength; i++) {
			var li = ".questionDiv ul li:nth-of-type(" + i + ")";
			$(".questionDiv ul").append("<li></li>"); //lägger till en li
			$(li).text(selectedQuestion["answer" + (i - 1)]); //ger li:n text från korrekt fråga
			$(li).on("click",function() { //onclick style
				if(!clicked) {
					clicked = true;
					var indexAbove = $(this).index(); - 1; //li:n ovanför
					if(selectedQuestion[Object.keys(selectedQuestion)[Object.keys(selectedQuestion).length - 1]] == indexAbove + 1) {  //hämtar "correctvärdet" i selectedQuestion vilket är det sista och jämför med den man klicka på.s index
						score += 1;
						console.log("correct", score);
					}
					$(".questionDiv ul li").removeClass("selected border");
					$(this).addClass("selected");
					$(".questionDiv ul li:nth-of-type(" + indexAbove + ")").addClass("border");
					var newQuestionTimer = setTimeout(function() {
						importNewQuestion();
						clicked = false;
					}, 500);
				}
			});
		}
	} else {
		$(".questionDiv ul").empty();
		$(".questionDiv ul").append("<li> Your score is " + score + "</li>");
		console.log("done");
	}
}
importNewQuestion();