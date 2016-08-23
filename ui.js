var ui = {
	entities: "",
	init: function() {
		ui.entities = $(".entity");
	},

	update: function() {
		ui.entities.each(function() {
			var e;
			$(this).attr("id") == "player" ? e = player : e = monster;

			$(this).children("div").each(function() {
				var stat = $(this).attr("class");

				if (!($.inArray(stat, e.visible_stats) == -1)) {

					$(this).html(stat + ": " + e[stat]);
				}
			});

			ui.update_cdbar(e, this);
		});
	},

	update_cdbar: function(entity, node) {
		var bar_node = $(node).find("div.progress").children()[0];
		var bar_width = ((entity.atk_spd - entity.atk_cd) / entity.atk_spd) * 100;

		$(bar_node).animate({
			width: bar_width
		}, engine.tick/entity.atk_spd);
	},

	animate_atk: function(entity) {
		var node = entity.node;
		if ($(node).attr("id") == "player") {
			$(node).prev().animate({left: "+=30"}, engine.tick/5);
			$(node).prev().animate({left: "-=30"}, engine.tick/8);
		} else {
			$(node).prev().animate({right: "+=30"}, engine.tick/5);
			$(node).prev().animate({right: "-=30"}, engine.tick/8);
		}
	}
};