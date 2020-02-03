public with sharing class FilesController {

    @AuraEnabled(Cacheable = true)
    public static Document__c getFilesList(String fileId){
         return [ SELECT Name, CreatedDate, Description__c FROM Document__c WHERE Id =: fileId LIMIT 1]; 
    }
    
    
    @AuraEnabled(Cacheable = true)
    public static String downloadFile(String fileId) {
        
        String baseUrl = URL.getSalesforceBaseUrl().toExternalForm();

        ContentDocumentLink contentDoc = [ SELECT ContentDocumentId, Id, ShareType, Visibility, LinkedEntityId, SystemModstamp
                                                              FROM ContentDocumentLink 
                                                              WHERE LinkedEntityId =: fileId
                                                              ORDER BY SystemModstamp DESC 
                                                              LIMIT 1 ];

        return baseUrl + '/sfc/servlet.shepherd/document/download/' + contentDoc.ContentDocumentId + '?operationContext=S1';

    } 

}