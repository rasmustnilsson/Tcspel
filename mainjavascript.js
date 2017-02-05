function switchWindow(screen) {
	if(screen == "first") {
		$(".secondScreen").css("display", 'none');
		$(".firstScreen").css("display", '');
	} else if (screen == "second"){
		$(".firstScreen").css("display", 'none');
		$(".secondScreen").css("display", 'flex');
	}
}
$(".firstScreen h2").on("click", function() {
	switchWindow("second");
});

var questions = {}

function questionGenerator(list) {
	this.question = list[0];
	for (var i = 1; i < list.length; i++) {
		var name = "answer" + (i - 1);
		this[name] = list[i];
	}
	
}

questions.question1 = new questionGenerator([1,2,3,4]);