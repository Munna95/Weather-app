let getLocationForm = document.querySelector("#locationForm");

async function getWeatherData() {
  let response = await fetch(
    `http://api.openweathermap.org/data/2.5/weather?q=${getLocationForm.locationInput.value}&APPID=a025b2b1457c6ed72b5d4a5126c33e43`
  ).then((response) => response.json());
  if (response.cod !== 200) {
    console.log("Invalid location"); //Here I should replace the console message for a modal or pop up notification
  } else {
    validateWeatherData(response);
  }
}

function validateWeatherData(data) {
  //Checks if the list has children elements, calls removeOldData if true
  if (document.getElementById("weatherInfoList").firstChild != null) {
    removeOldData(data);
  } else {
    displayWeatherData(data);
  }

  //Removes old elements from the list and calls the print function afterwards
  function removeOldData(data) {
    console.log("aca estaria mi funcion, SI TUVIERA UNA");
    console.log(`                                                                                                                             
                                                                                                                             
                                                                               .......                                       
                                                                          :7P#&&&&&&&&#B?~.                                  
                                                                        :G@@@&&&&&&&&&&&@@@&P7.                              
                                                                       5@@&################&&@&#P~.                          
                                                                .:~^..P@&###############&&&&&&#&&@&BJ:       .               
                                                             JB&&&@@@&@@#######################&&&&&@@&5J.  ^&P~             
                                                           J&@&&#####&@&&&@@@@@@@&&&&&&&&&&&&&##&&&&&&&&&&&&&@@@^            
                                                         ^&@&#####&&&BY7?G&&##&&&@@@@&G#@@@@@@@@@@@@&&&&&&&&&&@B             
                                                       .G@&####&&&#5!:...7^    ^!^.:P!:?!:.^77:!&BPGGGGB#&&&#5!              
                                                      ~&@###&&&B5!^...:::^~~^^:~!777!::~~~^!?7~?&G.      ..                  
                                              .75GGGPG@@##&&BY~:......::~~~~!!!!!?J?^...::^~!!!~~Y&P.                        
                                             ?&P7~^^!#@&#BY!:...::^~!7!7^........::....::::.......:5#G^                      
                                            5@7:::::.!GJ~:...:^~7!~^::...............^!7777!........:J&B!.                   
                                           .@B:^:^^:.:...:^!YY?77?~!!!!~~^^::.......:Y~^:^^^.::..::...:7B#J:                 
                                           .&#:::::...:~JJ~:.  .!^......^57~!!~~^^:::~~~~~~:.?#&#GP555Y5P#@@P7               
                                         .?B&G^::...^?P##5J?7!!5!...    7.     .77~!!~^^:.....~P&#^    .:...::               
                                      .!B&#Y~:...:!PBBPPPPPPPGGGPGGGP5JG5~~^:..7~     ^#B5Y?~^:.:?BP~                        
                                     Y&@G!:....:!GBBPPP55PPPPPPPPPPPPPPPB&@&G5G#P5J?!~#Y  .^55JYJ7!JBB!.                     
                                  .5&&5^...:.:!JJ???J5PPPPPPPPPPPPPPPPG&#J:     ..:~7Y7         :^?YPB@@5.                   
                                .5@#?:...:..^J?~^^~~~!7JPGPPPPPPPPP5G&&7                            .:JB&#Y.                 
                              .G@#!:.:::..:?PJ7?YY?7?77JYPGPPPGGGGGB@#:                                   ..                 
                            .5@#7:...:Y^.^J!.  ^7.    .7.    ^~..::~J5BP5Y?~.                                                
                          :5@B!:.:~!7?Y::J^   :?:.:::~Y!^^^^7?::... .!^ .:^7G#!                                              
                        :Y&#7..:7?^. .!.^J!!~!!~^~~^^^::^^:^^^^^~~~~77~~^^^5&G.                                              
                      .Y@&P7^^77^     ~...::^^~~!!!~:...^?.....:..!:.....:^!?PBP!                                            
                     7&@Y  .7Y:      .57!7??7!^^:........J^..:?:..J!...:~?5GGGG5~                                            
                   :B@P.    :        .B7!!!~~~!!!~~~!7?7!J5!~YB!^~J77YGGP?~:.                           ^^^.                 
                  Y@#~               :G:         ..^!!^J@&5!^^^~J#&GJ!:               :^^^:          ~YJJY5GP^.              
                :#@?                 :5.^!~^...^~^.   :#@J.!: .~G@@:               ~555JJ?7!!7YG:    Y&Y^::^!G&Y77PG&P.      
               Y@G.                  ^J    .:^:      :#@&:  ^JJJG&&P?~.        .?5##7:...::^^!5@&5JJJP&@&5^:::5@5!^:P@~      
             :&&?                    ~J             .#@@&!!7!~~~~~~!JYPB^     :@P~!7JJ7^77?B@#!?&J::^~~7#@?::.?Y::.~&B       
            J@B.                     ~?            .B@&@#5::...:.:::::.P@G5YYJY@B!:::^!YP!~7&#. :BG7::::7&7:.!5:.:?#G        
           P@J         ^7            ~?           .B@&@&.7!..:JJBB5555B&J~^~~7JG@@#J^:.7#?:.?@#!~Y@&?.:.Y?.:?Y^^?G&~         
         .#@!          .Y.           ^?          .B@&&@G :J..:Y^&Y    ~&B?~^^:::~B#!:.^J7::7J?77!!!5~..7Y!YGGYJ?~.           
        ^&&^            !~           :?          P@&&&@? :Y:..^?GBBGPPPGG57!~::..?Y^!5GY77J!:.....::.:J&G557:.               
       !@#.             .J           .?         Y@&&&&&^.57.......::::^^^^~~!!?YP#Y~^^^^^:^^~!!7777?J#B^                     
      P@G.               !!           ?        !&&&&&@&P?77~^~!7GGPPPGGP555YB@@#PJ!?5PBGGB##P555PY7!:.                       
     5@B.                 7.          ?^      :&&&&&&#J?7 :57. .#@.       .7GY:~~.J#P^:                                      
    J@#.                  !7          ~!     .B@&@@&Y:  :?P.    J@:     7B&G~..:J&G.                                         `)
    displayWeatherData(data);
  }

  function displayWeatherData(data) {
    //add new info function -> CONVERT temperatures to Celsius before printing
    //Show temp, feels_like, temp_min, temp_max, pressure, humidity, timezone, name 
    const weatherData = [
      Array.from(Object.values(data.main)),
      data.name,
      data.timezone,
      data.weather[0].main,
      data.weather[0].description
    ];

/*     const weatherData = {
        name: data.name,
        timezone: data.timezone,
        main: data.weather[0].main,
        temp: data.main.temp,
        feels_like: data.main.feels_like
    }
    console.log(weatherData) */

     for (i = 0; i < weatherData.length; i++) {
      weatherInfoList.appendChild(createHTMLElement(weatherData[i]));
    }
  }
}






//Creates a <li> element for each position of the array
function createHTMLElement(info) {
  const listElement = document.createElement("li");
  listElement.innerText = info;
  return listElement;
}

getLocationForm.addEventListener("submit", function (event) {
  getWeatherData();
  event.preventDefault();
});
