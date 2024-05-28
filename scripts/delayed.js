// eslint-disable-next-line import/no-cycle
import { sampleRUM } from './aem.js';

// Core Web Vitals RUM collection
sampleRUM('cwv');

// add more delayed functionality here

function loadMetadata() {
    fetch('/metadata.json').then( res => {
        console.log(res);
        if(res.ok) {
            res.text().then(data => {
                console.log(data);
            });
        }
    });
}

loadMetadata()