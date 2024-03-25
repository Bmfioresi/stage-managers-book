import React from 'react';
import './pages.css';

const PDFViewer = () => {
    const pdfURL = 'https://uca.edu/cwc/files/2017/11/Film-Script.pdf';
    return (
        <div className='right-side'>
        <div style={styles.container}>
            <iframe
                title="pdf-viewer"
                src={pdfURL}
                width="100%"
                height="600px"
                style={styles.iframe}
            />
        </div>
        </div>
    );
};

const styles = {
    container: {
        width: '80%',
        margin: 'auto',
        marginTop: '50px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '70vh', // Setting minimum height for the container
    },
    iframe: {
        border: '1px solid #ccc',
        borderRadius: '5px',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
        maxWidth: '100%',
        maxHeight: '600px',
    },
};

export default PDFViewer;
