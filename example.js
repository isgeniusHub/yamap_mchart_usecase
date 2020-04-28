"use strict";
let mChatR = document.getElementById("m-chat-r-test");
if(mChatR){
	let mChatRInput = mChatR.querySelectorAll('input[type="radio"]');
	
	for(let i=0; i<Array.from(mChatRInput).length; i++){
		mChatRInput[i].onclick = function() {
			this.closest("tr").classList.remove("has-error");
			this.closest("tr").classList.add("has-selected");
			let arr = Array.from(this.closest("td").querySelectorAll(".selected"));
			
			if(arr.length){              
				for(let j=0; j<arr.length; j++){
					arr[j].classList.remove("selected");
				}
			}
			
			if(!this.previousElementSibling.classList.contains("selected")){
				this.previousElementSibling.classList.add("selected");
			}
		};
	}
    
  
	let mChatRbtn = document.getElementById("m-chat-r-submit");
	mChatRbtn.onclick = function(e) {
		e.preventDefault();
		
		let scrollToErr = false;
		let mChatRInput = Array.from(mChatR.querySelectorAll('input[type="radio"]:checked'));  
		
		if(mChatRInput.length<20){
			let mChatRTr = mChatR.querySelectorAll('tr');    	    
			for(let i=0; i<Array.from(mChatRTr).length; i++){
				if(!mChatRTr[i].classList.contains("has-selected")){
					if(!scrollToErr){
						mChatRTr[i].scrollIntoView(true);
						scrollToErr = true;
					}
					mChatRTr[i].classList.add("has-error");
				}
			}
		}else{
			let resultObj = {};
			let resultNum = 0;
			
			for(let i=0; i<Array.from(mChatRInput).length; i++){    
				switch (mChatRInput[i].value){
					case "Y":
						if(i == 1 || i == 4 || i == 11){
						resultNum+=1;
						}
						break;
					case "N":
						if(i != 1 && i != 4 && i != 11){
						resultNum+=1;
						}
						break;          
				}            
			}
			  
			var resultContainer, resultBold, resultRecom;
			if(!document.getElementById("m-chat-r-result")){
				resultContainer = document.createElement("div");
				resultContainer.setAttribute('id', "m-chat-r-result");
				resultContainer.classList.add("m-chat-r-result");
				resultBold = document.createElement("span");
				resultRecom = document.createElement("div");
			}else{
				resultCoresultRecomntainer = document.getElementById("m-chat-r-result");
				resultBold = resultContainer.querySelector("span");
				resultRecom = resultContainer.querySelector("div");
			}
			
		      
			let xhr = new XMLHttpRequest();
			xhr.open('POST', 'm-chat-r-test.php', true);
			let bodyPost = "send_data=Y&res=" + resultNum;
			xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");      
			xhr.onreadystatechange = function() {
				if (this.readyState != 4) return;    
				if (this.status != 200) {
					alert( 'ошибка: ' + (this.status ? this.statusText : 'запрос не удался') );
					return;
				}      
				    
				let resText = JSON.parse(this.response);
				    
				resultBold.innerHTML = resText.res;
				resultContainer.innerHTML = resText.text;
				resultRecom.innerHTML = resText.recom;
				resultContainer.prepend(resultBold); 
				resultContainer.append(resultRecom); 
				mChatR.append(resultContainer);
				ym(45296772, 'reachGoal', 'btn-get-res'); //яндекс цель при выводе результатов тестирования
			}
			xhr.send(bodyPost);
		}
	}
}
;
