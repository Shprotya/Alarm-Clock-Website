const selectAlarm = document.querySelectorAll("select");
const currentTime = document.querySelector("h1");
const setAlarmBtn = document.querySelector("button");
const settingAlarm = document.querySelector(".settingAlarm");

let alarmTime;
let rington = new Audio("./files/ring.mp3");
let alarmSet = false;


console.log(selectAlarm);
for (let i = 12; i > 0; i--){
  i = i < 10 ? "0" + i : i;
  let options = `<option value="${i}">${i}</option>`;
  selectAlarm[0].firstElementChild.insertAdjacentHTML("afterend", options);
}
for (let i = 59; i >= 0; i--){
  i = i < 10 ? "0" + i : i;
  let options = `<option value="${i}">${i}</option>`;
  selectAlarm[1].firstElementChild.insertAdjacentHTML("afterend", options);
}
for (let i = 2; i > 0; i--){
  let halfDay = i == 1 ? "AM" : "PM";
  let options = `<option value="${halfDay}">${halfDay}</option>`;
  selectAlarm[2].firstElementChild.insertAdjacentHTML("afterend", options);
}


// ........................Налаштування Годинника................
setInterval(() => {
  
  let timeClock = new Date(),
    h = timeClock.getHours(),
    m = timeClock.getMinutes(),
    s = timeClock.getSeconds(),
    halfDay = "AM";
  
  if (h > 12) {
    h = h - 12;
    halfDay = "PM";
  }

  h = h == 0 ? h = 12 : h;

  h = h < 10 ? "0" + h : h;
  m = m < 10 ? "0" + m : m;
  s = s < 10 ? "0" + s : s;

  // console.log(`${h}:${m}:${s} ${halfDay}`);
  currentTime.innerText = `${h}:${m}:${s} ${halfDay}`;


  if (alarmTime == `${h}:${m} ${halfDay}`) {
    console.log("Alarm!!!!!!!!!!!!!!");
    rington.play();
    rington.loop = true;
  }
}, 1000); //Ця функція буде викликатися кожні 1000 мілісекунд

// .......................Кнопка налаштування будильника...............
function setAlarm() {
  if (alarmSet) {
    alarmTime = "";
    rington.pause();
    settingAlarm.classList.remove("disable");
    setAlarmBtn.innerText = "Встановити Будильник";
    return alarmSet = false;
  }

  let time = `${selectAlarm[0].value}:${selectAlarm[1].value} ${selectAlarm[2].value}`;

  if (time.includes("Hour") || time.includes("Minute") || time.includes("AM/PM")) {
    return alert("Спочатку виберіть параметри Будильника!!!");
  }
  alarmSet = true;
  alarmTime = time;

  settingAlarm.classList.add("disable");
  console.log(time);
  setAlarmBtn.innerText = "Видалити будильник";
}
setAlarmBtn.addEventListener("click", setAlarm);