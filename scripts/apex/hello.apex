List<Knowledge__kav> articles = ArticlesUtils.getAllArticles();

String newArticleKnowledgeId = ArticlesUtils.createNewArticleAsADraft('SalesforceProfs', 'salesforce-profs');

ArticlesUtils.publishArticle(newArticleKnowledgeId);

//unpublish, update, publish > separate actions
//String newArticleVersionId = ArticlesUtils.unPublishArticle(newArticleKnowledgeId);
//ArticlesUtils.updateDraftArticleWithoutPublish('SalesforceProfs Update', 'salesforce-profs-update', newArticleVersionId);
//ArticlesUtils.publishArticle(newArticleVersionId);

//update > 
ArticlesUtils.updatetArticle('SalesforceProfs Update', 'salesforce-profs-update', newArticleKnowledgeId);//contain unpublish, update, publish




