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

function cdBar(node) {
	var cd = $(node).attr("data-atk-spd");
	var bar_node = $(node).find("div.progress").children()[0];

	var add_width = 100/cd;
	var cur_width = $(bar_node).width();
	var bar_width = 0;

	if (add_width + cur_width > 100) {
		bar_with = 0;
	} else {
		bar_width = add_width + cur_width;
	}

	// console.log($(bar_node));w

	$(bar_node).animate({
		width: bar_width
	});
}
