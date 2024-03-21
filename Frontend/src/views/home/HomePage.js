import HeaderComponent from "./componetsHome/HeaderComponent";
import Footer from "./componetsHome/Footer";
import Content from "./componetsHome/Content";
import Description from "./componetsHome/Description";
import Localitation from "./componetsHome/Localitation";
import { useState, useEffect } from "react";
import LoadingIndicator from "../UI/Spinners/LoadingIndicator";

function HomePage() {
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 1000);
        return () => clearTimeout(timer);
    }, []);
    return <>
        {isLoading ? (
            <LoadingIndicator />) : (
            <div className="HomePage">
                <HeaderComponent></HeaderComponent>
                <Content></Content>
                <Description></Description>
                <Localitation></Localitation>
                <Footer></Footer>
            </div>
        )}
    </>
}

export default HomePage;
