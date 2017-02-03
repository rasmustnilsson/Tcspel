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

//börja med fråga objekten

//gör så att de laddas in i "frågelådan"