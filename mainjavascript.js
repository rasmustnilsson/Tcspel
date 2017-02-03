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

$(".secondScreen h2").on("click", function() {
	switchWindow("first");
});

$(".secondScreen button").on("click", function() {
	answersOut()
});


function answersOut() {
	$(".questionDiv ul li:nth-of-type(1)").transition({
		opacity: 0
	});
}