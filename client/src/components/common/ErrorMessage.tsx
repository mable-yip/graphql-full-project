import { ApolloError } from "@apollo/client"
import { Alert } from "react-bootstrap"

const ErrorMessage = (props: {errorMessage: undefined | ApolloError }) => {
    return(
        props.errorMessage? 
        <Alert variant='danger'>
            {props.errorMessage.message}
        </Alert> :
        <div> </div>
    )
}

export default ErrorMessage