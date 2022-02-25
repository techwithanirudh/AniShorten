async function shorten(e){

	e.preventDefault();
	console.log("Shortening")
	var url = document.querySelector("#url").value;
	var key = document.querySelector("#key").value;

	if(key == ""){
		key = Math.random().toString(36).substr(2, 5);
	}

	var response = await fetch(`/shorten?url=${url}&key=${key}`);
	if (response.status === 200) {
	document.querySelector("h4").innerHTML = `Shortened at 👉 <a href="https://AniShorten.techwithanirudh.repl.co/${key}">AniShorten.techwithanirudh.repl.co/${key}</a>`;
	} else if (response.status === 409) {
			document.querySelector("h4").innerHTML = `👉The link ${key} already exists. Please choose a unique link or use the random one.`;
	} else {
		document.querySelector("h4").innerHTML = `An error occoured! Please try again in a few seconds.`
	}
	
}