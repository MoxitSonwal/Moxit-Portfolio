// Typing Effect
const roles = ["Minecraft Gamer 🎮","YouTuber 🎥","Future Developer 💻"];
let i = 0;
let j = 0;

(function type(){
    if(i == roles.length) i = 0;
    document.getElementById("typing").textContent = roles[i].slice(0, ++j);
    if(j == roles[i].length){
        i++;
        j = 0;
        setTimeout(type,1000);
    } else {
        setTimeout(type,100);
    }
})();

// Subscriber Counter
function animateCounter(id,end){
    let el = document.getElementById(id);
    let start = 0;

    let interval = setInterval(()=>{
        start++;
        el.textContent = start;
        if(start >= end) clearInterval(interval);
    },15);
}

animateCounter("mainSub",61);
animateCounter("clipsSub",220);
