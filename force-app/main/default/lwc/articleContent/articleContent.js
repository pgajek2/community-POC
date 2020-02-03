import { LightningElement, api, wire} from 'lwc';
import getArticleContent from '@salesforce/apex/ArticleController.getArticleContent';

export default class ArticleContent extends LightningElement {

    @api recordId;

    @wire(getArticleContent, { recordId: '$recordId' }) content;
    // wireContent({error, data}) {
    //     console.log(JSON.stringify(data))
    //     console.log(JSON.stringify(error))
    // }
    
}