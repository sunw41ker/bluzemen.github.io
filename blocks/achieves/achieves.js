
var achieves = {};

$(function() {
	achieves.add = function(container, name, imgUrl) {
		var achievesCount = container.children().length;

		achievesCount = 0;

		// счётчик присвоенных ачивок
		_.each(container.children(), function (a) {
			achievesCount += parseInt($(a).find('.achieves-item__num').text());
		})

		// ограничитель по к-ву ачивок
		if (achievesCount >= this.countLimit){
			var msg = 'Warning: too much achieves ('+ this.countLimit +'). Adding this one is canceled.';
			console.log(msg);
			alert(msg);
			return false;
		}

		var achieve = container.find('#achieves-item-' + name);
		console.log('achieve = ', achieve)
		if(!achieve[0]){ 
			// bad practice: mixing markup and code
			// DON'T DO like this in real project!
			var template =    '<div class="achieves-item" id="achieves-item-' + name + '">'
							+	 '<div class="achieves-item__img" style="background-image: url(' + imgUrl + ');"></div>'
							+	 '<div class="achieves-item__num">1</div>'
							+ '</div>';
			var elem = $(template);
			container.append(elem);
		}else{
			achieve.addClass('achieves-item_multiple');
			var num = achieve.find('.achieves-item__num');
			num.text(parseInt(num.text()) + 1);
		}
		return true;
	};

	// Инициализатор контейнера произвольными ачивками 
	achieves.init = function(container, count, images, names){
		for(var i=0; i < count; i++){
			if(!this.add(container, _.sample(names), _.sample(images)))
				break;
		}
	};
});