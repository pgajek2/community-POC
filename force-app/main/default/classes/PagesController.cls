public with sharing class PagesController {
    
    
    @AuraEnabled(Cacheable=true)
    public static List<Navigation__c> getPagesList(Id navigationId) {
        List<Navigation__c> navigationWithPages = new List<Navigation__c>();

        Navigation__c nav = [ SELECT RecordType.DeveloperName FROM Navigation__c WHERE Id =: navigationId ];

        if (nav.RecordType.DeveloperName == 'Level_1') {
            Navigation__c parentNav = [ SELECT Name, Order__c, RecordTypeId, (SELECT Id, Name FROM Navbar_Items__r ORDER BY Order__c ASC)
                                        FROM Navigation__c 
                                        WHERE Id =: navigationId
                                        ORDER BY Order__c ASC 
                                        LIMIT 1 ];
            
            navigationWithPages = [ SELECT Name, Order__c, (SELECT Id, Name, Description__c FROM Pages__r)
                                    FROM Navigation__c
                                    WHERE Id IN: parentNav.Navbar_Items__r
                                    ORDER BY Order__c ASC ];

        } else if (nav.RecordType.DeveloperName == 'Level_2') {

            navigationWithPages = [ SELECT Name, Order__c, (SELECT Id, Name, Description__c FROM Pages__r)
                                    FROM Navigation__c
                                    WHERE Id =: navigationId
                                    ORDER BY Order__c ASC ];
        }

        return navigationWithPages;
    }

    @AuraEnabled(Cacheable=true)
    public static Page__c getPageDetails(Id pageId) {
        return [ SELECT Id, Name, (SELECT Content__c FROM Page_HTMLs__r ORDER BY Order__c ASC) FROM Page__c WHERE Id =: pageId];
    }

}