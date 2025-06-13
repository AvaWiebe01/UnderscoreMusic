window.onload = function() {
	
	libraries = Array.from(document.getElementsByClassName("slides"));
	
	slides = new Array; /* Array to hold all slides (image+description) */
	
	currSlide = new Array; /* Array to hold current slide of all slideshows */
	
	i = 0; /* Counts the current slideshow */
	k = 0; /* Counts the current slide # within slideshow */
	
	/* Populate 2D array 'slides' with every slide. Each row is one slideshow. */
	for(library of libraries) {
		
		slides[i] = new Array; /* Create 2D Array */
		
		for(picture of library.children) {
			slides[i].push(picture);

			slides[i][k].style.display="none";
			
			k++;
		}
	
		slides[i][0].style.display="flex"; /* Set first slide as active */
		currSlide[i] = 0;
		document.getElementById("num" + String(i)).innerHTML = "1/" + String(slides[i].length);
	
		i++;
		
		k = 0;
	}
}

/* jQuery Events */
$(document).ready(function(){
	
	/* Clicking a left button on library */
	$(".left-button").click(function(){
		target = parseInt($(this).attr("data-target"))
		
		slides[target][currSlide[target]].style.display="none"
		currSlide[target]--;
		
		if (currSlide[target] < 0) {
			currSlide[target] = slides[target].length - 1;
		}
		
		slides[target][currSlide[target]].style.display="flex"
		
		document.getElementById("num" + String(target)).innerHTML = String(currSlide[target] + 1) + "/" + String(slides[target].length);
	})
	
	/* Clicking a right button on library */
	$(".right-button").click(function(){
		target = parseInt($(this).attr("data-target"))
		
		slides[target][currSlide[target]].style.display="none"
		currSlide[target]++;
		
		if (currSlide[target] >= slides[target].length) {
			currSlide[target] = 0;
		}
		
		slides[target][currSlide[target]].style.display="flex"
		
		document.getElementById("num" + String(target)).innerHTML = String(currSlide[target] + 1) + "/" + String(slides[target].length);
	})
	
	/* Hovering over a slide reveals description */
	
	$(".slide").hover(function() {
		$(this).find("img").animate({opacity: "0.15"}, 30)
		$(this).find("span").animate({opacity: "1"}, 30)
	}, function() {
		$(this).find("img").animate({opacity: "1"}, 30)
		$(this).find("span").animate({opacity: "0"}, 30)
	});
});