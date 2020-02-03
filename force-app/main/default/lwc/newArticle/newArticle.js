import { LightningElement, api, wire, track } from 'lwc';
import getAllArticleDetails from '@salesforce/apex/ArticleController.getAllArticleDetails';
import createNewArticle from '@salesforce/apex/ArticleController.createNewArticle';
import publishArticle from '@salesforce/apex/ArticleController.publishArticle';
import unPublishArticle from '@salesforce/apex/ArticleController.unPublishArticle';
import getAllArticles from '@salesforce/apex/ArticleController.getAllArticles';
import updateArticle from '@salesforce/apex/ArticleController.updateArticle';

import { ShowToastEvent } from 'lightning/platformShowToastEvent';

const COLUMNS = [
    { label: 'Title', type: 'text', fieldName: 'Title' },
    { label: 'URL Name', fieldName: 'UrlName', type: 'text' }
];

export default class NewArticle extends LightningElement {

    @api recordId;

    @track recordId2;

    @track newContent;
    @track title;
    @track urlName;
    @track id;

    @track editRecordId;

    @track columns = COLUMNS;
    @track editContent;

   // @wire(getAllArticleDetails, { recordId: this.recordId2 }) editContent;

    @wire(getAllArticles) articlesList;

    handleClick() {
        const editor = this.template.querySelector('lightning-input-rich-text');

        createNewArticle({
            title: this.title,
            urlName: this.urlName,
            body: editor.value
        })
            .then(result => {
                this.id = result;
                const evt = new ShowToastEvent({
                    title: 'success',
                    message: 'Article sucesfully added. ' + result,
                    variant: 'success',
                });
                this.dispatchEvent(evt);
            })
            .catch(error => {
                console.log(JSON.stringify(error))
                const evt = new ShowToastEvent({
                    title: 'error',
                    message: JSON.stringify(error),
                    variant: 'error',
                });
                this.dispatchEvent(evt);
            });
    }
    
    handlePublish() {
        publishArticle({
            recordId: this.id
        })
            .then(result => {
                const evt = new ShowToastEvent({
                    title: 'success',
                    message: 'Article sucesfully added.',
                    variant: 'success',
                });
                this.dispatchEvent(evt);
            })
            .catch(error => {
                console.log(JSON.stringify(error))
                const evt = new ShowToastEvent({
                    title: 'error',
                    message: JSON.stringify(error),
                    variant: 'error',
                });
                this.dispatchEvent(evt);
            });
    }

    handleSelectedRows(e) {
        this.editContent = '';
        this.editRecordId = e.detail.selectedRows[0].Id;
        console.log(e.detail.selectedRows[0].Id);
        getAllArticleDetails({
            recordId: e.detail.selectedRows[0].Id
        })
            .then(result => {
                console.log(JSON.stringify(result))
               this.editContent = result.Body__c;
               this.title = result.Title;
               this.urlName = result.UrlName;
            })
            .catch(error => {
                console.log(JSON.stringify(error))
            });
    }

    handleUpdate(e) {
        const editor = this.template.querySelector('lightning-input-rich-text');

        updateArticle({
            title: this.title,
            urlName: this.urlName,
            body: editor.value,
            recordId: this.editRecordId
        })
            .then(result => {
                const evt = new ShowToastEvent({
                    title: 'success',
                    message: 'Article sucesfully updated. ' + result,
                    variant: 'success',
                });
                this.dispatchEvent(evt);
            })
            .catch(error => {
                console.log(JSON.stringify(error))
                const evt = new ShowToastEvent({
                    title: 'error',
                    message: JSON.stringify(error),
                    variant: 'error',
                });
                this.dispatchEvent(evt);
            });
    }

    handleUnPublish() {
        unPublishArticle({
            recordId: this.editRecordId
        })
            .then(result => {
                this.editRecordId = result;
                const evt = new ShowToastEvent({
                    title: 'success',
                    message: 'Article sucesfully unpublished. ' + result,
                    variant: 'success',
                });
                this.dispatchEvent(evt);
            })
            .catch(error => {
                console.log(JSON.stringify(error))
                const evt = new ShowToastEvent({
                    title: 'error',
                    message: JSON.stringify(error),
                    variant: 'error',
                });
                this.dispatchEvent(evt);
            });
    }

    handleTitle(e) {
        this.title = e.target.value;
    }

    handleURLName(e) {
        this.urlName = e.target.value;
    }

}