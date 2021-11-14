
export function getDanmakuData(url, method) {
	return new Promise((resolve, reject) => {
		var xmlhttp = new XMLHttpRequest();
		xmlhttp.onreadystatechange = function(){
			  if (xmlhttp.readyState==4 && xmlhttp.status==200){
				const res = JSON.parse(xmlhttp.responseText) 
				 resolve(res)
			  }else if(xmlhttp.status == 500){
				  reject('server ERROR')
			  }
		}
		xmlhttp.open(method, url, false);
		xmlhttp.send();
	})

}

export function postDanmaku(){
	return new Promise((resolve, reject) => {
		
	})
}

