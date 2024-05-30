const SET_GAMES = "SET_GAMES"

let initialState = {
    games: [
        {
            name:"Call of Duty: Modern Warfare",
            image:"./images/CAL_OF_DUTY_GAME_ICON.jpg",
            id:1,
        },
        {
            name:"Counter-Strike: Global Offensive",
            image:"./images/contor_game_icon.jpg",
            id:2,
        },
        {
            name:"Overwatch",
            image:"./images/overwatch_game_icon.jpg",
            id:3,
        },
        {
            name:"Apex Legends",
            image:"./images/apex_game_icon.jpg",
            id:4,
        },
        {
            name:"Valorant",
            image:"./images/valorant_game_icon.jpg",
            id:5,
        },
        {
           name:"The Witcher 3: Wild Hunt",
           image:"./images/The_Witcher_game_icon.jpg",
            id:6,
        },
        {
            name:"Skyrim: The Elder Scrolls V",
            image:"./images/Skyrim_game_icon.jpg",
             id:7,
         },
         {
            name:"Dark Souls III",
            image:"./images/Dark_game_icon.jpg",
             id:8,
         },
         {
            name:"Divinity: Original Sin 2",
            image:"./images/Divinity_game_icon.jpg",
             id:9,
         },
         {
            name:"Fallout 4",
            image:"./images/Fallout_game_icon.jpg",
            id:10,
         },
         {
            name:"Dragon Age: Inquisition",
            image:"./images/Dragon_Age_game_icon.jpg",
             id:11,
         },
         {
            name:"Destiny 2",
            image: "./images/Destiny_game_icon.jpg",
            id:12,
         },
    ],
       
};

let GamesReducer = (state=initialState, action)=>{
    switch(action.type){

        case SET_GAMES:{
            return{
                ...state,
                games: action.games,
            }
        }
        
        default:
            return state;
    }
}

export const setGamesActionCreater = (games)=>({type: SET_GAMES, games: games})

export default GamesReducer;