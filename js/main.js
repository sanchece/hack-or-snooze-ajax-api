"use strict";

// So we don't have to keep re-finding things on page, find DOM elements once:

const $body = $("body");

const $storiesLoadingMsg = $("#stories-loading-msg");
const $allStoriesList = $("#all-stories-list");

const $loginForm = $("#login-form");
const $loginError=$("#login-error");
const $signupForm = $("#signup-form");
const $signupError=$("#signup-error");

const $navLogin = $("#nav-login");
const $navUserProfile = $("#nav-user-profile");
const $navLogOut = $("#nav-logout");

const $profile=$("#profile");
const $user=$("#username");
const $name=$("#name");
const $date=$("#date");


const $submit=$("#submit");
const $storyForm=$("#new-story");
const $addStory=$("#add-story");


const $favoriteStories=$("#all-stories-list-favorites");
const $navFav=$("#favorites");
const $toFav=$("#to-fav");

const $myStories=$('#all-stories-list-myStories');
const $myStoriesButton=$('#my-stories');
 const $remStoryButton=$("#to-remove");




/** To make it easier for individual components to show just themselves, this
 * is a useful function that hides pretty much everything on the page. After
 * calling this, individual components can re-show just what they want.
 */

function hidePageComponents() {
  const components = [
    $allStoriesList,
    $loginForm,
    $signupForm,
    $myStories,
    $storyForm,
    $favoriteStories,
    $profile
  ];
  components.forEach(c => c.hide());
}

/** Overall function to kick off the app. */

async function start() {
  console.debug("start");

  // "Remember logged-in user" and log in, if credentials in localStorage
  await checkForRememberedUser();
  await getAndShowStoriesOnStart();

  // if we got a logged-in user
  if (currentUser) updateUIOnUserLogin();
}

// Once the DOM is entirely loaded, begin the app
$(start);
