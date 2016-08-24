var world = {
	region: "",
	weapons: "",

	mobs: null,
	mob: null,

	init: function() {
		world.change_region("r1");
	},

	change_region: function(region) {
		world.region = region;
		world.load_mobs();
		world.load_weapons();
	},

	load_mobs: function() {
		var region = world.region;

		$.getJSON("./data/mobs/" + region + ".json", function(monsters) {
			world.mobs = monsters;
			world.spawn_random();
			world.mob = monster;
		})
	},

	load_weapons: function() {
		$.getJSON("./data/weapons.json", function(weapons) {
			world.weapons = weapons;
		});
	},

	spawn_random: function() {
		var random_monster = world.mobs[Math.floor(Math.random()*world.mobs.length)];
		monster.create(random_monster);
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
	},


};