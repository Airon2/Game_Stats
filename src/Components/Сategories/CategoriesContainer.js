import { connect } from "react-redux";
import Categories from "./Categories";
import { setGamesActionCreater } from "../../redux/GamesReduser";
{/*
let CategoriesContainer = (props) =>{
    
    useEffect(()=>{
        fetch("")
        .then(function(respone){
            if(!respone.ok){
                throw new Error("Ошибка HTTP статус" + respone.status);
            }
        return respone.json();
    })
    .then(function(data){
      props.setGames(data);
    })
    .catch(function(error){
        console.error("Произошла ошибка:", error)
    });
    },[])

    return <Categories {...props}/>
}
*/}
function mapStateToProps(state){
    return{
        GamesPage: state.GamesPage,
    };
};

function mapDispathToProps(dispatch){
    return {
        setGames:(games)=>{
            dispatch(setGamesActionCreater(games))
        },

      
    }
}

let  CategoriesContainer = connect(mapStateToProps, mapDispathToProps)(Categories)
export default CategoriesContainer;