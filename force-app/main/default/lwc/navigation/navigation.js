import { LightningElement, wire, track} from 'lwc';
import getNavigationItems from '@salesforce/apex/NavigationController.getNavigationItems';

export default class Navigation extends LightningElement {

    @track navigationItems;
    @track _navbarItemMaxWidth;

    @wire (getNavigationItems) 
    wiredNavigation ({error, data}) {
        if (data) {
            this.navigationItems = data;
            this._navbarItemMaxWidth = 96/this.navigationItems.length;
        }
    }
    
    handleToggleLevel2(e) {
        let selectedNav = e.target.dataset.navId ? e.target.dataset.navId : e.target.parentNode.dataset.navId;
        let selectedItem = this.template.querySelector(`[data-id="${selectedNav}"]`);
        if (selectedItem) {
            selectedItem.classList.toggle('open');
        }
    }

    handleOpenPage(e) {
        let selectedPage = e.target.dataset.pageId ? e.target.dataset.pageId : e.target.parentNode.dataset.pageId;
        this.dispatchEvent(
            new CustomEvent('pagechange', { detail: selectedPage })
        );
    }

    get navbarItemMaxWidth() {
        return `min-width: ${this._navbarItemMaxWidth}%`;
    }

}