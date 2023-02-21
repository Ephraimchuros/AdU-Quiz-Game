{

myContent=[
			{
				question:"What is the name of this place?",
				options:["A. SV Building","C. ST Building","B. CS Building","D. OZ Building"],
				picture:"Images/sv.png",
				answer:0

			},

			{
				
				question:"Who is the founder of Adamson University?",
				options:["A. George Lucas Adamson","C. Henry Sy ","B. FR Marcelo Manimtim ","D. Henry Adamson"],
				picture:"Images/AduLog.png",
				answer:0

			},

			{
				
				question:"What is the name of this place?",
				options:["A. SV Building","C. ST Building","B. CS Building","D. OZ Building"],
				picture:"Images/cs.png",
				answer:2

			},
			{
				question:"What is the name of this place?",
				options:["A. SV Building","C. ST Building","B. CS Building","D. OZ Building"],
				picture:"Images/oz.png",
				answer:3

			},

			{
				
				question:"What is the name of this place?",
				options:["A. SV QUAD","C. ST QUAD","B. CS QUAD","D. OZ BQUAD"],
				picture:"Images/stQuad.png",
				answer:1

			},

			{
				
				question:"What is the name of this place?",
				options:["A. SV Canteen","C. ST Canteen","B. CS Canteen","D. OZ Canteen"],
				picture:"Images/stCanteen.png",
				answer:1

			},
			{
				question:"What is the name of this place?",
				options:["A. SV Canteen","C. ST Canteen","B. CS Canteen","D. OZ Canteen"],
				picture:"Images/csCanteen.png",
				answer:2

			},

			{
				
				question:"What is the name of this place?",
				options:["A. SV Walkway","C. ST Walkway","B. CS Walkway","D. OZ Walkway"],
				picture:"Images/csWalkway.png",
				answer:2

			},

			{
				question:"What is the name of this place?",
				options:["A. FRC Building","C. ST Building","B. CS Building","D. JP Building"],
				picture:"Images/frc.png",
				answer:0
				
				

			},
			{
				question:"What is the name of this place?",
				options:["A. SV Gym","C. ST Gym","B. CS Gym","D. OZ Gym"],
				picture:"Images/svGym.png",
				answer:0

			}
]
	let questionIndex = 0;
	const questionText = document.querySelector(".questionContainer");
	const image = document.querySelector(".imageContainer");
	const optionBox = document.querySelector(".ops");
	const nextButton = document.querySelector(".nextQuestion");
	const remainingTime = document.querySelector(".timer");
	let scores =0;
	let number =0;
	let attempt =0;
	let contentArray=[];
	let interval;
	


function load(){
			number++;
			QC.innerHTML=myContent[questionIndex].question;
			createOptions();
			imageInsert();
			Num.innerHTML=number + "/" + myContent.length;

}
	

function createOptions()
{
			startTimer();
			let animationDelay=0.2;
  			OC.innerHTML = ""; 
  			for(let i=0; i<myContent[questionIndex].options.length; i++){
			
			const option=document.createElement("DIV");
			const textnode = document.createTextNode(myContent[questionIndex].options[i]);
			option.appendChild(textnode)
			option.classList.add("option");
			option.id=i;
			animationDelay=animationDelay+0.2;
			OC.style.animationDelay=animationDelay+"s";
  			option.setAttribute("onclick", "check(this)");
  			document.getElementById("OC").appendChild(option);
	}
}
function contentRandom(){
	const randomNumber=Math.floor(Math.random() * myContent.length);
	let hitDuplicate=0;
	if(contentArray.length == 0){
		questionIndex=randomNumber;
	}
	else{
		for(let i = 0; i<contentArray.length; i++){
			if(randomNumber==contentArray[i]){
				hitDuplicate=1;
			}
		}
		if(hitDuplicate==1){
			contentRandom();
			return;
		}
		else{
			questionIndex=randomNumber;
		}
	}
		contentArray.push(randomNumber);
		load();
}

function check(ele){
	const id=ele.id;
	if(id==myContent[questionIndex].answer){
		ele.classList.add("correct");
		scores++;
		scoreBoard();
	}
	else{
		ele.classList.add("wrong");
		scores=scores;
		for(let i = 0; i < OC.children.length;i++){
			if(OC.children[i].id ==myContent[questionIndex].answer ){ 
				OC.children[i].classList.add("see-correct");			
			}
		}
	}
	attempt++;
	optionOff();
	showNextButton();
	stopTimer();
	
	if(number == myContent.length){
		quizOver();	
	}		

}
function optionOff(){
	for(let i=0; i <OC.children.length;i++){
		OC.children[i].removeAttribute("onclick");
	}
}
function showNextButton(){	
	 NQ.classList.add("show");
}
function scoreBoard(){
	Pnts.innerHTML=scores;
}
function hideNextButton(){	
	 NQ.classList.remove("show");
}
function nextQuestion(){
	questionIndex++;
	contentRandom();
	hideNextButton();	
}
function seeResult(){	
	quizResult();
	RT.style.display="block";
	quizOD.style.display="none";	
}
function quizResult(){
	var nameaa = document.getElementById("nameInput1").value;
	NR.innerHTML = nameaa + " Quiz Result";
	TQ.innerHTML =myContent.length;
	AT.innerHTML = attempt;
	Cor.innerHTML = scores;
	Wro.innerHTML =attempt-scores;
	const percentage = (scores/myContent.length)*100;
	Per.innerHTML = percentage+ "%";
}
function quizOver(){
	 NQ.classList.remove("show");
	 ShowRes.style.display="block";	 
}
function returnHome(){
	FPouterDiv.style.display="block";
	RT.style.display="none";
	scores=0;
	number=0;
	attempt=0;
	contentArray.length=0;
	Pnts.innerHTML=scores;
	restart();
}	
function restart(){	
	ShowRes.style.display="none";
}
function playAgain(){
	scores=0;
	number=0;
	attempt=0;
	contentArray.length=0;
	Pnts.innerHTML=scores;
	restart();
	RT.style.display="none";
	quizOD.style.display="block	";
	contentRandom();
}
function timesUp(){
	for(let i = 0; i < OC.children.length;i++)
		{
			if(OC.children[i].id ==myContent[questionIndex].answer ){ 
				OC.children[i].classList.add("see-correct");  
				console.log("showCorrect");
			}
		}
		optionOff();
		showNextButton();

	if(number == myContent.length){
		quizOver();	
	}			
}
function startTimer()

{
	TM.classList.remove("lessTime");
	let timeLimit=15;
	TM.innerHTML=timeLimit; 
	
	interval=setInterval(()=>{
		timeLimit--;
	if(timeLimit < 10)
	{
		timeLimit="0"+timeLimit;
	}
	if(timeLimit < 6)
	{
		TM.classList.add("lessTime");
	}
		TM.innerHTML=timeLimit; 
	if(timeLimit == 0)
	{
		clearInterval(interval);
		timesUp();
	}
	},1000)
}
function stopTimer(){
	clearInterval(interval);
}
function imageInsert(){
			var questionImage = document.getElementById("questionImage");
			questionImage.setAttribute("src",myContent[questionIndex].picture);
}
function proeedBtn(){	
	document.getElementById("FPouterDiv").style.display = "none";	
	document.getElementById("FPouterDiv").style.display = "none";
	document.getElementById("quizOD").style.display = "block";
	contentRandom();
}
function secpageBackBtn(){
	document.getElementById("secndPageOuterDiv").style.display = "none";
	document.getElementById("FPouterDiv").style.display = "block";
}

}