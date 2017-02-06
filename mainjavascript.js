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

questions.question1 = new questionGenerator(["Vilket håll åker bussen?", "1", "Vänster", "Står still", "Vet inte"]);
questions.question2 = new questionGenerator(["Vilket håll åker inte bussen?"]);
questions.question3 = new questionGenerator(["Vilket håll åker inte?", "Vet inte"]);
questions.question4 = new questionGenerator(["Vilket håll bussen?", "4", "Vet inte"]);

var questionsToUse = Object.keys(questions);

function newQuestion() {
	var newRandomIndex = Math.floor(Math.random()*Object.keys(questionsToUse).length); //ger ett random index från objekt arrayen
	if(Object.keys(questionsToUse).length <= 0) { //Gör så att funktionen börjar om, kommer tas bort
		questionsToUse = Object.keys(questions);
	}
	var selectedQuestion = questionsToUse[newRandomIndex];
	questionsToUse.splice(newRandomIndex, 1); //tar bort alternativet som man har fått
	return selectedQuestion;
}


function importNewQuestion() {
	var selectedQuestion = questions[newQuestion()];
	console.log(selectedQuestion);
	$(".questionDiv ul").empty(); //tömmer ulen från gamla svar
	var questionLength = Object.keys(selectedQuestion).length; //ger längden på objektet med frågorna i
	$(".secondScreen div div p").text(selectedQuestion.question); //uppdaterar frågan
	for(i = 1; i < questionLength; i++) {
		var li = ".questionDiv ul li:nth-of-type(" + i + ")";
		$(".questionDiv ul").append("<li></li>"); //lägger till en li
		$(li).text(selectedQuestion["answer" + (i - 1)]); //ger li:n text från korrekt fråga
		$(li).on("click",function() { //onclick style
			var thisIndex = $(this).index(); - 1;
			$(".questionDiv ul li").removeClass("selected border");
			$(this).addClass("selected");
			$(".questionDiv ul li:nth-of-type(" + thisIndex + ")").addClass("border");
		});
	}
}
importNewQuestion();