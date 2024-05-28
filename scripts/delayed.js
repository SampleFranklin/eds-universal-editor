// eslint-disable-next-line import/no-cycle
import { sampleRUM } from './aem.js';

// Core Web Vitals RUM collection
sampleRUM('cwv');

// add more delayed functionality here

function loadMetadata() {
    fetch('/metadata.json').then( res => {
        if(res.ok) {
            res.json().then(data => {
                data.data.forEach(item => {
                    const meta = document.createElement('meta');
                    Object.keys(item).forEach(key => {
                        meta.setAttribute(key, item[key]);
                    });
                    document.getElementsByTagName('head')[0].appendChild(meta);
                });
            });
        }
    });
}

loadMetadata()