"use strict";
var utilities = require('./utilities');
var cardTypes = [
{
	"id": 1,
	"color":"red"
},
{
	"id": 2,
	"color":"blue"
},
{
	"id": 3,
	"color":"green"
},
{
	"id": 4,
	"color":"pink"
},
{
	"id": 5,
	"color":"purple"
}]

var structures = {
    "Card": function Card(type){
        var entity = {};
        entity.card = true;
        entity.selected = false;
        entity.type = type;
        entity.isMatched = false;
        return entity;
    },
    "CardType": function CardType(id, color){
    	var entity = {};
    	entity.id = id;
    	entity.color = color;
    	return entity;
    },
    "Player": function Player(){
    	var entity ={};
    	entity.matches = 0;
    }
}
function addPlayer(data){
	utilities.generateEntity(structures.Player,data.entities);
}
function createCards(data){
	var cards = [];
	var cardEntities = [];
	for(var i = 0; i<6; i++){
		for(var j = 0; j<5; j++){
			cards.push(structures.Card(structures.CardType(cardTypes[j].id,cardTypes[j].color)));
		}
	}
	cards = utilities.shuffle(cards)
	cards.forEach(function(element,index){
		cardEntities.push(utilities.generateEntity(element,data.entities));
	});
	return cardEntities;
}
function place(data){

	var w = data.canvas.height*0.8/6;
	var i = 0
	for(var prop in data.entities.entities){
		if(data.entities.entities[prop].card === true){

			data.entities.entities[prop].size = { width : w, height : w }
			data.entities.entities[prop].gridPosition = setPosition(i);
			data.entities.entities[prop].drawPosition = calculateDraw(data.canvas,data.entities.entities[prop]);
			i++;
		}
	}
	
}
function setPosition(i){
	var x = (i+1)%6;
	var y = Math.floor((i)/6);
	return {"x":x,"y":y};
}
function positionFromCenter(canvas,obj){
	var center = canvas.width/2;
	var posFromCenter = obj.gridPosition.x - 3;
	return center - posFromCenter*obj.size.width;
}

function calculateDraw(canvas,obj){
	var unit = canvas.height*(0.8/6);

	var x = (positionFromCenter(canvas,obj))-obj.size.width/2;
	var y = obj.gridPosition.y*unit + 0.2*canvas.height;
	return {"x":x,"y":y};
}
module.exports = function(data) {
	addPlayer(data);
	createCards(data);
	place(data);
};
