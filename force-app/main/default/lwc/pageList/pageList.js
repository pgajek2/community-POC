import { LightningElement, track, api } from 'lwc';

export default class PageList extends LightningElement {

    @track _pageList = [];

    @api
    get pageList() {
        return this._pageList;
    }

    set pageList(value) {
       this._pageList = value.data;
    }

    handleOpenPageDetails(e) {
        let selectedPage = e.target.dataset.id ? e.target.dataset.id : e.target.parentNode.dataset.id;
        this.dispatchEvent(
            new CustomEvent('openpagedetails', { detail: selectedPage })
        );
    }
}