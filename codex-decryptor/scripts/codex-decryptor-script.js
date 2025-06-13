/* Change the target button's styling and arrow direction as if content was hidden */
function buttonUp (target) {
	arrow = document.getElementById(String(target) + "_arrow");
	btn = document.getElementById(String(target) + "_btn");
	
	arrow.src = "/images/downarrow.png";
	btn.style.borderWidth = "0.3rem";
	
	btn.scrollIntoView({behavior: "smooth"});
}

/* Change the target button's styling and arrow direction as if content was visible */
function buttonDown (target) {
	arrow = document.getElementById(String(target) + "_arrow");
	btn = document.getElementById(String(target) + "_btn");
	
	arrow.src = "/images/uparrow.png";
	btn.style.borderWidth = "1rem";
}

/* Toggle the dropdown content of target entry */
function toggleDropdown(target) {
	
	/* Store target, content, content ID, image*/
	target_elem = document.getElementById(String(target));
	content_id = String("#" + target + "_content");
	content = document.getElementById(String(target) + "_content");
	image_id = String("#" + target + "_image");
	img = document.getElementById(image_id);
	
	/* if dropdown, content is being revealed */
	dropdown = target_elem.classList.contains("collapsed");
	
	/* if has_image, the entry contains a photo */
	has_image = target_elem.classList.contains("has_image");
	
	/* swap collapse state for next button press */
	target_elem.classList.toggle("collapsed");
	
	/* Toggle image visibility - up */
	if (!dropdown){
		if (has_image) {
			$(String(image_id)).animate({/*left:"0%",*/ opacity:"0"}, String($(content_id).height()/3));
		}		
	}
	
	/* Slide the dropdown up/down at consistent speed */
	$(content_id).slideToggle($(content_id).height()/1.5, function() {	
	
		/* Toggle arrow direction and button style - up */
		if (!dropdown){
			
			buttonUp(target);
		}
		
		else { /* If we're opening dropdown, scroll to content */
			content.scrollIntoView({behavior: "smooth"});
		}
		
	});
	
	/* Toggle image visibility, arrow direction and button style - down */
	if (dropdown){
		
		buttonDown(target);
		
		if (has_image) {
			$(String(image_id)).animate({/*left:"0%",*/ opacity:"1"}, String($(content_id).height()/1.5));
		}
	}
}

/* Navigate to a target entry and show dropdown */
function navigateToEntry(target) {
	target_elem = document.getElementById(String(target));
	content = document.getElementById(String(target) + "_content");
	content_id = String("#" + target + "_content");

	$(content_id).show(0, function() { content.scrollIntoView({behavior: "smooth"});});
	buttonDown(target);
	
	target_elem.classList.remove("collapsed");
}


/* Navigate to a target sub-entry that is the child of targetParent, and show dropdown */
function navigateToSubEntry(target, targetParent) {
	target_elem = document.getElementById(String(target));
	targetParent_elem = document.getElementById(String(targetParent));
	content = document.getElementById(String(target) + "_content");
	content_id = String("#" + target + "_content");
	contentParent_id = String("#" + targetParent + "_content");
	
	$(contentParent_id).show(0);
	buttonDown(targetParent);
	$(content_id).show(0, function() { content.scrollIntoView({behavior: "smooth"});});
	buttonDown(target);
	
	target_elem.classList.remove("collapsed");
	targetParent_elem.classList.remove("collapsed");
}

/* jQuery Events */
$(document).ready(function(){
	
	/* Fires when user clicks an entry's dropdown button */
	$(".dropdownbutton").click(function(){
		toggleDropdown($(this).data("target"));
	})
	
	/* Fires when user clicks link to a sub-entry */
	$("span.subentrylink").click(function(){
		navigateToSubEntry($(this).attr("data-target"), $(this).attr("data-target_parent"));
	})
	
	/* Fires when user clicks link to an entry */
	$("span.entrylink").click(function(){
		navigateToEntry($(this).attr("data-target"));
	})
	
	/* Change arrow transparency when hovering over button */
	$(".dropdownbutton").hover(function() {
		$("#" + String($(this).attr("data-target")) + "_arrow").animate({opacity:'1'}, 45);
	}, function() {
		$("#" + String($(this).attr("data-target")) + "_arrow").animate({opacity:'0.5'}, 45);
	});
}); 