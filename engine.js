function init() {
	//load
	loadPlayer();
	parseMonsterJSON();

	//set interval for ticks
	$.run = setInterval(tick, 500);
}


/*
 * Represents each in game tick
 */
function tick() {

	//monsterTakeDamage
	dealDamage($("#player"), $("#monster"));
	checkMonsterHealth();

	//playerTakeDamange
	dealDamage($("#monster"), $("#player"));
	checkPlayerHealth();

	checkExp();
	updateUI();
}

/*
 * checkHealth function for any entity to reduce code duplication.
 * Currently unused, but will probably be used in later versions.
 * More flexible to implement other entities if needed.
 */
function checkHealth(entity) {
	var hp = entity.attr("data-hp");

	if (hp < 1) {
		if (entity.attr("id") == "player") {
			checkMonsterHealth(); //placeholder
		} 
		else if (entity.attr("id") == "monster") {
			checkPlayerHealth(); //placeholder
		}
	}
}

function checkMonsterHealth() {
	var monster_hp = $("#monster").attr("data-hp");

	if (monster_hp < 1) {
		killMonster();
		spawnMonster();
	}
}

function checkPlayerHealth() {
	var player_hp = $("#player").attr("data-hp");

	if (player_hp < 1) {
		logger.log("Player killed. Respawning...");
		$("#player").attr("data-hp", $.player_info.hp);
	}
}

/*
 * Deals damage from dealer to taker, only if CD is 0
 */
function dealDamage(dmg_dealer, dmg_taker) {
	var cd = dmg_dealer.attr("data-atk-cd");
	if (cd == 0 ) {
		var hp = dmg_taker.attr("data-hp");
		var dmg = dmg_dealer.attr("data-dmg");

		//hp - dmg
		dmg_taker.attr("data-hp", hp - dmg);

		//reset cd
		dmg_dealer.attr("data-atk-cd", dmg_dealer.attr("data-atk-spd"));

		atk_animate(dmg_dealer);
	} else {
		dmg_dealer.attr("data-atk-cd", parseInt(cd) - 1);
	}
}


/*
 * Gives player exp and removes all attributes from $("#monster") node
 */
function killMonster() {

	//give player exp
	var monster_exp = parseInt($("#monster").attr("data-exp"));
	var exp = parseInt($("#player").attr("data-exp")) + monster_exp;
	$("#player").attr("data-exp", exp);

	if ($("#killFilter").is(":checked")) {
		logger.log($("#monster").attr("data-name") + " killed! Got " + monster_exp +" experience!");
	}

	//kill the monster
	$("#monster").html("");
	$("#monster").attr("data-hp", "");
	$("#monster").attr("data-dmg", "");
	$("#monster").attr("data-exp", "");


}

function levelUp() {

	//take exp from player
	$("#player").attr("data-exp", parseInt($("#player").attr("data-exp"))-100);

	//increase player level by 1
	var level = parseInt($("#player").attr("data-lvl"));
	$("#player").attr("data-lvl", level+1);

	logger.log("Leveled up! Now level " + level);
}

function checkExp() {
	while ($("#player").attr("data-exp") >= 100) {
		levelUp();
	}
}


/*
 * Spawn a random monster from $.monsters array
 */
function spawnMonster() {
	var random_monster = $.monsters[Math.floor(Math.random()*$.monsters.length)];
	populateEntityNode($("#monster"), random_monster);
}

