import { FunctionComponent } from "react";
import { Spinner } from "react-bootstrap";

export const SearchSpinner: FunctionComponent = () => {
    return (
        <Spinner animation="border" variant="info" />
    );
}