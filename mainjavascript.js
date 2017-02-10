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


function questionGenerator(list) { // tar en lista med frågan först, sen svar
	this.question = list[0]; // sätter frågan först i objektet
	for (i = 1; i < list.length; i++) { // ger varje svar ett namn och sitt svar
		var name = "answer" + (i - 1);
		this[name] = list[i];
	}
}

// Första är en fråga, och sista är rättsvarsindex, och dem i mitten är frågor
questions.question1 = new questionGenerator(["Vilket håll åker bussen?", "Höger", "Vänster", "Står still", "Vet inte", 1]);
questions.question2 = new questionGenerator(["Vilket håll åker inte bussen?", "vet inte", "kanske", 2]);
questions.question3 = new questionGenerator(["Vilket håll åker inte?", "Vet inte", "Höger", 3]);
questions.question4 = new questionGenerator(["Vilket håll bussen?", "4", "Vet inte", "hur?", 4]);
1
var questionsToUse = Object.keys(questions);
var clicked = false;

function newQuestion() {	
	if(Object.keys(questionsToUse).length <= 0) { //Gör så att funktionen börjar om, kommer tas bort
		questionsToUse = Object.keys(questions);
	}
	var newRandomIndex = Math.floor(Math.random()*Object.keys(questionsToUse).length); //ger ett random index från objekt arrayen
	var selectedQuestion = questionsToUse[newRandomIndex];
	questionsToUse.splice(newRandomIndex, 1); //tar bort alternativet som man har fått
	return selectedQuestion;
}


function importNewQuestion() {
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
				var indexAbove = $(this).index(); - 1;
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
}
importNewQuestion();