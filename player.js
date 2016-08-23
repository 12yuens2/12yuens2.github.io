var player = {
	stats: ["name", "hp", "dmg", "exp", "lvl", "atk_spd", "gold"],
	visible_stats: ["name", "hp", "dmg", "exp", "lvl", "gold", "weapon"],
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

	atk_spd: 0,
	atk_cd: 0,
	equiped_weapon: null,

	/** misc **/
	death_message: "Player killed. Respawning...",

	/** player functions **/
	load: function() {
		var p = this
		player.node = $("#player");

		$.getJSON("./data/player.json", function(player_info) {

			//internal stats
			player.populate_stats(player_info);

			//stats on ui
			entity.populateEntityNode(p, player.node, player_info);
		});

	},

	populate_stats: function(player_info) {

		for (var i = 0; i<player.stats.length; i++) {
			var stat = player.stats[i];
			player[stat] = player_info[stat];
		}

		player.atk_cd = player.atk_spd;
		player.max_hp = player.hp;
	},

	equip: function(weapon_index) {
		var weapon = bag.items[weapon_index];
		logger.log("Equipped " + weapon.name);

		bag.items.splice(weapon_index, 1);
		player.equiped_weapon = weapon;
		player.weapon = weapon.name;
		player.atk_spd = weapon.atk_spd;

		//change later to be addition instead of replace dmg
		player.dmg = weapon.dmg;

		ui.update_bag();
	},

	level_up: function(exp) {
		player.exp -= exp;
		player.lvl += 1;

		logger.log("Leveled up! Now level " + player.lvl);
	},


	kill: function() {
		logger.log(player.death_message);
	},

	respawn: function() {
		player.hp = player.max_hp;
	}


};