public with sharing class NewArticleController {
    
   @AuraEnabled
   public static String createNewArticle(String title, String urlName, String body){

       try {
            Knowledge__kav newArticle = new Knowledge__kav();

            newArticle.Title = title;
            newArticle.UrlName = urlName;
            newArticle.Body__c = body;
            newArticle.PublishStatus = 'Online';
            newArticle.IsVisibleInApp = true;
            
            insert newArticle;
            return 'ok';
       } catch (Exception e) {
           return 'Bad' + e.getMessage();
       }

   }
}