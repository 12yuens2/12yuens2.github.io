function updateUI() {

	//each entity
	$(".entity").each(function (i) {
		var entity = this;

		//each visible stat (label)
		$(this).children("label").each(function () {
			var stat = $(this).attr("class");

			if (isVisible(stat)) {
				//get stat from attr("data-[stat]") and display in html
				$(this).html(stat + ": " + $(entity).attr("data-"+stat));
			}

		});

		cdBar(this);
	});


}

function change_weapon(weapon) {
	var dmg = $(weapon).attr("data-dmg");
	var atk_spd = $(weapon).attr("data-atk-spd");

	//change player stats
	$("#player").attr("data-dmg", dmg);
	$("#player").attr("data-atk-spd", atk_spd);

	//reset attack cooldawn
	$("#player").attr("data-atk-cd", atk_spd);
}

function atk_animate(node) {
	if ($(node).attr("id") == "player") {
		$(node).prev().animate({left: "+=30"}, 100);
		$(node).prev().animate({left: "-=30"}, 60);
	} else {
		$(node).prev().animate({right: "+=30"}, 100);
		$(node).prev().animate({right: "-=30"}, 60);
	}
}

function cdBar(node) {
	var spd = $(node).attr("data-atk-spd");
	var cd = $(node).attr("data-atk-cd");
	var bar_node = $(node).find("div.progress").children()[0];

	var bar_width = ((spd - cd)/spd) * 100;

	$(bar_node).animate({
		width: bar_width
	});
}
