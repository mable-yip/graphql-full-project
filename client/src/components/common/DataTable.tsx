import "./dataTable.css"

const DataTable = (props: {headers?: () => JSX.Element[], body?: () => JSX.Element[]}) => {
    return(
        <table>
            <thead>
                {props.headers && props.headers()}
            </thead>
            <tbody>
                {props.body && props.body()}
            </tbody>
        </table>
    )
}

export default DataTable 