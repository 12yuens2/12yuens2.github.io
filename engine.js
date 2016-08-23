var engine = {
	run: null,
	tick: 100,

	init: function() {
		player.load();
		monster.load();
		ui.init();

		engine.run = setInterval(engine.move, engine.tick);
	},

	move: function() {
		engine.check_atks();
		engine.check_health(monster);
		engine.check_health(player);
		engine.check_exp();

		ui.update();
	},

	check_atks: function() {
		engine.check_atk(player, monster);
		engine.check_atk(monster, player);
	},
	check_atk: function(dealer, taker) {
		if (dealer.atk_cd == 0) {
			taker.hp -= dealer.dmg;
			dealer.atk_cd = dealer.atk_spd;

			ui.animate_atk(dealer);
		} else {
			dealer.atk_cd -= 1;
		}
	},

	check_health: function(entity) {
		if (entity.hp < 1) {
			entity.kill();
			entity.respawn();
		}
	},

	check_exp: function() {
		while(player.exp >= 100) {
			player.level_up(100);
		}
	}

};