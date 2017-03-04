(function(){
	var elGallery = document.getElementsByClassName('gallery')[0],
		popup = document.getElementsByClassName("popup")[0],
		close = document.getElementsByClassName("close")[0],
		elCommentsCount = document.querySelector("#comments > span"),
		elComments = document.querySelector(".comments-wrapper > ul"),
		elAuthor = document.querySelector(".comment-author > span");

	var classNameCommentsImg = "commentsImg",
		classNameLikesImg = "likesImg",
		classNameDislikesImg = "dislikesImg";	

	init(data);

	function init(data){
		data.forEach(function(item, index){
			createObj(item, index);
		});
		close.addEventListener("click", closePopup);
	};

	function createObj(obj, index){
		var	div = document.createElement('div'),
			img = document.createElement('img'),
			info = document.createElement('div'),
			commentsInfo = document.createElement('div'),
			likesInfo = document.createElement('div'),
			dislikesInfo = document.createElement('div');

		img.src = obj.src;
		img.width = obj.width;
		img.height = obj.height; 

		info.classList.add('info');

		var amountComments = obj.comments.length;

		createInfoInner(commentsInfo, classNameCommentsImg, amountComments);
		createInfoInner(likesInfo, classNameLikesImg, obj.likes);
		createInfoInner(dislikesInfo, classNameDislikesImg, obj.dislikes);

		info.appendChild(commentsInfo);
		info.appendChild(likesInfo);
		info.appendChild(dislikesInfo);

		div.appendChild(info);
		div.appendChild(img);
		div.dataset.index = index;

		div.addEventListener("click", openPopup);

		elGallery.appendChild(div);
	};

	function openPopup(){
		var index = this.dataset.index;
		var likes = data[index].likes;
		var dislikes = data[index].dislikes;
		var acountComments = data[index].comments;
		var author =  data[index].comments.author;

		showPopup();
			// console.log("количество лайков: " + likes);
			// console.log("количество дислайков: " + dislikes);
			// console.log("количество комментариев: " + acountComments.length);
			elCommentsCount.innerHTML = acountComments.length;

			elComments.innerHTML = "";

			data[index].comments.forEach(function(obj){
				addInfoInner(obj.date, obj.author, obj.text)
			});

	}
	function addInfoInner(date, author, comment){
		var elLi = document.createElement("li");
		elLi.innerHTML = "<div class='comment-info'>" +
                      			"<span class='author'>" + author + "</span>" +
                      			"<span class='date'>" + date + "</span>" +
                    		"</div>"+
                    		"<span class='comment'>" + comment + "</span>"
		elComments.appendChild(elLi);
	};

	function createInfoInner(element, className, value){
		element.innerHTML = "<div class='" + className + "'></div>" +
							"<div class='circle'>" + value + "</div>";
		return element;
	};

	function setClass(element, className){
		element.classList.add(className);
	}	

	function showPopup(){
		popup.classList.add("show");
	}

	function closePopup(){
		popup.classList.remove("show");
	}

})();