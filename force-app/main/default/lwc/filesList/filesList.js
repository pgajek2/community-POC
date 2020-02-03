import { LightningElement, api, wire, track } from 'lwc';
import getFilesList from '@salesforce/apex/FilesController.getFilesList';
import downloadFile from '@salesforce/apex/FilesController.downloadFile';

const COLUMNS = [
    { label: 'Document Name', type: 'text', fieldName: 'Name' },
    { label: 'CreatedDate', fieldName: 'CreatedDate', type: 'text' }
];

export default class FilesList extends LightningElement {

    @api filesNames;
    @track columns = COLUMNS;
    @track document;

    @wire(getFilesList, { fileId: '$filesNames' })
    wiredFiles({error, data}) {
        console.log(JSON.stringify(data));
        console.log(JSON.stringify(error));
        this.document = data;
    }

    handleDownload(e) {
        downloadFile({
            fileId: this.filesNames
        })
        .then(result => {
            console.log(JSON.stringify(result));
            window.open(result);
        })
        .catch(error => {
            console.log(JSON.stringify(error));
        })
    }

}