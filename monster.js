var monster =  {
	stats: ["name", "hp", "dmg", "exp", "lvl", "atk-spd", "drop_table", "gold_max", "gold_min"],
	visible_stats: ["name", "hp", "dmg", "exp", "lvl"],
	node: $("#monster"),
	list: [],

	/** monster stats **/
	name: "m3",
	hp: 12,
	dmg: 5,
	exp: 12,
	level: 1,

	atk_spd : 3,
	drop_table: {
					S1: 20,
					D1: 20,
					A1: 20
				},

	atk_cd: 3,
	gold_max: 0,
	gold_min: 0,

	/** misc **/
	death_message: "",


	/** monster functions **/
	load: function() {
		monster.node = $("#monster");

		$.getJSON("./data/monsters.json", function(monsters) {
			monster.list = monsters;
			monster.create_random();
		});

	},
	create_random: function() {
		var random_monster = monster.list[Math.floor(Math.random()*monster.list.length)];
		monster.create(random_monster);
	},
	create: function(monster_info) {

		//change monster internal stats
		monster.populate_stats(monster_info);

		//change text in ui
		entity.populateEntityNode(this, monster.node, monster_info);

		monster.death_message = monster.name + " killed! Got " + monster.exp + " experience!";
	},

	populate_stats: function(new_monster) {
		for (var i = 0; i<monster.stats.length; i++) {
			monster[monster.stats[i]] = new_monster[monster.stats[i]];
		}
		monster.atk_cd = monster.atk_spd;
	},


	drop_item: function() {
		var chance = Math.floor(Math.random()*100) ;

		$.each(monster.drop_table, function(k, v) {
			if (v < chance) {
				logger.log(monster.name + " dropped a " + entity.weapons[k].name + "!");
				bag.add_item(entity.weapons[k]);
				return false;
			}
		});
	},

	kill: function() {
		//give player exp
		player.exp += monster.exp;

		//give player gold
		var gold = Math.floor(Math.random()* (monster.gold_max - monster.gold_min + 1)) + monster.gold_min;
		player.gold += gold;

		monster.drop_item();

		logger.log(monster.death_message + " Got " + gold + "g!");
		monster.node.html("");
	},

	respawn: function() {
		monster.create_random();
	}

};