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

function questionGenerator(list) { // tar en lista med frågan först, sen svar
	this.question = list[0]; // sätter frågan först i objektet
	for (var i = 1; i < list.length; i++) { // ger varje svar ett namn och sitt svar
		var name = "answer" + (i - 1);
		this[name] = list[i];
	}
	
}

questions.question1 = new questionGenerator(["Vilket håll åker bussen?", "Höger", "Vänster", "Står still", "Vet inte"]);
questions.question2 = new questionGenerator(["Vilket håll åker inte bussen?", "Höger", "Vänster", "Står still", "Vet inte"]);

function importNewQuestion() {
	var questionLength = Object.keys(questions.question1).length; //ger längden på objektet med frågorna i
	$(".secondScreen div div p").text(questions.question1.question); //uppdaterar frågan
	for(var i = 1; i < questionLength; i++) {
		var li = ".questionDiv ul li:nth-of-type(" + i + ")";
		$(".questionDiv ul").append("<li></li>"); //lägger till en li
		$(li).text(questions.question1["answer" + (i - 1)]); //ger li:n text från korrekt fråga
		$(li).on("click",function() { //onclick style
			$(".questionDiv ul li").removeClass("selected");
			$(this).addClass("selected");
			// $(".questionDiv ul li:nth-of-type(" + (i - 2) + ")").addClass("border");
		});
	}
}
importNewQuestion();