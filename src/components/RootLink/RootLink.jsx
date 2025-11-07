import { Link, useParams } from "react-router-dom";

export function RootLink({ to = "", children, ...props })
{
    const { unique_name, tableNumber: rawTableNumber } = useParams();

    // Default to 0 if tableNumber is undefined or empty
    const tableNumber = rawTableNumber;

    let finalPath = `/${ unique_name }/${ tableNumber }`;

    if (to)
    {
        finalPath += `/${ to }`;
    }

    return (
        <Link to={ finalPath } { ...props }>
            { children }
        </Link>
    );
}