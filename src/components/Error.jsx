export default function Error() {
    return (
        <div className="error-container">
            <div className="error-gif-wrapper">
                <img src="/img/error.gif" alt="error" className="error-gif" />
                <div className="error-text-overlay">
                    <h1 className="error-code">404</h1>
                    <p className="error-message">Verstappen je tužan jer ova stranica ne postoji.</p>
                </div>
            </div>
        </div>
    );
}