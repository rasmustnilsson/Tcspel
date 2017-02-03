function switchWindow(screen) {
	if(screen == "first") {
		$(".secondScreen").css("display", 'none');
		$(".firstScreen").css("display", '');
	} else {
		$(".firstScreen").css("display", 'none');
		$(".secondScreen").css("display", 'flex');
	}
}
$(".firstScreen h2").on("click", function() {
	switchWindow("second");
});