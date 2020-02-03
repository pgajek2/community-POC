public with sharing class ArticleController {

   @AuraEnabled(Cacheable = true)
   public static String getArticleContent(Id recordId){
       Knowledge__kav article = [ SELECT KnowledgeArticleId, Body__c FROM Knowledge__kav WHERE Id =: recordId ];
       return article.Body__c;     
   }

    @AuraEnabled(Cacheable = true)
    public static Knowledge__kav getAllArticleDetails(Id recordId){
        return [ SELECT Title, KnowledgeArticleId, Id, UrlName, Body__c FROM Knowledge__kav WHERE Id =: recordId ];   
    }

   @AuraEnabled
   public static String createNewArticle(String title, String urlName, String body){

       try {
            Knowledge__kav newArticle = new Knowledge__kav();

            newArticle.Title = title;
            newArticle.UrlName = urlName;
            newArticle.Body__c = body;

            insert newArticle;

            Knowledge__DataCategorySelection dataCategory = new Knowledge__DataCategorySelection();
            dataCategory.ParentId = newArticle.Id;
            dataCategory.DataCategoryGroupName = 'News';
            dataCategory.DataCategoryName = 'All';

            insert dataCategory;

            return [SELECT KnowledgeArticleId FROM Knowledge__kav WHERE id =: newArticle.Id].KnowledgeArticleId;

       } catch (Exception e) {
           return 'Bad' + e.getMessage();
       }

   }

    @AuraEnabled
    public static String updateArticle(String title, String urlName, String body, Id recordId){

       try {

            Knowledge__kav newArticle = [ SELECT Title, Id, KnowledgeArticleId, UrlName, Body__c FROM Knowledge__kav WHERE Id =: recordId ];   

            newArticle.Title = title;
            newArticle.UrlName = urlName;
            newArticle.Body__c = body;

            update newArticle;

            // Knowledge__DataCategorySelection dataCategory = new Knowledge__DataCategorySelection();
            // dataCategory.ParentId = newArticle.Id;
            // dataCategory.DataCategoryGroupName = 'News';
            // dataCategory.DataCategoryName = 'All';

            // insert dataCategory;

            KbManagement.PublishingService.publishArticle(newArticle.KnowledgeArticleId, false);

            return [SELECT KnowledgeArticleId FROM Knowledge__kav WHERE id =: newArticle.Id].KnowledgeArticleId;

       } catch (Exception e) {
            return 'Bad' + e.getMessage();
       }

   }

   @AuraEnabled
   public static void publishArticle(String recordId){
        KbManagement.PublishingService.publishArticle(recordId, false);
   }

   @AuraEnabled
   public static String unPublishArticle(String recordId){
        Knowledge__kav newArticle = [ SELECT Title, Id, KnowledgeArticleId, UrlName, Body__c FROM Knowledge__kav WHERE Id =: recordId ];   
        String id = KbManagement.PublishingService.editOnlineArticle (newArticle.KnowledgeArticleId, true);   
        return id;
   }

   @AuraEnabled(Cacheable = true)
   public static List<Knowledge__kav> getAllArticles(){
        return [ SELECT Id, KnowledgeArticleId, Title, UrlName, Body__c FROM Knowledge__kav ];
   }

}