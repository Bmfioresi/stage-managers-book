import React from 'react';

const PDFViewer = () => {
    const pdfURL = 'https://uca.edu/cwc/files/2017/11/Film-Script.pdf';
    return (
        <div>
            <iframe
                title="pdf-viewer"
                src={pdfURL}
                width="100%"
                height="600px"
            />
        </div>
    );
};

export default PDFViewer;
