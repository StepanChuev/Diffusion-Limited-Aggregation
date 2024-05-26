'use strict';

const randomInt = (min, max) => {
	return Math.floor(Math.random() * (max - min + 1) + min);
};

const distanceBetween = (x1, y1, x2, y2) => {
	return Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
}

const animation = ({render = () => {}, update = () => {}}) => {

	const tick = (timestamp) => {
		render(timestamp);
		update(timestamp);
		requestAnimationFrame(tick);
	};
	
	requestAnimationFrame(tick);
};


const canvas = document.querySelector('.canvas');
const context = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
context.strokeStyle = "#fd0";
context.fillStyle = "#fd0";

const amountParticles = 700;
const radiusParticle = 7;
const maxVelocity = 2;
const activeParticles = [];
const inactiveParticles = [{
	x: canvas.width / 2,
	y: canvas.height / 2
}];

for (let i = 0; i < amountParticles - inactiveParticles.length; i++){
	activeParticles.push({
		x: randomInt(radiusParticle, canvas.width),
		y: randomInt(radiusParticle, canvas.height)
	});
}

console.log(activeParticles);

animation({
	render(){
		context.clearRect(0, 0, canvas.width, canvas.height);
		context.fillStyle = "#fd0";

		for (let i = 0; i < activeParticles.length; i++){
			context.beginPath();
			context.arc(activeParticles[i].x, activeParticles[i].y, radiusParticle, 0, Math.PI * 2);
			context.fill();
		}

		context.fillStyle = "#f00";

		for (let i = 0; i < inactiveParticles.length; i++){
			context.beginPath();
			context.arc(inactiveParticles[i].x, inactiveParticles[i].y, radiusParticle, 0, Math.PI * 2);
			context.fill();
		}
	},

	update(){
		for (let i = 0; i < activeParticles.length; i++){
			activeParticles[i].x += randomInt(-100 * maxVelocity, 100 * maxVelocity) / 100;
			activeParticles[i].y += randomInt(-100 * maxVelocity, 100 * maxVelocity) / 100;

			if (activeParticles[i].x + radiusParticle < 0){
				activeParticles[i].x = canvas.width;
			}

			if (activeParticles[i].x - radiusParticle > canvas.width){
				activeParticles[i].x = 0;
			}

			if (activeParticles[i].y + radiusParticle < 0){
				activeParticles[i].y = canvas.height;
			}

			if (activeParticles[i].y - radiusParticle > canvas.height){
				activeParticles[i].x = 0;
			}

			for (let j = 0; j < inactiveParticles.length && i < activeParticles.length; j++){
				if (distanceBetween(activeParticles[i].x, activeParticles[i].y, inactiveParticles[j].x, inactiveParticles[j].y) < radiusParticle * 2){
					inactiveParticles.push(activeParticles[i]);
					activeParticles.splice(i, 1);

					console.log(1);
				}
			}
		}
	}
});