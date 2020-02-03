import { LightningElement, wire, track } from 'lwc';
import getPagesList from '@salesforce/apex/PagesController.getPagesList';
import getPageDetails from '@salesforce/apex/PagesController.getPageDetails';

export default class Container extends LightningElement {

    @track selectedNavId = '';
    @track isPageListMode = false;
    @track isPageDetailsMode = false
    @track richtext = '';

    isRender = true;

    renderedCallback() {
        if (this.isRender) {
           const queryString = window.location;
           const urlObject = new URL(queryString);
           const id = urlObject.searchParams.get('id')
            if (id) {
                this.selectedNavId = id;
                this.isPageListMode = true;
           }
            this.isRender = false;
        }
    }
    
    @wire(getPagesList, { navigationId: '$selectedNavId' })
    pagesList;

    handlePageChange(e) {
        this.selectedNavId = e.detail;
        this.isPageListMode = true;
        this.isPageDetailsMode = false;
    }

    handleOpenPageDetails(e) {
        this.isPageListMode = false;
        this.richtext ='';
        this.isPageDetailsMode = true;
        console.log(e.detail);
        let pageId = e.detail;
        getPageDetails({
            pageId: pageId
        })
            .then(result => {
                result.Page_HTMLs__r.forEach(html => {
                    this.richtext += html.Content__c;
                }); 
            })
            .catch(error => {
                this.error = error;
            });
    }


    
}