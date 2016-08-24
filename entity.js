var entity = {
	weapons: "",

	load_weapons: function() {
		$.getJSON("./data/weapons.json", function(weapons) {
			entity.weapons = weapons;
		});
	},

	populateEntityNode: function(entity, node, entity_info) {
		var stats = entity.visible_stats;
		for (var i = 0; i<stats.length; i++) {
			var stat = document.createElement("div");
			$(stat)
				.addClass(stats[i])
				.html(stats[i] + ": " + entity_info[stats[i]]);

			node.append(stat);
			node.append("<br>");
		}

		//progress bar
		var progress = document.createElement("div");
		var progress_bar = document.createElement("div");

		$(progress).addClass("progress");
		$(progress_bar).addClass("progress_bar");

		$(progress).append(progress_bar);
		node.append(progress);
	}


};