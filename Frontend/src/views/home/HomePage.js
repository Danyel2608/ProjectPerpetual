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
                {/* Obtiene el header de la página */}
                <HeaderComponent></HeaderComponent>

                {/* Obtiene el contenido del slider */}
                <Content></Content>

                {/* Obtiene la descripción(About Perpetual) */}
                <Description></Description>
                
                {/* Obtiene la localizacion de dónde poder encontrarlo */}
                <Localitation></Localitation>
                
                {/* Contactos del footer */}
                <Footer></Footer>
            </div>
        )}
    </>
}

export default HomePage;
