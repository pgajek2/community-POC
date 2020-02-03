public with sharing class ArticlesUtils {

    @AuraEnabled
    public static List<Knowledge__kav> getAllArticles(){
        return [ SELECT Id, KnowledgeArticleId, Title, UrlName FROM Knowledge__kav ];
    }

    @AuraEnabled
    public static String createNewArticleAsADraft(String title, String urlName) {

        Knowledge__kav newArticle = new Knowledge__kav();
        newArticle.Title = title;
        newArticle.UrlName = urlName;
        insert newArticle;

        return [SELECT KnowledgeArticleId FROM Knowledge__kav WHERE Id =: newArticle.Id].KnowledgeArticleId;
    }

    @AuraEnabled
    public static void publishArticle(String recordId) { //It need to be KnowledgeArticleId
        KbManagement.PublishingService.publishArticle(recordId, true);
    }

    @AuraEnabled
    public static String unPublishArticle(String recordId){ //It need to be KnowledgeArticleId
        String newArticleId = KbManagement.PublishingService.editOnlineArticle(recordId, true); //Method new version id use it to update 
        return [SELECT KnowledgeArticleId FROM Knowledge__kav WHERE Id =: newArticleId].KnowledgeArticleId;
    }

    @AuraEnabled
    public static String updateDraftArticleWithoutPublish(String title, String urlName, Id recordId) {

        Knowledge__kav newArticle = [ SELECT Id, KnowledgeArticleId, Title, UrlName FROM Knowledge__kav WHERE KnowledgeArticleId =: recordId ];   

        newArticle.Title = title;
        newArticle.UrlName = urlName;

        update newArticle;

        return newArticle.KnowledgeArticleId;
   }

    @AuraEnabled
    public static String updatetArticle(String title, String urlName, Id recordId) {

        String newVersionId = unPublishArticle(recordId);

        Knowledge__kav newArticle = [ SELECT Id, KnowledgeArticleId, Title, UrlName FROM Knowledge__kav WHERE KnowledgeArticleId =: newVersionId ];   

        newArticle.Title = title;
        newArticle.UrlName = urlName;

        update newArticle;

        publishArticle(newVersionId);

        return newVersionId;
   }

}
