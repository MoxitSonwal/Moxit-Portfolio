// ================= TYPING EFFECT =================

const roles = [
"Minecraft Gamer 🎮",
"YouTuber 🎥",
"Future Web Developer 💻"
];

let roleIndex = 0;
let charIndex = 0;

function typeEffect(){

const typing = document.getElementById("typing");
if(!typing) return;

if(charIndex < roles[roleIndex].length){

typing.textContent += roles[roleIndex].charAt(charIndex);
charIndex++;

setTimeout(typeEffect,100);

}else{

setTimeout(()=>{
typing.textContent="";
charIndex=0;
roleIndex++;

if(roleIndex >= roles.length){
roleIndex = 0;
}

typeEffect();

},1500);

}

}

typeEffect();

// ================= SCROLL PROGRESS BAR =================

window.addEventListener("scroll",()=>{

const scrollTop = document.documentElement.scrollTop;
const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;

const scrollPercent = (scrollTop / scrollHeight) * 100;

const progressBar = document.getElementById("progress-bar");

if(progressBar){
progressBar.style.width = scrollPercent + "%";
}

});

// ================= CARD REVEAL =================

const cards = document.querySelectorAll(".card");

function revealCards(){

cards.forEach(card=>{

const cardTop = card.getBoundingClientRect().top;

if(cardTop < window.innerHeight - 100){

card.style.opacity="1";
card.style.transform="translateY(0)";

}

});

}

window.addEventListener("scroll",revealCards);
revealCards();

// ================= SKILL BAR ANIMATION =================

const skills = document.querySelectorAll(".skill-bar span");

function animateSkills(){

skills.forEach(skill=>{

const top = skill.getBoundingClientRect().top;

if(top < window.innerHeight - 100){

skill.style.width = skill.style.width;

}

});

}

window.addEventListener("scroll",animateSkills);

// ================= NAVBAR ACTIVE LINK =================

const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll("nav ul li a");

window.addEventListener("scroll",()=>{

let current = "";

sections.forEach(section=>{

const sectionTop = section.offsetTop - 150;

if(pageYOffset >= sectionTop){
current = section.getAttribute("id");
}

});

navLinks.forEach(link=>{

link.classList.remove("active");

if(link.getAttribute("href") === "#" + current){
link.classList.add("active");
}

});

});

// ================= BACK TO TOP BUTTON =================

const topBtn = document.getElementById("topBtn");

window.addEventListener("scroll",()=>{

if(document.documentElement.scrollTop > 400){
topBtn.style.display="block";
}else{
topBtn.style.display="none";
}

});

if(topBtn){

topBtn.addEventListener("click",()=>{

window.scrollTo({
top:0,
behavior:"smooth"
});

});

}

// ================= PARTICLES BACKGROUND =================

particlesJS("particles-js", {

particles: {

number: { value: 80 },

color: { value: "#00ffff" },

shape: { type: "circle" },

opacity: {
value: 0.5
},

size: {
value: 3,
random: true
},

line_linked: {
enable: true,
distance: 150,
color: "#00ffff",
opacity: 0.4,
width: 1
},

move: {
enable: true,
speed: 2
}

},

interactivity: {

detect_on: "canvas",

events: {

onhover: {
enable: true,
mode: "repulse"
},

onclick: {
enable: true,
mode: "push"
},

resize: true

},

modes: {

repulse: {
distance: 120
},

push: {
particles_nb: 4
}

}

},

retina_detect: true

});
