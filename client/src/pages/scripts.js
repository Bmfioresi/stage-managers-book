import React, { useEffect } from 'react';
//import * as pdfjs from 'pdfjs-dist';
const pdfjs = require('pdfjs-dist');

const PDFViewer = () => {
    useEffect(() => {
        const url = 'https://uca.edu/cwc/files/2017/11/Film-Script.pdf';
        const canvas = document.getElementById('pdf-viewer');
        pdfjs.GlobalWorkerOptions.workerSrc = '../../client/node_modules/pdfjs-dist/build/pdf.worker.mjs';
        //pdfjs.GlobalWorkerOptions.workerSrc = './pdf.worker.mjs';
        //I keep getting errors regarding either "failed to fetch dynamically imported module" so I've had to
        //keep changing the import, const pdfjs and workerSrc line with no success -_-
        pdfjs.getDocument(url).promise.then(pdf => {
            pdf.getPage(1).then(page => {
                const viewport = page.getViewport({ scale: 1.5 });
                const context = canvas.getContext('2d');
                canvas.height = viewport.height;
                canvas.width = viewport.width;

                const renderContext = {
                    canvasContext: context,
                    viewport: viewport
                };

                page.render(renderContext);
            });
        });
    }, []);

    return <canvas id="pdf-viewer"></canvas>;
};

export default PDFViewer;
