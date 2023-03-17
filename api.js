'use strict'

let names = document.getElementById('name')
let btn = document.getElementById('btn')
let artist_name = document.querySelector('.artist_name')
let artist_state = document.querySelector('.artist_state')
let showContent = document.querySelector('.show')
let artist_song = document.querySelector('.artist_song')


async function searchSongs(artist_name)
{
	let param 
	try{
			// This searches for an artiste by his/her name
		let response = await fetch(`https://genius.p.rapidapi.com/search?q=${artist_name}`, {
			"method": "GET",
			"headers": {
				"x-rapidapi-host": "genius.p.rapidapi.com",
				"x-rapidapi-key": "fbb515b79cmsha6097c71d53a5b6p1adb1bjsn6cf4fc3c7a0f"
			}
		})
		
		let data = await response.json()
		let perchunk = 2
		let li

		artist_song.innerHTML = ""

		let h3 = document.createElement("h3")
			h3.innerHTML = "These are the top 3 songs"

		data.response.hits.forEach((datas,index) => {
			
			if(index <= perchunk){
				
				li = document.createElement('li')
				li.innerHTML = datas.result.full_title
				artist_song.append(li)
				artist_song.insertBefore(h3, artist_song.firstChild)
				
			}
		})

		param = data.response.hits[0].result.primary_artist.api_path // /artist/id
		
		param.slice(1) // artist/id
		

	}catch(e){
		console.log("Error", e);
	}

	return param
}

async function getArtiste(){

	let endpoint_result = await searchSongs(names.value)

// This searches for an artiste by ID
fetch(`https://genius.p.rapidapi.com/${endpoint_result}`, {
	"method": "GET",
	"headers": {
		"x-rapidapi-host": "genius.p.rapidapi.com",
		"x-rapidapi-key": "fbb515b79cmsha6097c71d53a5b6p1adb1bjsn6cf4fc3c7a0f"
	}
})
.then(response => response.json())
.then(data => {
	console.log(data.response)
	showDetails(data)
})
.catch(err => {
	console.error(err);
});


}


btn.addEventListener('click', function(){
    if(names.value === ''){
		alert('Empty Strings not allowed');	
	}else{
    // searchSongs(names.value)
		

		getArtiste()
	}
    
})


function showDetails(data){
	artist_state.innerHTML = `<img src="${data.response.artist.user.avatar.medium.url}" alt="Artist Picture"/>`
	artist_name.innerHTML = ""

	let p
	let h4 = document.createElement('h4')
	h4.innerHTML = "Short Description"

	data.response.artist.description.dom.children.map((repo) => {
		console.log(repo)

		Object.entries(repo).forEach(([key, value]) => {

			if(key == "children"){
				p = document.createElement('p')
				let newWord = JSON.stringify(value)
				p.append(JSON.parse(newWord))
				artist_name.append(p)
				artist_name.insertBefore(h4, artist_name.firstChild)	
			} 
		})
	})
	
}
