public with sharing class NavigationController {
    
    @AuraEnabled(Cacheable=true)
    public static List<Navigation__c> getNavigationItems(){
        
        return [ SELECT Name, Order__c, RecordTypeId, (SELECT Id, Name FROM Navbar_Items__r ORDER BY Order__c ASC)
                 FROM Navigation__c 
                 WHERE RecordTypeId =: Schema.SObjectType.Navigation__c.getRecordTypeInfosByDeveloperName().get('Level_1').getRecordTypeId() 
                 ORDER BY Order__c ASC ];
    }
}