var world = {
	region: "r1",
	next_region: "r1",
	changing_region: false,
	weapons: "",

	mobs: null,
	mob: null,

	init: function() {
		world.move();
	},

	change_region: function(region) {
		logger.log("Moving to " + region + " after next kill/death");

		world.next_region = region;
		world.changing_region = true;

		ui.update_region();
	},

	move: function() {
		logger.log("Arriving at " + world.next_region);

		world.region = world.next_region;
		world.changing_region = false;
		monster.node.html("");
		world.load_mobs();
		world.load_weapons();

		ui.update_region();

	},

	load_mobs: function() {
		var region = world.region;

		$.getJSON("./data/mobs/" + region + ".json", function(monsters) {
			world.mobs = monsters;
			world.spawn_random();
			world.mob = monster;
		});
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