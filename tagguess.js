//JavaScript goes here
	const tags = ['music', 'water', 'forest', 'movies', 'landscape', 'sea', 'books'];
	const list = document.getElementById('list-data');
	const answerList = document.getElementById('choices');
	let answer = ''

	function randomColor(){
		const r = Math.floor(Math.random() * 255);
		const g = Math.floor(Math.random() * 255);
		const b = Math.floor(Math.random() * 255);
		return 'rgb(' + r + ', ' + g + ', ' + b + ')'
	}

	function reset(){
		answerList.innerHTML = "";
		answer = tags[Math.floor(Math.random() * tags.length)]
		getTaggedPhotos(answer);

		const choices = [];
		choices.push(answer);

		while(choices.length < 7){
			const rand = tags[Math.floor(Math.random() * tags.length)]
			if (choices.indexOf(rand) == -1 ){
				choices.push(rand);
			}
		}

		choices.sort(function(){
		return Math.random() * 2 - 1;
		});

		for (let i = 0; i < choices.length; i++){
			const li = document.createElement('li');
			const btn = document.createElement('button');
			li.appendChild(btn)
			btn.innerHTML = choices[i]
			btn.style.backgroundColor = randomColor();
			btn.onclick = function(){
				if (btn.innerHTML == answer){
					window.alert('you are right!')
				}
				else {
					window.alert('sorry! the answer is ' + answer)
				}

				reset();
			}
			answerList.appendChild(li);
		}
	}

	


	function getTaggedPhotos(tagName){
		fetch('https://api.tumblr.com/v2/tagged?tag=' + tagName + 'gif&api_key=eVDcHJGvnvPxV54HUVNaicR1pERA3PpZOZ5phVvMugG3PkSb4S')
			.then(function(response){
				return response.json();
			})
			.then(function(result){
				console.log(result)

			// clear list
			list.innerHTML = '';

			const items = result.response;

			let masonry;
			console.log(masonry)
			for(let i = 0; i < items.length; i++){
				const item = items[i];

				if (item.photos != undefined) {
					const imgSrc = item.photos[0].original_size.url;

					const img = document.createElement('img');
					img.src = imgSrc;
					
					img.onload = function(){
						masonry.layout();
					}
					

					const li = document.createElement('li');
					li.appendChild(img);
					//li.innerHTML = imgSrcl

					list.appendChild(li);
				}	
			}
			
			masonry = new Masonry(list,{
				itemSelector: 'li',
				gutterWidth:8
			});
			masonry.layout();
		}) 

	}

	reset();
