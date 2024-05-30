import { connect } from "react-redux";
import Registration from "./Registration";
import React from "react";
import { createUser } from "../../redux/usersReduser";


let RegistrationContainer = (props) => {
   
    return <Registration {...props}/>
}

function mapStateToProps(state){
    return{
        usersPage: state.usersPage,
    }
}


export default connect(mapStateToProps, {createUser} )(RegistrationContainer);