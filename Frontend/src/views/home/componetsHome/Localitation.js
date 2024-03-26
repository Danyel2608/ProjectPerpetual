import './Localitation.css';

function Localitation() {
    return (
        <div className="localiation" id='localitation'>
            <div className="info-localitation">
                <h2>do you know where to find me?</h2>
            </div>
            <div className="maps">
                <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3198.1762095898926!2d-4.4406390237064155!3d36.718329072309544!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd72f7e36b29f0c7%3A0xc0f05b97a133837!2sNo%20Glory%20Tattoo!5e0!3m2!1ses-419!2ses!4v1708419864694!5m2!1ses-419!2ses" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
            </div>
        </div>
    );
}

export default Localitation;
