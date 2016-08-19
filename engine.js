function init() {
	//load
	loadPlayer();
	parseMonsterJSON();

	$.run = setInterval(tick, 1000);

}


function tick() {

	//monsterTakeDamage
	takeDamage($("#monster"), /*player_dmg*/ 10);

	//checkPlayerHealth();
	checkMonsterHealth();
}

function checkMonsterHealth() {
	var monster_hp = $("#monster").attr("data-hp");

	if (monster_hp < 1) {
		killMonster();
		spawnMonster();
	}
}

function takeDamage(entity, dmg) {
	var hp = entity.attr("data-hp");

	//hp - dmg
	entity.attr("data-hp", hp - dmg);
}

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

function spawnMonster() {
	var random_monster = $.monsters[Math.floor(Math.random()*$.monsters.length)];
	populateEntityNode($("#monster"), random_monster);
}