function init() {
	//load
	loadPlayer();
	parseMonsterJSON();

	//set interval for ticks
	$.run = setInterval(tick, 1000);
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
		console.log("Player killed. Respawning...");
		$("#player").attr("data-hp", $.player_info.hp);
	}
}

/*
 * Deals damage from dealer to taker
 */
function dealDamage(dmg_dealer, dmg_taker) {
	var hp = dmg_taker.attr("data-hp");
	var dmg = dmg_dealer.attr("data-dmg");

	//hp - dmg
	dmg_taker.attr("data-hp", hp - dmg);
}


/*
 * Gives player exp and removes all attributes from $("#monster") node
 */
function killMonster() {

	//give player exp
	var exp = parseInt($("#player").attr("data-exp")) + parseInt($("#monster").attr("data-exp"));
	$("#player").attr("data-exp", exp);

	//kill the monster
	$("#monster").html("");
	$("#monster").attr("data-hp", "");
	$("#monster").attr("data-dmg", "");
	$("#monster").attr("data-exp", "");

}

/*
 * Spawn a random monster from $.monsters array
 */
function spawnMonster() {
	var random_monster = $.monsters[Math.floor(Math.random()*$.monsters.length)];
	populateEntityNode($("#monster"), random_monster);
}