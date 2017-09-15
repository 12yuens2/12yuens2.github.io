var monster =  {
	DMG_MULTIPLIER: 2,
	HP_MULTIPLIER: 20,
	EX_MULTIPLIER: 10,
	DMG_BUTTON_CD: 7,

	stats: ["name", "hp", "dmg", "exp", "lvl", "atk-spd", "drop_chance", "drop_table", "gold_max", "gold_min"],
	visible_stats: ["name", "hp", "dmg", "exp", "lvl"],
	node: $("#monster"),
	list: [],

	/** monster stats **/
	name: "m3",
	max_hp: 2,
	hp: 12,
	dmg: 5,
	exp: 12,
	level: 1,

	atk_spd : 3,
	drop_chance: 5,
	drop_table: {
					S1: 20,
					D1: 20,
					A1: 20
				},

	atk_cd: 3,
	gold_max: 0,
	gold_min: 0,
	dmg_cd: 0,

	/** misc **/
	death_message: "",


	/** monster functions **/
	init: function() {
		monster.node = $("#monster");
	},

	create: function(monster_info) {

		//change monster internal stats
		monster.populate_stats(monster_info);

		//change text in ui
		world.populateEntityNode(this, monster.node, monster_info);

		monster.death_message = monster.name + " killed! Got " + monster.exp + " experience!";
	},

	populate_stats: function(new_monster) {
		for (var i = 0; i<monster.stats.length; i++) {
			monster[monster.stats[i]] = new_monster[monster.stats[i]];
		}
		var max = world.max_lvl;
		var min = world.min_lvl;
		monster.lvl = Math.floor(Math.random()*(max-min+1)) + min;
		monster.atk_cd = monster.atk_spd;

		//change stats based on level
		monster.hp += monster.HP_MULTIPLIER*monster.lvl;
		monster.max_hp = monster.hp;
		monster.dmg += monster.DMG_MULTIPLIER*monster.lvl;
		monster.exp += monster.EX_MULTIPLIER*monster.lvl;
	},


	drop_item: function() {
		var chance = Math.floor(Math.random()*100) ;

		if (chance < monster.drop_chance) {
			var rarity = Math.floor(Math.random()*100);
			var drops = [];

			//populate potenial drops
			$.each(monster.drop_table, function(k, v) {
				if (v < rarity) {
					drops.push(world.weapons[k]);
				}
			});

			//get one drop from list
			if (drops.length < 1) {
				//no drops due to rarity
			} else {
				var drop_num = Math.floor(Math.random()*drops.length);
				var drop = drops[drop_num];

				logger.log(monster.name + " dropped a " + drop.name + "!");
				bag.add_item(drop);
			}


		}
	},

	deal_dmg: function() {
		return monster.dmg;
	},

	take_dmg: function(dmg) {
		monster.hp -= dmg;
	},

	damage: function(upgrade) {
		if (upgrade && player.gold > player.dmg_cost) {
			player.DMG_BUTTON_AMOUNT += 10;
			player.gold -= player.dmg_cost;
			player.dmg_cost += player.dmg_cost;
		} else if (!upgrade) {
			$(".damage_button").prop("disabled", true);

			monster.hp -= player.DMG_BUTTON_AMOUNT;
			monster.dmg_cd = monster.DMG_BUTTON_CD;
		} else {
			logger.log("Not enough gold to upgrade!");
		}
		ui.update();
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

	flee: function() {
		monster.node.html("");
	},

	respawn: function() {
		world.spawn_random();
	}

};