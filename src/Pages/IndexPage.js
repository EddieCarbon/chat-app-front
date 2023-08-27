import React from "react";
import { useNavigate } from "react-router-dom";

export default function IndexPage({ props }) {
    const navigate = useNavigate();

    React.useEffect(() => {
        const token = localStorage.getItem("CC_TOKEN");
        if (!token) {
            navigate("/login");
        } else {
            navigate("/dashboard");
        }
        // eslint-disable-next-line
    }, [0]);
    return (
        <div></div>
    );
}