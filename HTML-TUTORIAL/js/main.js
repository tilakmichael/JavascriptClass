var gname = "tilak";

function accept(proptvar) {
  var name = prompt(proptvar);
  return name;
}

function dspRange() {
  let spanObj = document.getElementById("_rdsp");
  let rangeVal = document.getElementById("_rangeip").value;
  spanObj.innerHTML = rangeVal;
}

function first() {
  /*
   console.log("Hello World!");
  console.log("Welcome to JavaScript");
  */
  //   alert("Hello World!");
  var nameObj;
  var ageObj;
  var name;
  var age;

  var nameObj2;
  var ageObj2;

  nameObj = document.getElementById("_idname");
  ageObj = document.getElementById("_idage");
  name = nameObj.value;
  age = ageObj.value;

  nameObj2 = document.getElementById("_idname2");
  ageObj2 = document.getElementById("_idage2");
  nameObj2.value = name;
  ageObj2.value = age;

  // gender
  var genderObj = document.getElementById("_idselect");
  var gender = genderObj.options[genderObj.selectedIndex].value;

  var mora;
  if (age >= 60) {
    mora = "You are an Senior";
  } else if (age >= 58 && gender == "F") {
    mora = "You are an Senior";
  } else if (age >= 18) {
    mora = "You are a Adult";
  } else {
    mora = "You are a Minor";
  }

  /* and OR 
  AND 

  T & T   = T 
  T & F   = F 
  F & T   = F 
  F & F   = F 

  OR 

  T & T   = T 
  T & F   = T 
  F & T   = T 
  F & F   = F 

  */

  var h4obj = document.getElementById("_idh4");
  h4obj.innerHTML = mora;
  //alert(name + " / " + age);
  //   name = prompt("Please Enter Name:");
  //   age = prompt("Please Enter Age of " + name);
  //   alert(name + " is " + age);
}

function selectweekday() {
  var wday = document.getElementById("_idwdat").value;

  // switch (Number(wday)) {
  //   case 1:
  //     alert("this is week end");
  //     break;
  //   case 2:
  //     alert("this first day of the week");
  //     break;
  //   case 3:
  //   case 4:
  //   case 5:
  //     alert("this is a week day");
  //     break;
  //   case 6:
  //     alert("ready for end of the week");
  //     break;
  //   case 7:
  //     alert("enjo the week end");
  //     break;
  //   default:
  //     alert("unknown day selected!!!!");
  //     break;
  // }

  var yesno = wday > 0;
  if (yesno) {
    switch (yesno) {
      case wday == 1 || wday == 7:
        alert("enjo the week end");
        break;
      case wday > 1 && wday < 7:
        alert("this is a week day");
        break;
      default:
        alert("unknown day selected!!!!");
    }
  }
}

function looper() {
  let ary = ["A", "B", "C"];
  let name = "tilak";
  let age = 0;

  let nary = ary;
  nary[0] = "Z";
  //childfunc(ary);

  alert(ary);
  alert(nary);
  ary[2] = "X";
  alert(ary);
  alert(nary);
}

function looper2() {
  var ary = ["A", "B", "C"];
  var name = "tilak";
  alert(name);
  name = "Looper2";
  if (ary) {
    alert(name);
  }
}

function looper3() {
  var ary; //= ["A", "B", "C"];
  var name = "tilak";
  alert(name);
  name = "Looper3";
  if (ary) {
    alert(name);
  }
}

function childfunc(value) {
  alert(value);
  value[0] = "Z";
  alert(value);
}

// ************** GAME 1 ********************/
var g_MAX_VALUE = 5;
var g_no_of_play = 0;
var g_win = 0;
var g_lost = 0;
var g_draw = 0;
var g_rock = "../images/rock.jpeg";
var g_scis = "../images/scissors.jpeg";
var g_pap = "../images/paper.jpeg";

function resetGame() {
  resetScore();
  toggleResetBtn(true);
  toggleRadio(false);
}

function resetScore() {
  g_no_of_play = 0;
  g_win = 0;
  g_lost = 0;
  g_draw = 0;
  setScreenScore();
}

function setScreenScore() {
  let winobj = document.getElementById("winscore");
  let drawobj = document.getElementById("drawscore");
  let lostobj = document.getElementById("lostscore");
  if (winobj != null) {
    winobj.value = g_win;
  }
  if (drawobj != null) {
    drawobj.value = g_draw;
  }
  if (lostobj != null) {
    lostobj.value = g_lost;
  }
}

function toggleResetBtn(trueflase) {
  let btnobj = document.getElementById("resetbtn");
  if (btnobj != null) {
    btnobj.disabled = trueflase;
  }
}

function getRandom() {
  let value = Math.floor(Math.random() * 3) + 1;
  return value;
}

function getRadioValue(value) {
  playGame1(value);
}

function playGame1(value) {
  let rndValue = getRandom();
  // 1 = R , 2 = S 3 = P
  // W 1 L -1 D = 0
  let winLose = 1;
  let image;
  if (value == "R") {
    if (rndValue == 1) {
      winLose = 0;
    } else if (rndValue == 3) {
      winLose = -1;
    }
  } else if (value == "S") {
    if (rndValue == 2) {
      winLose = 0;
    } else if (rndValue == 1) {
      winLose = -1;
    }
  } else {
    // P

    if (rndValue == 3) {
      winLose = 0;
    } else if (rndValue == 2) {
      winLose = -1;
    }
  }

  displayGameResult(winLose, rndValue);
  incResult(winLose);
}

function displayGameResult(winner, rndval) {
  let image;
  let word = "Youe Draw";
  //alert(rndval);
  if (rndval == 1) {
    image = g_rock;
  } else if (rndval == 2) {
    image = g_scis;
  } else {
    image = g_pap;
  }

  if (winner > 0) {
    word = "Youe Win";
  } else if (winner < 0) {
    word = "Youe Lost";
  }

  // display value to the computer selection
  let pcresultobj = document.getElementById("pcresult");
  if (pcresultobj) {
    pcresultobj.innerHTML = "";
    let img = document.createElement("img");
    img.src = image;
    img.height = "80";
    pcresultobj.appendChild(img);
  }

  displayResult(word);
}

function displayResult(word) {
  let pcresultobj = document.getElementById("dspresult");
  if (pcresultobj) {
    pcresultobj.innerHTML = "";
    let h3 = document.createElement("h3");
    h3.innerHTML = word;
    pcresultobj.appendChild(h3);
  }
}

function incResult(winLose) {
  g_no_of_play++;

  if (winLose == 0) {
    g_draw++;
  } else if (winLose > 0) {
    g_win++;
  } else {
    g_lost++;
  }

  setScreenScore();

  // when mo of play meets the max
  if (g_no_of_play >= g_MAX_VALUE) {
    playMusic();
    toggleRadio(true);
    toggleResetBtn(false);
    displaySuccess();
  }
}
function toggleRadio(trueflase) {
  let elm = document.getElementsByName("mygame");
  if (elm) {
    for (let i = 0; i < elm.length; i++) {
      elm[i].disabled = trueflase;
    }
  }
}

function playMusic() {
  let elm = document.createElement("audio");
  elm.src = "../audio/applause.mp3";
  elm.type = "audio/mpeg";
  elm.play();
}

function displaySuccess() {
  let word = "Game Draw";
  if (g_win > g_lost && g_win > g_draw) {
    word = "Game Win";
  } else if (g_lost > g_win && g_lost > g_draw) {
    word = "Game Lost";
  }
  displayResult(word);
}

/******** Object *********/
function testObj() {
  /*** Function to test Object */
  //let obj = new Object();
  let obj = {
    name: "Tilak",
    age: 50,
    dob: "01-JAN-1070",
    sayHello: function () {
      alert("Hello " + this.name);
    },
    address: {
      street: "First street",
      city: "Vadavai",
      postalcode: 627116,
    },
  };

  let employees = [
    { name: "tilak", Job: "programmer" },
    { name: "Messiah", job: "CEO" },
    { name: "Divya", job: "Manager" },
  ];
  //obj["dob"] = "01-JAN-1070";
  //obj.dob = "01-JAN-1070";
  //alert(obj.name + " at the age of " + obj.age + " " + obj.dob);

  // for (let key in obj) {
  //   alert(key + " : " + obj[key]);

  // }
  // var num1 = 70;
  // var num2 = num1;
  // num1++;
  // let obj2 = obj;
  // obj.name = "Besanto";

  // alert(obj.name + " : " + obj2.name);

  // obj2.name = "Kevin";

  // alert(obj.name + " : " + obj2.name);

  //obj.sayHello();
  /*** cloning the objct */
  // let obj2 = {};
  // Object.assign(obj2, obj);

  let obj2 = Object.assign({}, obj);

  //alert(obj.name + " : " + obj2.name);

  obj2.name = "Kevin";
  //alert(obj.name + " : " + obj2.name);

  obj.name = "besanto";
  //alert(obj.name + " : " + obj2.name);

  /*** JSON  Java simple Object Notation */
  let jsn = { name: "tilak", age: 50 };
  let jsn2 = JSON.parse(JSON.stringify(jsn));

  alert(jsn.name + " " + jsn2.name);
  jsn2.name = "Michael";
  alert(jsn.name + " " + jsn2.name);
}

/****  Class ******/

class Tester {
  constructor() {}
}

function testClass() {
  class Human {
    constructor(name) {
      this.name = name;
    }

    sayHello() {
      alert("Hello " + this.name);
    }
  }

  // let myHuman = new Human("Tilak");

  // myHuman.sayHello();
  // alert(myHuman.name);

  let Employee = class extends Human {
    setEmployeeNumber(emno) {
      this.employeeNo = emno;
    }

    getEmployeeNumber() {
      return this.employeeNo;
    }

    setSalary(salary) {
      this.salary = salary;
    }

    getSalary() {
      return this.salary;
    }
  };

  let myEmployee = new Employee("kevin");
  //myEmployee.sayHello();

  //alert(myEmployee instanceof Human);

  /**** override  */

  class Director extends Employee {
    getSalary() {
      return this.name + " Salary is " + this.salary;
    }
  }

  // let myDirector = new Director("Messiah");
  // myDirector.setSalary(5000);
  // let mysal = myDirector.getSalary();
  // alert(mysal);
  // myDirector.sayHello();

  // let newDir = new Director("bensanto");
  // let mysal2 = newDir.getSalary();
  // newDir.sayHello();
  // alert(mysal2);

  // alert(myDirector instanceof Director);
  // alert(myDirector instanceof Employee);
  // alert(myDirector instanceof Human);

  class CEO extends Director {
    #oFFiceNo = 101;
    constructor(name, year) {
      super(name);
      this.year = year;
    }
    setOff(no) {
      this.#oFFiceNo = no;
    }
    getOff() {
      return this.#oFFiceNo;
    }
  }

  let myCeo = new CEO("Divya", 2020);
  //myCeo.sayHello();
  myCeo.setSalary(20000);
  //alert(myCeo.getSalary());
  myCeo.setOff(110);

  // alert(myCeo.getOff());
  // try {
  //   let x = 10 / x;
  //   alert("X: " + x);
  // } catch (e) {
  //   alert(e);
  // } finally {
  //   alert(" i am in finally");
  // }

  try {
    testErr();
  } catch (err) {
    alert(err);
  } finally {
    alert("  in fin");
  }
  alert("completed");
}

function testErr() {
  let no = prompt("enter your age?: ");
  if (isNaN(no)) {
    let err = new Error("You failed to enter valid numer");
    throw err;
  }
  alert("exiting test err");
}
