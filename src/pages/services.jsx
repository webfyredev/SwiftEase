import Footer from "../components/footer";
import NavBar from "../components/navbar";
import PageHeader from "../components/pageHeader";
import serviceHeaderImg from '../images/page/pages (10).webp'

export default function Service(){
    return(
        <>
            <NavBar />
            <PageHeader
            image = {serviceHeaderImg} 
            page = 'Services'/>
            <Footer />
        </>
    );
}