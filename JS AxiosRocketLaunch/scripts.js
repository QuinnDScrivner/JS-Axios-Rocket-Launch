// Quinn Douglas Scrivner
//location of the buttons
var rocketPage = document.getElementById("astroInfo");
var astroPage = document.getElementById("astroNauts");
//The global variables

rocketPage.addEventListener("click", () => {
  axios
    .get(
      "https://lldev.thespacedevs.com/2.2.0/launch/?limit=4&is_crewed=true&include_suborbital=true&related=false"
    )
    .then((responseText) => {
      var launches = responseText.data;
      //This is for me to find my drill locations
      console.log(launches);

      //The MAP function is quite literally a backwards .push, but it makes an array without having to pre make it
      spaceShips = launches.results.map((obj) => {
        return obj.name;
      });

      //This one is for the images of the rocket ships
      shipImages = launches.results.map((obj) => {
        return obj.image;
      });

      //This makes for the descriptions
      spaceDescriptions = launches.results.map((obj) => {
        return obj.mission.description;
      });

      //soft code location for where all of this goes, I had to create the element because I make JS delete the div entriely later on
      var firstDiv = document.createElement("div");
      firstDiv.id = "spaceContainer";
      //Everytime I click the SpaceShips button it is created
      document.body.appendChild(firstDiv);

      var spaceShipLocation = document.getElementById("spaceContainer");

      //hueMUNGIS for loop that will make my little "cards" that have each rockect, its name, and a descriptions of the mission
      for (i = 0; i <= 3; i++) {
        //create elements that define formatting in some areas, and some for img tags
        var subDiv = document.createElement("div");
        //add an id for formatting
        subDiv.id = "space";
        var createDescripton = document.createElement("h3");
        var createSpace = document.createElement("img");
        var createShipName = document.createElement("h3");
        //Changing the innerhtml to display the rockets names and missions
        createDescripton.innerHTML = spaceDescriptions[i];
        //adding the images to the created tags
        createSpace.src = shipImages[i];
        createShipName.innerHTML = spaceShips[i];
        //appending it all when the webpage loads
        subDiv.appendChild(createSpace);
        subDiv.appendChild(createShipName);
        subDiv.appendChild(createDescripton);
        //append divs to one big boy div that gets created everytime the SpaceShips button is clicked
        spaceShipLocation.appendChild(subDiv);
      }

      //the kicker, the continuer, THE ASTROFUNCTION
      astroPage.addEventListener("click", () => {
        //remove the rockets
        spaceShipLocation.remove();

        axios
          .get("https://lldev.thespacedevs.com/2.2.0/astronaut/?limit=4")
          .then((responseText) => {
            //Again, create a div that will later on create multiple subdivs with the information/pictures of astronauts
            var secondDiv = document.createElement("div");
            //formatting
            secondDiv.id = "astroContainer";
            document.body.appendChild(secondDiv);

            var nauts = responseText.data;

            astronautImage = nauts.results.map((obj) => {
              return obj.profile_image;
            });

            //The bio and names of the astronauts
            astronautBio = nauts.results.map((obj) => {
              return obj.bio;
            });

            var astronautLocation = document.getElementById("astroContainer");

            for (i = 0; i <= 3; i++) {
              var subDiv = document.createElement("div");
              subDiv.id = "astronaut";
              var createDescripton = document.createElement("h3");
              var createAstronaut = document.createElement("img");

              createDescripton.innerHTML = astronautBio[i];
              createAstronaut.src = astronautImage[i];
              subDiv.appendChild(createAstronaut);
              subDiv.appendChild(createDescripton);

              astronautLocation.appendChild(subDiv);
            }

            //This keeps the loop, well looping
            rocketPage.addEventListener("click", () => {
              astronautLocation.remove();
            });
          });
      });
    });
});
