"use strict";

/******************************************************************************
 * Handling navbar clicks and updating navbar
 */

/** Show main list of all stories when click site name */

function navAllStories(evt) {
  console.debug("navAllStories", evt);
  hidePageComponents();
  putStoriesOnPage();
}

$body.on("click", "#nav-all", navAllStories);

/** Show login/signup on click on "login" */

function navLoginClick(evt) {
  console.debug("navLoginClick", evt);
  hidePageComponents();
  $loginForm.show();
  $signupForm.show();
}

$navLogin.on("click", navLoginClick);

/** When a user first logins in, update the navbar to reflect that. */

function updateNavOnLogin() {
  console.debug("updateNavOnLogin");
  $(".main-nav-links").show();
  $navLogin.hide();
  $navLogOut.show();
  $navUserProfile.text(`${currentUser.username}`).show();
}

function navSubmit(evt){
  console.debug("navSubmitForm",evt);

  // $storyForm.toggleClass("hidden");
  $storyForm.show();
  $allStoriesList.hide();
  $myStories.hide();
  $favoriteStories.hide();

}

$submit.on("click",navSubmit);


function navFavorites(evt){
  console.debug("navFavorites",evt);
  $allStoriesList.hide();
  $myStories.hide();
  $storyForm.hide();

  $favoriteStories.show();
  // $favoriteStories.removeClass("hidden").addClass("show");
  putFavStoriesOnPage();

}

$navFav.on("click",navFavorites);

function navMyStories(evt){
  console.debug("navMyStories",evt);
  $allStoriesList.hide();
  $favoriteStories.hide();
  $storyForm.hide();
  $myStories.show();

  // $favoriteStories.removeClass("hidden").addClass("show");
  putMyStoriesOnPage();
}

$myStoriesButton.on("click",navMyStories);