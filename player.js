var player = {
	stats: ["name", "hp", "dmg", "exp", "lvl", "atk_spd", "gold"],
	visible_stats: ["name", "hp", "dmg","points", "exp", "lvl", "gold", "weapon"],
	node: $("#player"),

	/** player stats **/
	name: "",
	max_hp: 0,
	hp: 0,
	dmg: 0,
	exp: 0,
	lvl: 0,
	gold: 0,
	weapon: "None",
	points: 0,

	exp_next: 0,
	atk_spd: 0,
	atk_cd: 0,
	heal_spd: 5,
	heal_cd: 0,
	equiped_weapon: null,
	weapon_dmg: 0,

	/** misc **/
	death_message: "Player killed. Respawning...",

	/** player functions **/
	init: function() {
		var p = this
		player.node = $("#player");

		$.getJSON("./data/player.json", function(player_info) {

			//internal stats
			player.populate_stats(player_info);

			//stats on ui
			world.populateEntityNode(p, player.node, player_info);
		});

	},

	populate_stats: function(player_info) {

		for (var i = 0; i<player.stats.length; i++) {
			var stat = player.stats[i];
			player[stat] = player_info[stat];
		}

		player.atk_cd = player.atk_spd;
		player.max_hp = player.hp;
		player.exp_next = 100;
	},

	equip: function(weapon_index) {

		var weapon = bag.items[weapon_index];
		logger.log("Equipped " + weapon.name);
		bag.items.splice(weapon_index, 1);

		//put old equip back in bag
		if (player.equiped_weapon != null) {
			bag.items.push(player.equiped_weapon);
		}
		player.equiped_weapon = weapon;
		player.weapon = weapon.name + " +" + weapon.dmg ;
		player.atk_spd = weapon.atk_spd;

		player.weapon_dmg = weapon.dmg;

		ui.update_bag();
	},

	level_up: function(exp) {
		player.exp -= exp;
		player.lvl += 1;
		player.points += 2;
		player.exp_next = player.exp_next + Math.pow(player.lvl, 2);

		logger.log("Leveled up! Now level " + player.lvl);
	},

	deal_dmg: function() {
		return player.dmg + player.weapon_dmg;
	},

	take_dmg: function(dmg) {
		player.hp -= dmg;
	},

	heal: function() {
		$(".heal").prop("disabled", true);

		var heal = parseInt(player.max_hp / 3);

		if (heal + player.hp > player.max_hp) {
			player.hp = player.max_hp;
		} else {
			player.hp += heal;
		}

		ui.update();

		player.heal_cd = player.heal_spd;
	},

	kill: function() {
		logger.log(player.death_message);
		monster.flee();
	},

	respawn: function() {
		player.hp = player.max_hp;
		world.spawn_random();
	}


};