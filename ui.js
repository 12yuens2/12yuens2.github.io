var ui = {
	entities: "",
	bag_index: 0,

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
					var display = e[stat];
					if (stat == "hp") {
						if (parseInt(display) < 1) {
							display = 0;	
						}
						$(this).html(stat + ": " + display + "/" + e.max_hp);
					} else {
						$(this).html(stat + ": " + display);
					}
				}
			});

			ui.update_hpbar(e, this);
		});

		ui.update_buttons();
	},

	update_buttons: function() {
		var heal_button = $(".heal");
		if (player.hp < player.max_hp && player.heal_cd < 1) {
			heal_button.prop("disabled", false);
		} else {
			heal_button.prop("disabled", true);
			player.heal_cd -= 1;
		}

		var dmg_button = $(".damage");
		if (monster.dmg_cd < 1) {
			dmg_button.prop("disabled", false);
		} else {
			dmg_button.prop("disabled", true);
			monster.dmg_cd -= 1;
		}
	},

	update_region: function() {
		$(".regions").children().each(function() {
			if (world.changing_region) {
				$(this).prop("disabled", true);
			} else {
				$(this).prop("disabled", false);
			}
		});
	},

	update_hpbar: function(entity, node) {
		var bar_node = $(node).find("div.progress").children()[0];
		// var bar_width = ((entity.atk_spd - entity.atk_cd) / entity.atk_spd) * 100;

		var bar_width = parseInt((entity.hp / entity.max_hp)*100) 
		$(bar_node).animate({width: bar_width}, engine.tick/3);
	},

	update_bag: function() {
		bag.node.html("");
		$.each(bag.items, function() {
			var item_wrap = document.createElement("div");
			$(item_wrap).addClass("item");

			var name = document.createElement("label");
			$(name).html(this.name);

			var equip = document.createElement("input");
			$(equip)
				.attr("type", "button")
				.attr("value", "Equip")
				.attr("onclick", "player.equip($(this).parent().parent().index());");

			var sell = document.createElement("input");
			$(sell)
				.attr("type", "button")
				.attr("value", "Sell")
				.attr("onclick", "bag.sell($(this).parent().parent().index());");

			var button_wrap = document.createElement("div");
			$(button_wrap)
				.addClass("right")
				.append(equip)
				.append(sell);

			$(item_wrap)
				.append(name)
				.append(button_wrap);

			bag.node.append(item_wrap);
		});
	},

	animate_atk: function(entity) {
		var node = entity.node;
		if ($(node).attr("id") == "player") {
			$(node).prev().animate({left: "+=30"}, engine.tick/5);
			$(node).prev().animate({left: "-=30"}, engine.tick/8);
		} else {
			$(node).prev().animate({left: "-=30"}, engine.tick/5);
			$(node).prev().animate({left: "+=30"}, engine.tick/8);
		}
	}
};